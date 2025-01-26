import React from 'react'
import SearchBar from './SearchBar'

const Header = () => {
  return (
    <div className='container flex justify-between'>
      <div className="logo">LOGO</div>
      <div className="menu"></div>
      <div className="search-bar">
        <SearchBar />
      </div>
    </div>
  )
}

export default Header