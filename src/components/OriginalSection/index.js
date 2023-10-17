import {Link} from 'react-router-dom'

import './index.css'

const OriginalSection = props => {
  const {originalSilk} = props
  const {id, posterPath, title} = originalSilk

  return (
    <Link to={`/movies/${id}`} className="original-links">
      <li className="original-slider-list">
        <img src={posterPath} alt={title} className="original-image" />
      </li>
    </Link>
  )
}

export default OriginalSection
