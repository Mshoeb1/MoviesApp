import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import OriginalSection from '../OriginalSection'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class OriginalMainSection extends Component {
  state = {originalData: [], activeApi: apiConstants.initial}

  componentDidMount() {
    this.getOriginalData()
  }

  renderOriginalData = () => {
    const {renderNewOriginalData} = this.props
    const {originalData} = this.state
    renderNewOriginalData(originalData)
  }

  getOriginalData = async () => {
    this.setState({activeApi: apiConstants.progress})
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
      console.log(fetchedData)
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
          activeApi: apiConstants.success,
        },
        this.renderOriginalData,
      )
    } else {
      this.setState({activeApi: apiConstants.failure})
    }
  }

  onClickRetryOriginal = () => {
    this.getOriginalData()
    this.renderOriginalData()
  }

  renderLoader = () => (
    <div className="loader" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderOriginalFailureView = () => (
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
        onClick={this.onClickRetryOriginal}
      >
        Try Again
      </button>
    </div>
  )

  renderOriginalSuccessView = () => {
    const {originalData} = this.state
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
      <div testid="originalItem" className="original-slider-container">
        <h1 className="original-main-heading">Originals</h1>
        <Slider {...settings}>
          {originalData.map(eachOriginal => (
            <OriginalSection
              originalSilk={eachOriginal}
              key={eachOriginal.id}
            />
          ))}
        </Slider>
      </div>
    )
  }

  renderFinalOriginalView = () => {
    const {activeApi} = this.state

    switch (activeApi) {
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
    return <>{this.renderFinalOriginalView()}</>
  }
}

export default OriginalMainSection
