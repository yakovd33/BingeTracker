import * as React from "react";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import ApiHelper from "../../../../helpers/ApiHelper";
import EpisoodeItem from "../../../../components/EpisoodeItem";
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr'

const Season = ({ show, setShow, seasons, setSeasons }: any) => {
	const router = useRouter();
	const { id, season } = router.query;
	const [ isThereSpecials, setIsThereSpecials ] = useState(false);
	const [ firstSeasonNumber, setFirstSeasonNumber ] = useState(1);

	// Get show
	useEffect(() => {
		if (id) {
			ApiHelper.get(`shows/${id}`, (show: any) => {
				if (show.data.length) {
					setSeasons(show.data[0].seasons.data);
					setShow(show.data[0].show);
				}
			});
		}
	}, [id]);

	useEffect(() => {
		if (seasons && seasons.length) {
            if (seasons[0].number == 0) {
                setIsThereSpecials(true);
				setFirstSeasonNumber(0)
            }
        }
	}, [ seasons, id, season ])

	const getSeasonBanner = (seasonNumber: number) => {
		let bannerUrl = '';

		if (show?.images?.seasonbanner) {
			show?.images?.seasonbanner?.forEach((banner: any) => {
				if (banner.season == seasonNumber) {
					bannerUrl = banner.url;
				}
			});
		} else {
			bannerUrl = show?.images?.showbackground[Math.floor(Math.random() * show?.images?.showbackground.length)].url;
		}

		return bannerUrl;
	}
	
	return <div id="show-single-wrap">
		{show && season &&
			<>
				<div id="season-single-hero" style={{ backgroundImage: `url('${getSeasonBanner(parseInt(season?.toString()))}')` }}>
					<img src={show.images.showbackground[Math.floor(Math.random() * show.images.showbackground.length)].url} alt="" />
					<div className="container">
						<div id="show-single-hero-textuals">
							<div id="show-single-hero-title">{show.title} - {show.year}</div>
						</div>

						<div id="floating-show-sidebar">
							<div id="show-poster">
								<img src={show?.images?.tvposter[0]?.url} alt="" />
							</div>
						</div>

						<div id="show-content-wrap">
							<h6 className="show-content-title">Overview:</h6>
							<p>
								{show.overview}
							</p>

							<h4 id="seasons-title">Episodes:</h4>

							<div id="seasons-wrap">
								{ seasons && seasons[parseInt(season.toString()) - firstSeasonNumber] && seasons[parseInt(season.toString()) - firstSeasonNumber].episodes.map((episodeItem: any) => (
									<EpisoodeItem showId={ id } episodeItem={episodeItem} />
								))}
							</div>
							
							
							<div id="season-nagigation-arrows">
								{ seasons && (parseInt(season as string) - 1) > firstSeasonNumber && <Link href={`/show/${id}/season/${parseInt(season as string) - 1}`}>
									<a href={`/show/${id}/season/${parseInt(season as string) +1 }`} className="season-navigation-btn prev"><GrFormPreviousLink/> Previous Season</a>
								</Link>}

								{ seasons && (parseInt(season as string) - 1) == firstSeasonNumber && <Link href={`/show/${id}/season/0`}>
									<a href={`/show/${id}/season/0`} className="season-navigation-btn">Series Specials</a>
								</Link>}

								{ seasons && (parseInt(season as string) + 1) < seasons.length && <Link href={`/show/${id}/season/${parseInt(season as string) + 1}`}>
									<a href={`/show/${id}/season/${parseInt(season as string) + 1}`} className="season-navigation-btn next">Next Season <GrFormNextLink/></a>
								</Link>}
							</div>
						</div>
					</div>
				</div>
			</>
		}
	</div>;
}

export default Season