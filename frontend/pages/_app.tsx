// import '../styles/globals.css'
import React, { useEffect, useState } from 'react'
import '../styles/globals.sass';
import type { AppProps } from 'next/app';
import { Header, Footer } from '../components';
import {Helmet} from "react-helmet";

import { ShowInterface } from '../interfaces/showInterface';
import { SeasonInterface } from '../interfaces/seasonInterface';

interface Props {
	isDarkMode: boolean;
	toggleDarkMode: (checked: boolean) => void;
}

function MyApp({ Component, pageProps }: AppProps) {
	const [show, setShow] = useState<ShowInterface>();
	const [seasons, setSeasons] = useState<SeasonInterface[]>([]);
	const [isDarkMode, setDarkMode] = React.useState(true);

	const toggleDarkMode = (checked: boolean) => {				
		setDarkMode(checked);
		window?.localStorage?.setItem('isDarkMode', checked.toString());
	};

	useEffect(() => {
		if (window?.localStorage?.getItem('isDarkMode') == null) {
			window?.localStorage?.setItem('isDarkMode', 'true');
		}		

		setDarkMode((window?.localStorage?.getItem('isDarkMode') == 'true'))
	}, [])

	return <>
		<Helmet>
			<meta name="color-scheme" content="dark light"/>

			{ !isDarkMode &&
				<style>{"\
					body{\
					background-color: #fff;\
					}\
			  "}</style>
			}
		</Helmet>

		<div className={`${isDarkMode ? 'darkMode' : 'lightMode'}`}>
			<Header isLightMode={isDarkMode} toggleLightMode={toggleDarkMode} />
			<div id="page-wrap">
				<Component {...pageProps} show={show} setShow={setShow} seasons={seasons} setSeasons={setSeasons} />
			</div>
			<Footer />
		</div>
	</>
}

export default MyApp
