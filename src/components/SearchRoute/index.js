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

const RenderSearchData = props => {
  const {searchData} = props
  const {id, posterPath, title} = searchData

  return (
    <Link to={`/movies/${id}`} className="search-link">
      <li className="search-item">
        <img src={posterPath} alt={title} className="search-image" />
      </li>
    </Link>
  )
}

class SearchRoute extends Component {
  state = {
    searchData: [],
    activeApi: apiConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getSearchData()
  }

  changeSearchInput = event => {
    this.setState({searchInput: event})
  }

  getSearchData = async () => {
    const {searchInput} = this.state
    this.setState({activeApi: apiConstants.progress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(eachSearch => ({
        backdropPath: eachSearch.backdrop_path,
        id: eachSearch.id,
        overview: eachSearch.overview,
        posterPath: eachSearch.poster_path,
        title: eachSearch.title,
      }))
      this.setState({
        searchData: updatedData,
        activeApi: apiConstants.success,
      })
    } else {
      this.setState({activeApi: apiConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getSearchData()
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

  renderSearchResult = () => {
    const {searchData, searchInput} = this.state
    const filterData = searchData.filter(eachItem =>
      eachItem.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    console.log(filterData)

    return (
      <ul className="search-input-container">
        {filterData.length > 0 ? (
          filterData.map(eachImage => (
            <RenderSearchData searchData={eachImage} key={eachImage.id} />
          ))
        ) : (
          <div className="no-search-container">
            <img
              src="https://res.cloudinary.com/dwekbzmuw/image/upload/v1694179107/Group_7394_dgcokg.png"
              alt="no movies"
              className="no-search-image"
            />
            <p className="no-search-para">
              Your search for {searchInput} did not find any matches.
            </p>
          </div>
        )}
      </ul>
    )
  }

  renderFinalView = () => {
    const {activeApi} = this.state

    switch (activeApi) {
      case apiConstants.progress:
        return this.renderLoader()
      case apiConstants.success:
        return this.renderSearchResult()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="search-main-container">
        <Header
          changeSearchInput={this.changeSearchInput}
          getSearchData={this.getSearchData}
        />
        {this.renderFinalView()}
        <FooterSection />
      </div>
    )
  }
}

export default SearchRoute
