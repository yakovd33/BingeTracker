import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { ShowInterface } from '../../../../interfaces/showInterface';
import { SeasonInterface } from '../../../../interfaces/seasonInterface';
import ApiHelper from "../../../../helpers/ApiHelper";
import { useTmdb } from '../../../../utils/useTmdb';
import EpisoodeItem from "../../../../components/EpisoodeItem";

const Season = ({ show, setShow, seasons, setSeasons }: any) => {
	const router = useRouter();
	const { id, season } = router.query;

	console.log(seasons);
	

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
								{ seasons && seasons[parseInt(season.toString())].episodes.map((episodeItem: any) => (
									<EpisoodeItem showId={ id } episodeItem={episodeItem} />
								))}
							</div>
						</div>
					</div>
				</div>
			</>
		}
	</div>;
}

export default Season