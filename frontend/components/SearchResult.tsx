import Link from "next/link";
import React from "react";
import { resultInterface } from "../global/interfaces";
import MovieItem from "./MovieItem";
import ShowItem from "./ShowItem";

interface Props {
	result: resultInterface;
}

const SearchResult = ({ result }: Props) => {
	return (
		<div>
			{result && result.show && result.show.ids && (
				<Link href={`/show/${result.show.ids.trakt}`}>
					<a href={`/show/${result.show.ids.trakt}`}>
						<ShowItem
							title={result.show.title}
							year={result.show.year}
                            type={ result.type }
							imdbId={ result.show.ids.imdb }
						/>
					</a>
				</Link>
			)}

            {result && result.movie && result.movie.ids && (
				<Link href={`/movie/${result.movie.ids.trakt}`}>
					<a href={`/movie/${result.movie.ids.trakt}`}>
						<MovieItem
							title={result.movie.title}
							year={result.movie.year}
                            type={ result.type }
							imdbId={ result.movie.ids.imdb }
						/>
					</a>
				</Link>
			)}
		</div>
	);
};

export default SearchResult;
