// import '../styles/globals.css'
import React, { useState } from 'react'
import '../styles/globals.sass';
import type { AppProps } from 'next/app';
import { Header, Footer } from '../components';

import { ShowInterface } from '../interfaces/showInterface';
import { SeasonInterface } from '../interfaces/seasonInterface';

function MyApp({ Component, pageProps }: AppProps) {
  const [ show, setShow ] = useState<ShowInterface>();
	const [ seasons, setSeasons ] = useState<SeasonInterface[]>([]);

  return <>
    <Header/>
    <div id="page-wrap">
      <Component {...pageProps} show={ show } setShow={ setShow } seasons={ seasons } setSeasons={ setSeasons } />
    </div>
    <Footer/>
  </>
}

export default MyApp
