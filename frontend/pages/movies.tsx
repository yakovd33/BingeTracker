import * as React from "react";
import { useState, useEffect } from "react";
import MovieItem from "../components/MovieItem";
import ApiHelper from "../helpers/ApiHelper";
import Link from "next/link";

interface MoviesInterface {
	title: string;
	year: string;
	poster: string;
	traktId: number;
	imdbId: string;
}

const Movies = () => {
	const [moviesList, setMoviesList] = useState<MoviesInterface[]>([
        {
            "title":"Spider-Man: No Way Home",
            "year":'2021',
            "poster":"https://www.themoviedb.org/t/p/w220_and_h330_face/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
            "traktId":474180,
            "imdbId":"tt10872600"
        },
        {
            "title":"Eternals",
            "year":'2021',
            "poster":"https://www.themoviedb.org/t/p/w220_and_h330_face/6AdXwFTRTAzggD2QUTt5B7JFGKL.jpg",
            "traktId":372798,
            "imdbId":"tt9032400"
        },
        {
            "title":"Ghostbusters: Afterlife",
            "year":'2021',
            "poster":"https://www.themoviedb.org/t/p/w220_and_h330_face/sg4xJaufDiQl7caFEskBtQXfD4x.jpg",
            "traktId":270182,
            "imdbId":"tt4513678"
        },
        {
            "title":"Interstellar",
            "year":'2014',
            "poster":"https://www.themoviedb.org/t/p/w220_and_h330_face/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
            "traktId":102156,
            "imdbId":"tt0816692"
        },
        {
            "title":"Dune",
            "year":'2021',
            "poster":"https://www.themoviedb.org/t/p/w220_and_h330_face/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
            "traktId":287071,
            "imdbId":"tt1160419"
        },
        {
            "title":"Deadpool",
            "year":'2016',
            "poster":"https://www.themoviedb.org/t/p/w220_and_h330_face/fSRb7vyIP8rQpL0I47P3qUsEKX3.jpg",
            "traktId":190430,
            "imdbId":"tt1431045"
        },
        {
            "title":"The Matrix Resurrections",
            "year":'2021',
            "poster":"https://www.themoviedb.org/t/p/w220_and_h330_face/8c4a8kE7PizaGQQnditMmI1xbRp.jpg",
            "traktId":466465,
            "imdbId":"tt10838180"
        },
        {
            "title":"Shang-Chi and the Legend of the Ten Rings",
            "year":'2021',
            "poster":"https://www.themoviedb.org/t/p/w220_and_h330_face/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg",
            "traktId":416151,
            "imdbId":"tt9376612"
        },
        {
            "title":"Don't Look Up",
            "year":'2021',
            "poster":"https://www.themoviedb.org/t/p/w220_and_h330_face/th4E1yqsE8DGpAseLiUrI60Hf8V.jpg",
            "traktId":483617,
            "imdbId":"tt11286314"
        },
        {
            "title":"Encanto",
            "year":'2021',
            "poster":"https://www.themoviedb.org/t/p/w220_and_h330_face/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg",
            "traktId":419442,
            "imdbId":"tt2953050"
        },
        {
            "title":"The Matrix",
            "year":'1999',
            "poster":"https://www.themoviedb.org/t/p/w220_and_h330_face/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
            "traktId":481,
            "imdbId":"tt0133093"
        },
        {
            "title":"The Shawshank Redemption",
            "year":'1994',
            "poster":"https://www.themoviedb.org/t/p/w220_and_h330_face/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
            "traktId":234,
            "imdbId":"tt0111161"
        },
        {
            "title":"Nobody",
            "year":'2021',
            "poster":"https://www.themoviedb.org/t/p/w220_and_h330_face/oBgWY00bEFeZ9N25wWVyuQddbAo.jpg",
            "traktId":458837,
            "imdbId":"tt7888964"
        },
        {
            "title":"Inception",
            "year":'2010',
            "poster":"https://www.themoviedb.org/t/p/w220_and_h330_face/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
            "traktId":16662,
            "imdbId":"tt1375666"
        },
        {
            "title":"No Time to Die",
            "year":'2021',
            "poster":"https://www.themoviedb.org/t/p/w220_and_h330_face/iUgygt3fscRoKWCV1d0C7FbM9TP.jpg",
            "traktId":254935,
            "imdbId":"tt2382320"
        },
        {
            "title":"The Dark Knight",
            "year":'2008',
            "poster":"https://www.themoviedb.org/t/p/w220_and_h330_face/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
            "traktId":120,
            "imdbId":"tt0468569"
        },
        {
            "title":"Spider-Man: Into the Spider-Verse",
            "year":'2018',
            "poster":"https://www.themoviedb.org/t/p/w220_and_h330_face/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
            "traktId":205404,
            "imdbId":"tt4633694"
        },
        {
            "title":"Hotel Transylvania: Transformania",
            "year":'2022',
            "poster":"https://www.themoviedb.org/t/p/w220_and_h330_face/teCy1egGQa0y8ULJvlrDHQKnxBL.jpg",
            "traktId":432754,
            "imdbId":"tt9848626"
        },
        {
            "title":"V for Vendetta",
            "year":'2006',
            "poster":"https://www.themoviedb.org/t/p/w220_and_h330_face/kxekpqZUpO5W65QT12goucFvyx9.jpg",
            "traktId":595,
            "imdbId":"tt0434409"
        },
        {
            "title":"Kill Bill: Vol. 1",
            "year":'2003',
            "poster":"https://www.themoviedb.org/t/p/w220_and_h330_face/v7TaX8kXMXs5yFFGR41guUDNcnB.jpg",
            "traktId":19,
            "imdbId":"tt0266697"
        },
        {
            "title":"Free Guy",
            "year":'2021',
            "poster":"https://www.themoviedb.org/t/p/w220_and_h330_face/xmbU4JTUm8rsdtn7Y3Fcm30GpeT.jpg",
            "traktId":400704,
            "imdbId":"tt6264654"
        },
        {
            "title":"Sing 2",
            "year":'2021',
            "poster":"https://www.themoviedb.org/t/p/w220_and_h330_face/aWeKITRFbbwY8txG5uCj4rMCfSP.jpg",
            "traktId":284832,
            "imdbId":"tt6467266"
        },
        {
            "title":"Fight Club",
            "year":'1999',
            "poster":"https://www.themoviedb.org/t/p/w220_and_h330_face/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
            "traktId":432,
            "imdbId":"tt0137523"
        },
        {
            "title":"Pulp Fiction",
            "year":'1994',
            "poster":"https://www.themoviedb.org/t/p/w220_and_h330_face/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
            "traktId":554,
            "imdbId":"tt0110912"
        },
        {title: 'Nobody', year: '2021', poster: 'https://www.themoviedb.org/t/p/w220_and_h330_face/oBgWY00bEFeZ9N25wWVyuQddbAo.jpg', traktId: 458837, imdbId: 'tt7888964'},
    ]);
	const [ page, setPage ] = useState<number>(1);

	useEffect(() => {
		let tmpMovies = moviesList;

		if (page != 1) {
			ApiHelper.get(`movies/showcase/${ page }`, (res: any) => {
                console.log(res);
                
				setMoviesList(tmpMovies.concat(res));
			});
		}
	}, [ page ]);

	return (
		<div className="container">
			<div id="shows-list">
				{ moviesList && moviesList.map((movie) => (
					<Link href={ `/movie/${ movie.traktId }` }>
						<a href={ `/movie/${ movie.traktId }` }>
							<MovieItem
								title={movie.title}
								year={movie.year}
                                imdbId={movie.imdbId}
                                poster={movie.poster}
							/>
						</a>
					</Link>
				)) }
			</div>

			<div className="load-more-wrap">
				<div className="cute-btn" onClick={ () => setPage(page + 1) }>Load More Movies</div>
			</div>
		</div>
	);
};

export default Movies;