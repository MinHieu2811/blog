import Layout from '@/components/custom/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { fontMono } from '@/lib/font'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout classNameWrapper={`container max-w-6xl m-auto ${fontMono?.variable} ${fontMono?.className}`}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
