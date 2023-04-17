import { NextPage } from 'next'
import '../styles/globals.css'
import { ReactElement, ReactNode } from 'react'
import { AppProps } from 'next/app';

type NextPageWhithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
}
type AppPropsWhithLayout = AppProps & {
  Component : NextPageWhithLayout
}
export default function App({ Component, pageProps }: AppPropsWhithLayout) {
  return <Component {...pageProps} />
}
