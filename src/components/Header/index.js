import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {MdMenuOpen} from 'react-icons/md'

import './index.css'

class Header extends Component {
  state = {showMenu: false, currentPath: '', searchInput: ''}

  componentDidMount() {
    const path = window.location.pathname
    this.setState({currentPath: path})
  }

  showSearchInput = () => {
    const {currentPath} = this.state
    return currentPath === '/search'
  }

  onShowSearchInput = () => {
    const {searchInput} = this.state
    const {getSearchData, onUpdateSearchValue} = this.props
    const showInput = this.showSearchInput()
    if (showInput) {
      getSearchData()
      onUpdateSearchValue(searchInput)
    }
  }

  toggleMenuItem = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onKeyDownEnter = event => {
    const {searchInput} = this.state
    const {getSearchData, onUpdateSearchValue} = this.props
    if (event.key === 'Enter') {
      getSearchData()
      onUpdateSearchValue(searchInput)
    }
  }

  render() {
    const {showMenu, currentPath, searchInput} = this.state
    const showInput = this.showSearchInput()
    const inputClassName = showInput ? 'show' : ''
    const footerClass = showInput ? 'footer-show' : ''
    const homeClassName = currentPath === '/' ? 'home' : ''
    const popularClassName = currentPath === '/popular' ? 'popular' : ''
    const buttonClass = showInput ? 'button-show' : ''
    const accountClassName = currentPath === '/account' ? 'account' : ''
    return (
      <nav className="nav-container">
        <div className="nav-body-container">
          <div className="nav-top-container">
            <Link to="/" className="link">
              <img
                className="nav-image"
                src="https://res.cloudinary.com/dwekbzmuw/image/upload/v1694179009/Group_7399_qc0fys.png"
                alt="website logo"
              />
            </Link>
            <ul className="nav-list-container">
              <Link to="/" className="link">
                <li className={`nav-links ${homeClassName}`}>Home</li>
              </Link>
              <Link to="/popular" className={`nav-links ${popularClassName}`}>
                <li className="nav-links">Popular</li>
              </Link>
            </ul>
          </div>
          <div className={`nav-footer-container ${footerClass}`}>
            <div className={`input-search-container ${inputClassName}`}>
              {showInput && (
                <input
                  className="search-input"
                  type="search"
                  onChange={this.onChangeSearchInput}
                  onKeyDown={this.onKeyDownEnter}
                  value={searchInput}
                />
              )}
              <button
                className={`search-button ${buttonClass}`}
                type="button"
                onClick={this.onShowSearchInput}
                testid="searchButton"
              >
                <Link to="/search" className="link">
                  <HiOutlineSearch size={22} color="#ffffff" />
                </Link>
              </button>
            </div>
            <div className="avatar-container">
              <Link to="/account" className="link">
                <img
                  src="https://res.cloudinary.com/dwekbzmuw/image/upload/v1694183884/avatar_ztzbk8.png"
                  alt="profile"
                  className="avatar"
                />
              </Link>
            </div>
            <button
              className="close-button"
              type="button"
              onClick={this.toggleMenuItem}
            >
              <MdMenuOpen size={22} color="#ffffff" />
            </button>
          </div>
        </div>
        {showMenu && (
          <ul className="small-link-container">
            <Link to="/" className="link">
              <li className={`sm-nav-links ${homeClassName}`}>Home</li>
            </Link>
            <Link to="/popular" className={`nav-links ${popularClassName}`}>
              <li className="sm-nav-links">Popular</li>
            </Link>
            <Link to="/account" className="link">
              <li className={`sm-nav-links ${accountClassName}`}>Accounts</li>
            </Link>
            <li className="close-list-button">
              <button
                className="close-button"
                type="button"
                onClick={this.toggleMenuItem}
              >
                <AiFillCloseCircle size={25} color="#ffffff" />
              </button>
            </li>
          </ul>
        )}
      </nav>
    )
  }
}
export default Header
