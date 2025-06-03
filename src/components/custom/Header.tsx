import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import SeachDrawer from './SeachBlog'

const Header = () => {
  return (
    <ScrollHeader>
      <div className={`justify-between items-center p-4 max-w-6xl m-auto hidden md:flex `}>
        <div className="logo flex items-center">
          <Link href="/">
            <span className="mr-5">LOGO</span>
          </Link>
          {/* <div className="navigation">
            <Navigation />
            </div> */}
        </div>
        <div className="search-bar flex-1 flex justify-end">
          {/* <SearchBar /> */}
          <SeachDrawer />
        </div>
      </div>
    </ScrollHeader>
  )
}
const ScrollHeader = ({ children }: { children: React.ReactNode }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window?.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`fixed w-full z-50 transition-all duration-300 bg-transparent ${isScrolled ? ' backdrop-blur-md bg-white/20 top-0' : 'top-[10px] '}`}
    >
      {children}
    </div>
  )
}

export default Header
