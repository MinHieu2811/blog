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
        <Layout classNameWrapper={`${fontMono?.variable} ${fontMono?.className}`}>
          <PageTransition key={router.route}>
            <Component {...pageProps} />
          </PageTransition>
        </Layout>
      </AnimatePresence>
    </>
  )
}
