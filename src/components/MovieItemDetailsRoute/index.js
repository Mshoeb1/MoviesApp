import {Component} from 'react'
import {Link} from 'react-router-dom'
import format from 'date-fns/format'
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

const RenderSimilarMovieView = props => {
  const {similarData, getMovieItemData} = props
  const {id, posterPath, title} = similarData
  const onClickGetData = () => {
    getMovieItemData()
  }

  return (
    <li className="similar-movie-list">
      <Link to={`/movies/${id}`} className="movie-link">
        <img
          src={posterPath}
          alt={title}
          className="similar-image"
          onClick={onClickGetData}
        />
      </Link>
    </li>
  )
}

class MovieItem extends Component {
  state = {
    movieData: [],
    genreData: [],
    similarMovieData: [],
    spokenLanguageData: [],
    activeApi: apiConstants.initial,
  }

  componentDidMount() {
    this.getMovieItemData()
  }

  getMovieData = data => ({
    adult: data.adult,
    backdropPath: data.backdrop_path,
    budget: data.budget,
    id: data.id,
    overview: data.overview,
    posterPath: data.poster_path,
    releaseDate: data.release_date,
    runtime: data.runtime,
    title: data.title,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
  })

  getGenreData = genreData => ({
    id: genreData.id,
    name: genreData.name,
  })

  getSimilarMovies = smData => ({
    backdropPath: smData.backdrop_path,
    id: smData.id,
    overview: smData.overview,
    posterPath: smData.poster_path,
    title: smData.title,
  })

  getSpokenLanguage = spData => ({
    id: spData.id,
    englishName: spData.english_name,
  })

  getMovieItemData = async () => {
    this.setState({activeApi: apiConstants.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedMovieData = this.getMovieData(fetchedData.movie_details)
      const genresData = fetchedData.movie_details.genres.map(eachGenre =>
        this.getGenreData(eachGenre),
      )
      const similarMovie = fetchedData.movie_details.similar_movies.map(
        eachSm => this.getSimilarMovies(eachSm),
      )
      const spokenLanguage = fetchedData.movie_details.spoken_languages.map(
        eachSpoken => this.getSpokenLanguage(eachSpoken),
      )
      this.setState({
        movieData: updatedMovieData,
        genreData: genresData,
        spokenLanguageData: spokenLanguage,
        similarMovieData: similarMovie,
        activeApi: apiConstants.success,
      })
    } else {
      this.setState({activeApi: apiConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getMovieItemData()
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

  renderRunTime = () => {
    const {movieData} = this.state
    const hours = Math.floor(movieData.runtime / 60)
    const minutes = Math.floor(movieData.runtime % 60)
    return `${hours}h ${minutes}m`
  }

  renderReleasedYear = () => {
    const {movieData} = this.state
    const {releaseDate} = movieData
    if (releaseDate !== undefined) {
      return format(new Date(releaseDate), 'yyyy')
    }
    return null
  }

  renderFormattedDate = () => {
    const {movieData} = this.state
    const {releaseDate} = movieData
    if (releaseDate !== undefined) {
      return format(new Date(releaseDate), 'do MMMM y')
    }
    return null
  }

  renderSimilarMovies = () => {
    const {similarMovieData} = this.state

    return (
      <ul className="similar-movie-container">
        {similarMovieData.map(eachSm => (
          <RenderSimilarMovieView
            similarData={eachSm}
            key={eachSm.id}
            getMovieItemData={this.getMovieItemData}
          />
        ))}
      </ul>
    )
  }

  renderMovieItemDetailSection = () => {
    const {movieData, genreData, spokenLanguageData} = this.state
    const censorBoardText = movieData.adult === 'adult' ? 'A' : 'U/A'
    const {backdropPath, title, overview} = movieData
    return (
      <div className="movie-item-container">
        <div
          className="movie-item-top-container"
          style={{backgroundImage: `url(${backdropPath})`}}
        >
          <Header />
          <div className="movie-heading-container">
            <h1 className="top-heading">{title}</h1>
            <div className="top-date-time-container">
              <p className="time-hour-para">{this.renderRunTime()}</p>
              <p className="ua-para">{censorBoardText}</p>
              <p className="year-para">{this.renderReleasedYear()}</p>
            </div>
            <p className="description-para">{overview}</p>
            <button className="play-button" type="button">
              Play
            </button>
          </div>
        </div>
        <div className="movie-item-middle-container">
          <div className="genre-container">
            <h1 className="genre-heading">Genres</h1>
            {genreData.map(eachItem => (
              <p className="genre-para" key={eachItem.id}>
                {eachItem.name}
              </p>
            ))}
          </div>
          <div className="spoken-container">
            <h1 className="spoken-heading">Audio Available</h1>
            {spokenLanguageData.map(eachSp => (
              <p className="spoken-para" key={eachSp.id}>
                {eachSp.englishName}
              </p>
            ))}
          </div>
          <div className="rating-count-container">
            <h1 className="count-heading">Rating Count</h1>
            <p className="count-para">{movieData.voteCount}</p>
            <h1 className="rating-heading">Rating Average</h1>
            <p className="rating-para">{movieData.voteAverage}</p>
          </div>
          <div className="budget-release-date-container">
            <h1 className="budget-heading">Budget</h1>
            <p className="budget-para">{movieData.budget}</p>
            <h1 className="Release-date-heading">Release Date</h1>
            <p className="release-date-para">{this.renderFormattedDate()}</p>
          </div>
        </div>
        <div className="similar-body-container">
          <h1 className="similar-body-heading">More like this</h1>
          {this.renderSimilarMovies()}
        </div>
        <FooterSection />
      </div>
    )
  }

  renderFinalView = () => {
    const {activeApi} = this.state

    switch (activeApi) {
      case apiConstants.progress:
        return this.renderLoader()
      case apiConstants.success:
        return this.renderMovieItemDetailSection()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="movie-item-main-container">{this.renderFinalView()}</div>
    )
  }
}

export default MovieItem
