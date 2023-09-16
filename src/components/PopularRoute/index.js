import {Component} from 'react'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FooterSection from '../FooterSection'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const RenderPopularData = props => {
  const {data} = props
  const {id, posterPath, title} = data

  return (
    <Link to={`/movies/${id}`} className="pl-link">
      <li className="popular-link">
        <img src={posterPath} alt={title} className="popular-display-image" />
      </li>
    </Link>
  )
}

class PopularRoute extends Component {
  state = {popularData: [], activeApi: apiConstants.initial}

  componentDidMount() {
    this.getPopularData()
  }

  getPopularData = async () => {
    this.setState({activeApi: apiConstants.progress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        id: eachItem.id,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      this.setState({popularData: updatedData, activeApi: apiConstants.success})
    } else {
      this.setState({activeApi: apiConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getPopularData()
  }

  renderLoader = () => (
    <div className="loader" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dwekbzmuw/image/upload/v1694179133/Background-Complete_dg1f4u.png"
        alt="failure view"
        className="fl-image"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button className="fl-button" type="button" onClick={this.onClickRetry}>
        Try Again
      </button>
    </div>
  )

  renderMovieList = () => {
    const {popularData} = this.state

    return (
      <ul className="popular-movie-container">
        {popularData.map(eachImage => (
          <RenderPopularData data={eachImage} key={eachImage.id} />
        ))}
      </ul>
    )
  }

  renderFinalView = () => {
    const {activeApi} = this.state

    switch (activeApi) {
      case apiConstants.progress:
        return this.renderLoader()
      case apiConstants.success:
        return this.renderMovieList()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-main-container">
        <Header />
        {this.renderFinalView()}
        <FooterSection />
      </div>
    )
  }
}

export default PopularRoute
