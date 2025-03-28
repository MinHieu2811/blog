import React, { PropsWithChildren } from 'react'
import Header from './Header'
import { Toaster } from '../ui/sonner'

type LayoutProps = {
  classNameWrapper?: string
}

const Layout = (props: PropsWithChildren<LayoutProps>) => {
  return (
    <div className={`wrapper relative ${props?.classNameWrapper}`}>
      <Header />

      <div className="container max-w-6xl m-auto">{props?.children}</div>
      <Toaster richColors />
    </div>
  )
}

export default Layout
