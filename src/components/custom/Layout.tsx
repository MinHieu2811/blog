import React, { PropsWithChildren } from 'react'

import { Toaster } from '../ui/sonner'

import Header from './Header'
import SkyBackground from './SkyBackground'

type LayoutProps = {
  classNameWrapper?: string
}

const Layout = (props: PropsWithChildren<LayoutProps>) => {
  return (
    <div className={`wrapper relative ${props?.classNameWrapper}`}>
      <Header />
      <SkyBackground />

      <div className="container max-w-6xl m-auto">{props?.children}</div>
      <Toaster richColors />
    </div>
  )
}

export default Layout
