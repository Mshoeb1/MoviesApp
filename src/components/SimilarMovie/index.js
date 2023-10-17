import {Link} from 'react-router-dom'
import './index.css'

const SimilarMovie = props => {
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

export default SimilarMovie
