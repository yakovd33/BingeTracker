import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import ApiHelper from "../../helpers/ApiHelper";
import { ShowInterface } from '../../interfaces/showInterface';
import { SeasonInterface } from '../../interfaces/seasonInterface';
import Link from "next/link";

const Show = ({ show, setShow, seasons, setSeasons } : any) => {
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		if (id) {
			ApiHelper.get(`shows/${ id }`, (show : any) => {
				if (show.data.length) {
					setSeasons(show.data[0].seasons.data);
					setShow(show.data[0].show);
				}
			});
		}
	}, [ id ]);

	const getSeasonPoster = (seasonNumber : number) => {
		let posterUrl = '';

		show?.images?.seasonposter.forEach((poster : any) => {
			if (poster.season == seasonNumber) {
				posterUrl = poster.url;
			}
		});

		return posterUrl;
	}

	return <div id="show-single-wrap">
			{ show &&
				<>
					<div id="show-single-hero" style={{ backgroundImage: `url('${show?.images?.showbackground[Math.floor(Math.random() * show?.images?.showbackground.length)].url}')` }}>
						<img src={ show?.images?.showbackground[Math.floor(Math.random() * show?.images?.showbackground.length)].url } alt="" />
						<div className="container">
							<div id="show-single-hero-textuals">
								<div id="show-single-hero-title">{ show.title } - { show.year }</div>
							</div>

							<div id="floating-show-sidebar">
								<div id="show-poster">
									<img src={ show?.images?.tvposter[0]?.url } alt="" />
								</div>
							</div>

							<div id="show-content-wrap">
								<h6 className="show-content-title">Overview:</h6>
								<p>
									{ show.overview }
								</p>

								<div id="show-details">
									<h4>YEAR: { show.year }</h4>
									<h4>STATUS: { show.status }</h4>
									<h4>NETWORK: { show.network }</h4>
									<h4>EPISODES: { show.aired_episodes }</h4>
								</div>

								<h4 id="seasons-title">Seasons:</h4>

								<div id="seasons-wrap">
									{ seasons && seasons.map((season : SeasonInterface) => (
										<Link href={ `${id}/season/${season.number}` }>
											<div className="season-item">
												<a href={ `${id}/season/${season.number}` }>
													<div className="season-image">
														<img src={ getSeasonPoster(season.number) } alt="" />
													</div>

													<div className="season-name">
														{ `${ season.number == 0 ? 'Specials' : `Season ${season.number}` }`}
													</div>

													<div className="season-episode-count">
														{ season?.episodes?.length } Episodes
													</div>
												</a>
											</div>
										</Link>
									)) }
								</div>
							</div>
						</div>
					</div>
				</>
			}
	</div>;
};

export default Show;
