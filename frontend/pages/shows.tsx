import * as React from "react";
import { useState, useEffect } from "react";
import ShowItem from "../components/ShowItem";
import ApiHelper from "../helpers/ApiHelper";
import Link from "next/link";

interface ShowsInterface {
	title: string;
	year: string;
	poster?: string;
	traktId: number;
	imdbId: string;
}

const Shows = () => {
	const [showsList, setShowsList] = useState<ShowsInterface[]>([
		{
			title: "Ozark",
			year: '2017',
			poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/m73bD8VjibSKuTWg597GQVyVhSb.jpg",
			traktId: 119913,
			imdbId: "tt5071412"
		},
		{
			title: "The Book of Boba Fett",
			year: '2021',
			poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/gNbdjDi1HamTCrfvM9JeA94bNi2.jpg",
			traktId: 171129,
			imdbId: "tt13668894"
		},
		{
			title: "Game of Thrones",
			year: '2011',
			poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
			traktId: 1390,
			imdbId: "tt0944947"
		},
		{
			title: "The Expanse",
			year: '2015',
			poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/lLidDKUYF5pcmH7zaM6J6nyRQGG.jpg",
			traktId: 77199,
			imdbId: "tt3230854"
		},
		{
			title: "Breaking Bad",
			year: '2008',
			poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
			traktId: 1388,
			imdbId: "tt0903747"
		},
		{
			title: "Peacemaker",
			year: '2022',
			poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/hE3LRZAY84fG19a18pzpkZERjTE.jpg",
			traktId: 169009,
			imdbId: "tt13146488"
		},
		{
			title: "The Witcher",
			year: '2019',
			poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
			traktId: 138163,
			imdbId: "tt5180504"
		},
		{
			title: "Yellowjackets",
			year: '2021',
			poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/XtnjzjjFAnmTEiDk4xu7diCvMF.jpg",
			traktId: 176276,
			imdbId: "tt11041332"
		},
		{
			title: "The Big Bang Theory",
			year: '2007',
			poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/ooBGRQBdbGzBxAVfExiO8r7kloA.jpg",
			traktId: 1409,
			imdbId: "tt0898266"
		},
		{
			title: "Dexter",
			year: '2006',
			poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/58H6Ctze1nnpS0s9vPmAAzPcipR.jpg",
			traktId: 1396,
			imdbId: "tt0773262"
		},
		{
			title: "Euphoria",
			year: '2019',
			poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/jtnfNzqZwN4E32FGGxx1YZaBWWf.jpg",
			traktId: 144629,
			imdbId: "tt8772296"
		},
		{
			title: "Friends",
			year: '1994',
			poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/oY3ck2Sdu8qsEWFnuiX2HEfr65k.jpg",
			traktId: 1657,
			imdbId: "tt0108778"
		},
		{
			title: "Arcane",
			year: '2021',
			poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
			traktId: 154164,
			imdbId: "tt11126994"
		},
		{
			title: "The Office",
			year: '2005',
			poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg",
			traktId: 2302,
			imdbId: "tt0386676"
		},
		{
			title: "Chernobyl",
			year: '2019',
			poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg",
			traktId: 145186,
			imdbId: "tt7366338"
		},
		{
			title: "1883",
			year: '2021',
			poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/waLbm384SQDwLTCn6ttPqQS5kfV.jpg",
			traktId: 173337,
			imdbId: "tt13991232"
		},
		{
			title: "Archive 81",
			year: '2022',
			poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/l1jeSEm6a88GFcLzlHQr60D0dOi.jpg",
			traktId: 168808,
			imdbId: "tt13365348"
		},
		{
			title: "Stranger Things",
			year: '2016',
			poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
			traktId: 104439,
			imdbId: "tt4574334"
		},
		{
			title: "How I Met Your Mother",
			year: '2005',
			poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/dvxSvr6OmYGvvt8Z1VdBlPfL1Lf.jpg",
			traktId: 1095,
			imdbId: "tt0460649"
		},
		{
			title: "The Blacklist",
			year: '2013',
			poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/htJzeRcYI2ewMm4PTrg98UMXShe.jpg",
			traktId: 46676,
			imdbId: "tt2741602"
		},
		{
			title: "Yellowstone",
			year: '2018',
			poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/iqWCUwLcjkVgtpsDLs8xx8kscg6.jpg",
			traktId: 126995,
			imdbId: "tt4236770"
		},
		{
			title: "Sherlock",
			year: '2010',
			poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/7WTsnHkbA0FaG6R9twfFde0I9hl.jpg",
			traktId: 19792,
			imdbId: "tt1475582"
		},
		{
			title: "Dexter: New Blood",
			year: '2021',
			poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/9EBKgrFIsCFSV1RZKWhYUdbtGiv.jpg",
			traktId: 187026,
			imdbId: "tt14164730"
		},
		{ title: 'The Simpsons', year: '1989', poster: 'https://www.themoviedb.org/t/p/w220_and_h330_face/tubgEpjTUA7t0kejVMBsNBZDarZ.jpg', traktId: 455, imdbId: 'tt0096697' },
		{ title: 'Euphoria', year: '2019', poster: 'https://www.themoviedb.org/t/p/w220_and_h330_face/jtnfNzqZwN4E32FGGxx1YZaBWWf.jpg', traktId: 144629, imdbId: 'tt8772296' }
	]);
	const [page, setPage] = useState<number>(1);

	useEffect(() => {
		let tmpShows = showsList;

		if (page != 1) {
			ApiHelper.get(`shows/showcase/${page}`, (res: any) => {
				setShowsList(tmpShows.concat(res));
			});
		}
	}, [page]);

	return (
		<div className="container">
			<div id="shows-list">
				{showsList && showsList.map((show) => (
					<Link href={`/show/${show.traktId}`}>
						<a href={`/show/${show.traktId}`}>
							<ShowItem
								title={show.title}
								year={show.year}
								imdbId={ show.imdbId }
								poster={ show.poster }
							/>
						</a>
					</Link>
				))}
			</div>

			<div className="load-more-wrap">
				<div className="cute-btn" onClick={() => setPage(page + 1)}>Load More Shows</div>
			</div>
		</div>
	);
};

export default Shows;
