// import '../styles/globals.css'
import '../styles/globals.sass';
import type { AppProps } from 'next/app';
import { Header, Footer } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Header/>
    <div id="page-wrap">
      <Component {...pageProps} />
    </div>
    <Footer/>
  </>
}

export default MyApp
