import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import OriginalMainSection from '../OriginalMainSection'
import TrendingMainSection from '../TrendingMainSection'
import FooterSection from '../FooterSection'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class HomeRoute extends Component {
  state = {
    newOriginalData: [],
    topRatedData: [],
    topRatedActiveApi: apiConstants.initial,
  }

  componentDidMount() {
    this.getTopRatedData()
  }

  renderNewOriginalData = originalData => {
    this.setState({newOriginalData: originalData})
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

  onClickRetryTopRated = () => {
    this.getTopRatedData()
  }

  renderPosterContent = () => {
    const {newOriginalData} = this.state
    const arrayLength = newOriginalData.length
    console.log(arrayLength)
    const randomNumber = Math.floor(Math.random() * arrayLength)
    const randomPosterObject = newOriginalData[randomNumber]
    let posterObject = ''
    if (randomPosterObject === undefined) {
      newOriginalData[0] = posterObject
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
          <h1 className="home-poster-para">{overview}</h1>
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

  render() {
    const {topRatedData} = this.state
    console.log(topRatedData)

    return (
      <div testid="homeItem" className="home-view-main-container">
        {this.renderFinalPosterView()}
        <TrendingMainSection />
        <OriginalMainSection
          renderNewOriginalData={this.renderNewOriginalData}
        />
        <FooterSection />
      </div>
    )
  }
}

export default HomeRoute
