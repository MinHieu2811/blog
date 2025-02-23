import Layout from '@/components/custom/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout classNameWrapper='container max-w-6xl m-auto'>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
