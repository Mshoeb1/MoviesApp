import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FooterSection from '../FooterSection'
import SearchMovieItem from '../SearchMovieItem'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SearchRoute extends Component {
  state = {
    searchData: [],
    activeApi: apiConstants.initial,
    searchValue: '',
  }

  componentDidMount() {
    this.getSearchData()
  }

  onUpdateSearchValue = value => {
    this.setState({searchValue: value})
  }

  getSearchData = async () => {
    const {searchValue} = this.state
    this.setState({activeApi: apiConstants.progress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchValue}`
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
    const {searchData, searchValue} = this.state
    const filterData = searchData.filter(eachItem =>
      eachItem.title.toLowerCase().includes(searchValue.toLowerCase()),
    )
    console.log(filterData)

    return (
      <ul className="search-input-container">
        {filterData.length > 0 ? (
          filterData.map(eachImage => (
            <SearchMovieItem searchData={eachImage} key={eachImage.id} />
          ))
        ) : (
          <div className="no-search-container">
            <img
              src="https://res.cloudinary.com/dwekbzmuw/image/upload/v1694179107/Group_7394_dgcokg.png"
              alt="no movies"
              className="no-search-image"
            />
            <p className="no-search-para">
              Your search for {searchValue} did not find any matches.
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
      <div testid="searchItem" className="search-main-container">
        <Header
          changeSearchInput={this.changeSearchInput}
          getSearchData={this.getSearchData}
          onUpdateSearchValue={this.onUpdateSearchValue}
        />
        {this.renderFinalView()}
        <FooterSection />
      </div>
    )
  }
}

export default SearchRoute
