import {Link} from 'react-router-dom'
import './index.css'

const SearchMovieItem = props => {
  const {searchData} = props
  const {id, posterPath, title} = searchData

  return (
    <li className="popular-link" key={id}>
      <Link to={`/movies/${id}`} className="pl-link">
        <img src={posterPath} alt={title} className="popular-display-image" />
      </Link>
    </li>
  )
}

export default SearchMovieItem
