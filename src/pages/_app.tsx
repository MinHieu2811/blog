import Layout from '@/components/custom/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { fontMono } from '@/lib/font'
import PageTransition from '@/components/custom/PageTransition'
import { AnimatePresence } from 'framer-motion'

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <AnimatePresence mode="wait">
        <PageTransition key={router.route}>
          <Layout classNameWrapper={`container max-w-6xl m-auto ${fontMono?.variable} ${fontMono?.className}`}>
            <Component {...pageProps} />
          </Layout>
        </PageTransition>
      </AnimatePresence>
    </>
  )
}
