import React, { PropsWithChildren } from 'react'
import Header from './Header'

type LayoutProps = {
  classNameWrapper?: string
}

const Layout = (props: PropsWithChildren<LayoutProps>) => {
  return (
    <div className={`wrapper ${props?.classNameWrapper}`}>
      <Header />

      {props?.children}
    </div>
  )
}

export default Layout