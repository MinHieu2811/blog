import React from 'react'
// import SearchBar from './SearchBar'
import Navigation from './Navigation'
import HeaderMobile from './HeaderMobile'
import SeachDrawer from './SeachBlog'

const Header = () => {
  return (
    <div className="sticky top-0 w-screen">
      <div className="container justify-between items-center p-4 max-w-6xl m-auto hidden md:flex">
        <div className="logo flex items-center">
          <span className='mr-5'>LOGO</span>
          <div className="navigation">
            <Navigation />
          </div>
        </div>
        <div className="search-bar flex-1 flex justify-end">
          {/* <SearchBar /> */}
          <SeachDrawer />
        </div>
      </div>
      <HeaderMobile />
    </div>
  )
}

export default Header
