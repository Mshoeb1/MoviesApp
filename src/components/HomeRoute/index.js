import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FooterSection from '../FooterSection'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const RenderTrendingSilk = props => {
  const {trendingSilk} = props
  const {id, posterPath, title} = trendingSilk

  return (
    <li className="trending-slider-list">
      <Link to={`/movies/${id}`} className="trending-links">
        <img src={posterPath} alt={title} className="trend-image" />
      </Link>
    </li>
  )
}

const RenderOriginalSilk = props => {
  const {originalSilk} = props
  const {id, posterPath, title} = originalSilk

  return (
    <li className="trending-slider-list">
      <Link to={`/movies/${id}`} className="trending-links">
        <img src={posterPath} alt={title} className="trend-image" />
      </Link>
    </li>
  )
}

class HomeRoute extends Component {
  state = {
    topRatedData: [],
    trendingData: [],
    originalData: [],
    topRatedActiveApi: apiConstants.initial,
    trendingActiveApi: apiConstants.initial,
    originalActiveApi: apiConstants.initial,
  }

  componentDidMount() {
    this.getTopRatedData()
    this.getTrendingData()
    this.getOriginalData()
  }

  getTopRatedData = async () => {
    this.setState({topRatedActiveApi: apiConstants.progress})
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const topApiUrl = 'https://apis.ccbp.in/movies-app/top-rated-movies'
    const topOptions = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(topApiUrl, topOptions)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      this.setState({
        topRatedData: updatedData,
        topRatedActiveApi: apiConstants.success,
      })
    } else {
      this.setState({topRatedActiveApi: apiConstants.failure})
    }
  }

  getTrendingData = async () => {
    this.setState({trendingActiveApi: apiConstants.progress})
    const jwtToken = Cookies.get('jwt_token')
    const rendingApiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const trendingOptions = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(rendingApiUrl, trendingOptions)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      this.setState({
        trendingData: updatedData,
        trendingActiveApi: apiConstants.success,
      })
    } else {
      this.setState({trendingActiveApi: apiConstants.failure})
    }
  }

  getOriginalData = async () => {
    this.setState({originalActiveApi: apiConstants.progress})
    const jwtToken = Cookies.get('jwt_token')
    const originalApiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const originalOptions = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(originalApiUrl, originalOptions)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      this.setState(
        {
          originalData: updatedData,
          originalActiveApi: apiConstants.success,
        },
        this.renderPosterContent,
      )
    } else {
      this.setState({originalActiveApi: apiConstants.failure})
    }
  }

  onClickRetryTopRated = () => {
    this.getTopRatedData()
  }

  onClickRetryTrending = () => {
    this.getTrendingData()
  }

  onClickRetryOriginal = () => {
    this.getOriginalData()
  }

  renderPosterContent = () => {
    const {originalData} = this.state
    const arrayLength = originalData.length
    console.log(arrayLength)
    const randomNumber = Math.floor(Math.random() * arrayLength - 1)
    const randomPosterObject = originalData[randomNumber]
    let posterObject = ''
    if (randomPosterObject === undefined) {
      originalData[0] = posterObject
    } else {
      posterObject = randomPosterObject
    }

    const {backdropPath, title, overview} = posterObject

    return (
      <div
        className="poster-main-container"
        style={{backgroundImage: `url(${backdropPath})`}}
      >
        <Header />
        <div className="poster-body-container">
          <h1 className="home-poster-heading">{title}</h1>
          <p className="home-poster-para">{overview}</p>
          <button className="home-poster-button" type="button">
            Play
          </button>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderTopFailureView = () => (
    <div className="home-failure-container">
      <img
        src="https://res.cloudinary.com/dwekbzmuw/image/upload/v1694179146/alert-triangle_qlwaks.png"
        alt="failure view"
        className="home-fl-image"
      />
      <p className="home-fl-para">Something went wrong. Please try again</p>
      <button
        className="home-fl-button"
        type="button"
        onClick={this.onClickRetryTopRated}
      >
        Try Again
      </button>
    </div>
  )

  renderTrendingFailureView = () => (
    <div className="home-failure-container">
      <img
        src="https://res.cloudinary.com/dwekbzmuw/image/upload/v1694179146/alert-triangle_qlwaks.png"
        alt="failure-view"
        className="home-fl-image"
      />
      <p className="home-fl-para">Something went wrong. Please try again</p>
      <button
        className="home-fl-button"
        type="button"
        onClick={this.onClickRetryTrending}
      >
        Try Again
      </button>
    </div>
  )

  renderOriginalFailureView = () => (
    <div className="home-failure-container">
      <img
        src="https://res.cloudinary.com/dwekbzmuw/image/upload/v1694179146/alert-triangle_qlwaks.png"
        alt="failure-view"
        className="home-fl-image"
      />
      <p className="home-fl-para">Something went wrong. Please try again</p>
      <button
        className="home-fl-button"
        type="button"
        onClick={this.onClickRetryOriginal}
      >
        Try Again
      </button>
    </div>
  )

  renderTrendingSuccessView = () => {
    const {trendingData} = this.state
    const settings = {
      dots: false,
      slidesToScroll: 1,
      slidesToShow: 4,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToScroll: 1,
            slidesToShow: 3,
          },
        },
      ],
    }

    return (
      <div className="trending-slider-container">
        <Slider {...settings}>
          {trendingData.map(eachTrending => (
            <RenderTrendingSilk
              trendingSilk={eachTrending}
              key={eachTrending.id}
            />
          ))}
        </Slider>
      </div>
    )
  }

  renderOriginalSuccessView = () => {
    const {originalData} = this.state
    const settings = {
      dots: false,
      slidesToScroll: 1,
      slidesToShow: 4,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToScroll: 1,
            slidesToShow: 3,
          },
        },
      ],
    }

    return (
      <div className="original-slider-container">
        <Slider {...settings}>
          {originalData.map(eachOriginal => (
            <RenderOriginalSilk
              originalSilk={eachOriginal}
              key={eachOriginal.id}
            />
          ))}
        </Slider>
      </div>
    )
  }

  renderFinalPosterView = () => {
    const {topRatedActiveApi} = this.state

    switch (topRatedActiveApi) {
      case apiConstants.progress:
        return this.renderLoader()
      case apiConstants.success:
        return this.renderPosterContent()
      case apiConstants.failure:
        return this.renderTopFailureView()

      default:
        return null
    }
  }

  renderFinalTrendingView = () => {
    const {trendingActiveApi} = this.state

    switch (trendingActiveApi) {
      case apiConstants.progress:
        return this.renderLoader()
      case apiConstants.success:
        return this.renderTrendingSuccessView()
      case apiConstants.failure:
        return this.renderTrendingFailureView()

      default:
        return null
    }
  }

  renderFinalOriginalView = () => {
    const {originalActiveApi} = this.state

    switch (originalActiveApi) {
      case apiConstants.progress:
        return this.renderLoader()
      case apiConstants.success:
        return this.renderOriginalSuccessView()
      case apiConstants.failure:
        return this.renderOriginalFailureView()

      default:
        return null
    }
  }

  render() {
    const {topRatedData} = this.state
    console.log(topRatedData)

    return (
      <div className="home-view-main-container">
        {this.renderFinalPosterView()}
        <h1 className="trending-main-heading">Trending Now</h1>
        {this.renderFinalTrendingView()}
        <h1 className="original-main-heading">Originals</h1>
        {this.renderFinalOriginalView()}
        <FooterSection />
      </div>
    )
  }
}

export default HomeRoute
