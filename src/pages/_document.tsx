import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta content="Blog about technology, programming, and other topics" name="description" />
        <meta content="blog, technology, programming, other topics" name="keywords" />
        <meta content="John Doe" name="author" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content="index, follow" name="robots" />
        <meta content="index, follow" name="googlebot" />
        <meta content="notranslate" name="google" />
        <meta content="notranslate" name="google" />

        <link href="https://fonts.gstatic.com" rel="preconnect" />

        <link href="/favicon.ico" rel="icon" />
        <link as="image" href="/dog.glb" rel="preload" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
