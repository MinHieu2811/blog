import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import SeachDrawer from './SeachBlog'

import { fontLogo } from '@/lib/font'

const Header = () => {
  return (
    <ScrollHeader>
      <div className={`justify-between items-center p-4 max-w-6xl m-auto hidden md:flex `}>
        <div className="logo flex items-center">
          <Link href="/">
            <span className={`mr-5 ${fontLogo?.variable} font-logo text-3xl font-bold text-[#ffffff]`}>Doggo.dev</span>
          </Link>
        </div>
        <div className="search-bar flex-1 flex justify-end">
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
      className={`fixed w-full z-50 transition-all duration-300 bg-transparent ${isScrolled ? ' backdrop-blur-md bg-[#0d0f12]/20 top-0' : 'top-[10px] '}`}
    >
      {children}
    </div>
  )
}

export default Header
