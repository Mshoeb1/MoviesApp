import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="foo-container">
    <ul className="footer-section-container">
      <li className="footer-icon">
        <FaGoogle size={25} color="#ffffff" className="social-icon" />
      </li>
      <li className="footer-icon">
        <FaTwitter size={25} color="#ffffff" className="social-icon" />
      </li>
      <li className="footer-icon">
        <FaInstagram size={25} color="#ffffff" className="social-icon" />
      </li>
      <li className="footer-icon">
        <FaYoutube size={25} color="#ffffff" className="social-icon" />
      </li>
    </ul>
    <p className="footer-contact-us">Contact us</p>
  </div>
)

export default Footer
