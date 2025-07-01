import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="justify-between items-center p-4 max-w-6xl m-auto flex flex-wrap gap-4 mt-10">
      <div className="logo flex items-center">
        <Link href="/">
          <span className="mr-5">Doggo.dev</span>
        </Link>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Link href="/">
          <span className="mr-5">About</span>
        </Link>
        <Link href="/">
          <span className="mr-5">Contact</span>
        </Link>
      </div>
      <div className="flex flex-col items-center gap-4">
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
