import React from 'react'
import SearchBar from './SearchBar'
import Navigation from './Navigation'
import HeaderMobile from './HeaderMobile'

const Header = () => {
  return (
    <div className="">
      <div className="container justify-between items-center py-3 hidden md:flex">
        <div className="logo flex-1">LOGO</div>
        <div className="navigation flex-1">
          <Navigation />
        </div>
        <div className="search-bar flex-1">
          <SearchBar />
        </div>
      </div>
      <HeaderMobile />
    </div>
  )
}

export default Header
