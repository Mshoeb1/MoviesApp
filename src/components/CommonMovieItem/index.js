import {Link} from 'react-router-dom'

import './index.css'

const CommonMovieItem = props => {
  const {commonData} = props
  const {id, posterPath, title} = commonData

  return (
    <Link to={`/movies/${id}`} className="pl-link">
      <li className="popular-link" key={id}>
        <img src={posterPath} alt={title} className="popular-display-image" />
      </li>
    </Link>
  )
}

export default CommonMovieItem
