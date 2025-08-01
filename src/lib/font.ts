import { Lato as FontMono, M_PLUS_Rounded_1c as FontSans, Knewave as FontLogo } from 'next/font/google'

const fontLogo = FontLogo({
  subsets: ['latin'],
  variable: '--font-logo',
  weight: '400'
})

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: '400'
})

const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['100', '300', '700', '900', '400', '100', '300', '700', '900']
})

export { fontMono, fontSans, fontLogo }
