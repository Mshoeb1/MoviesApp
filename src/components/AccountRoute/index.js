import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import FooterSection from '../FooterSection'
import './index.css'

const Account = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="account-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="account-body-container">
        <h1 className="account-heading">Account</h1>
        <hr className="line" />
        <div className="membership-container">
          <p className="membership-para">Member ship</p>
          <div className="login-container">
            <p className="username">rahul@gmail.com</p>
            <p className="password">Password: ************</p>
          </div>
        </div>
        <hr className="line" />
        <div className="plan-container">
          <p className="plan-para">Plan details</p>
          <p className="premium-para">Premium</p>
          <p className="ultra-para">Ultra HD</p>
        </div>
        <hr className="line" />
        <button className="button" onClick={onClickLogout} type="button">
          Logout
        </button>
      </div>
      <FooterSection />
    </div>
  )
}

export default withRouter(Account)
