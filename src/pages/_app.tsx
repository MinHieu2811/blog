import type { AppProps } from 'next/app'

import { AnimatePresence } from 'framer-motion'

import Layout from '@/components/custom/Layout'
import PageTransition from '@/components/custom/PageTransition'
import { fontMono } from '@/lib/font'
import '@/styles/globals.css'

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <AnimatePresence mode="wait">
        <Layout classNameWrapper={`${fontMono?.variable} ${fontMono?.className}`}>
          <PageTransition key={router.route}>
            <Component {...pageProps} />
          </PageTransition>
        </Layout>
      </AnimatePresence>
    </>
  )
}
