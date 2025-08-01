import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="bg-[#05050e66] border-t border-[#202020] mt-10">
      <div className="container justify-center items-center p-4 max-w-6xl m-auto flex flex-wrap gap-4">
        <Link href="/">
          <span className="mr-5">About</span>
        </Link>
        <Link href="/">
          <span className="mr-5">Contact</span>
        </Link>
        <Link href="/">
          <span className="mr-5">Privacy Policy</span>
        </Link>
        <Link href="/">
          <span className="mr-5">Terms of Service</span>
        </Link>
      </div>
    </div>
  )
}

export default Footer
