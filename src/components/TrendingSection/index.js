import {Link} from 'react-router-dom'

import './index.css'

const TrendingSection = props => {
  const {trendingSilk} = props
  const {id, posterPath, title} = trendingSilk

  return (
    <li className="trending-slider-list">
      <Link to={`/movies/${id}`} className="trending-links">
        <img src={posterPath} alt={title} className="trend-image" />
      </Link>
    </li>
  )
}

export default TrendingSection
