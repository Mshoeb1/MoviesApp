import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import TrendingSection from '../TrendingSection'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TrendingMainSection extends Component {
  state = {trendingData: [], activeApi: apiConstants.initial}

  componentDidMount() {
    this.getTrendingData()
  }

  getTrendingData = async () => {
    this.setState({activeApi: apiConstants.progress})
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
        activeApi: apiConstants.success,
      })
    } else {
      this.setState({activeApi: apiConstants.failure})
    }
  }

  onClickRetryTrending = () => {
    this.getTrendingData()
  }

  renderLoader = () => (
    <div className="loader" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderTrendingFailureView = () => (
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
        onClick={this.onClickRetryTrending}
      >
        Try Again
      </button>
    </div>
  )

  renderTrendingSuccessView = () => {
    const {trendingData} = this.state
    const settings = {
      dots: false,
      infinite: false,
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
      <div testid="TrendingItem" className="trending-slider-container">
        <h1 className="trending-main-heading">Trending Now</h1>
        <Slider {...settings}>
          {trendingData.map(eachTrending => (
            <TrendingSection
              trendingSilk={eachTrending}
              key={eachTrending.id}
            />
          ))}
        </Slider>
      </div>
    )
  }

  renderFinalTrendingView = () => {
    const {activeApi} = this.state

    switch (activeApi) {
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

  render() {
    return <> {this.renderFinalTrendingView()}</>
  }
}

export default TrendingMainSection
