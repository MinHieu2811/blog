import React, { PropsWithChildren } from 'react'
import Header from './Header'
import { Toaster } from '../ui/sonner'

type LayoutProps = {
  classNameWrapper?: string
}

const Layout = (props: PropsWithChildren<LayoutProps>) => {
  return (
    <div className={`wrapper ${props?.classNameWrapper}`}>
      <Header />

      {props?.children}
      <Toaster richColors />
    </div>
  )
}

export default Layout