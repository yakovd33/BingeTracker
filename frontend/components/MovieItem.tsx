import * as React from 'react';
import { useState, useEffect } from 'react';
import Image from "next/image";
import { useTmdb } from '../utils/useTmdb';

type MovieItemProps = {
	title: string;
	year?: string;
	type?: string;
	imdbId: string;
	poster?: string;
};

const MovieItem = ({ title, year, type, imdbId, poster }: MovieItemProps) => {
	let banner = poster;
	if (!banner) {
		[banner] = useTmdb(imdbId, 'movie', 'placeholder-vertical');
	}
	
	return (
		<div className="movie-item">
			<div className="result-item-floating">
				{ type && <div className="result-item-type">{ type }</div> }
				{ year && <div className="show-item-year">{year}</div> }
			</div>
			
			<div className="movie-item-poster-container">
                <Image
                    src={ banner || '/placeholder.png'  }
                    alt="Picture of the author"
                    height={ 400 }
                    width={ 400 }
                    objectFit="contain"
                    quality="100"
                />
			</div>

			<div className="result-item-textuals">
				<div className="movie-item-title">{title}</div>
			</div>
		</div>
	);
};

export default MovieItem;
