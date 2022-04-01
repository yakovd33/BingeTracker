import * as React from 'react';
import { useState, useEffect } from 'react';
import Image from "next/image";

type MovieItemProps = {
	title: string;
	year: string;
	poster: string;
	type?: string;
};

const MovieItem = ({ title, year, poster, type }: MovieItemProps) => {
	const [ posterPic, setPosterPic ] = useState<string>();

	useEffect(() => {
		// Get poster
	}, []);
	
	return (
		<div className="movie-item">
			{ type && <div className="result-item-type">{ type }</div> }

			<div className="movie-item-poster-container">
                <Image
                    src={ poster }
                    alt="Picture of the author"
                    height={ 400 }
                    width={ 400 }
                    objectFit="contain"
                    quality="100"
                />
			</div>

			<div className="result-item-textuals">
				<div className="movie-item-title">{title}</div>
				<div className="movie-item-year">{year}</div>
			</div>
		</div>
	);
};

export default MovieItem;
