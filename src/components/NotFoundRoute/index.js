import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <h1 className="nf-heading">Lost Your Way?</h1>
    <p className="nf-para">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/" className="nf-link">
      <button className="nf-button" type="button">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
