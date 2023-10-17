import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="foo-container">
    <div className="footer-section-container">
      <FaGoogle size={25} color="#ffffff" className="social-icon" />
      <FaTwitter size={25} color="#ffffff" className="social-icon" />
      <FaInstagram size={25} color="#ffffff" className="social-icon" />
      <FaYoutube size={25} color="#ffffff" className="social-icon" />
    </div>
    <p className="footer-contact-us">Contact us</p>
  </div>
)

export default Footer
