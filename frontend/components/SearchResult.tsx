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
			{result && result.show && (
				<Link href={`/show/${result.show.ids.trakt}`}>
					<a href={`/show/${result.show.ids.trakt}`}>
						<ShowItem
							title={result.show.title}
							year={result.show.year}
							poster={result.poster}
                            type={ result.type }
						/>
					</a>
				</Link>
			)}

            {result && result.movie && (
				<Link href={`/movie/${result.movie.ids.trakt}`}>
					<a href={`/movie/${result.movie.ids.trakt}`}>
						<MovieItem
							title={result.movie.title}
							year={result.movie.year}
							poster={result.poster}
                            type={ result.type }
						/>
					</a>
				</Link>
			)}
		</div>
	);
};

export default SearchResult;
