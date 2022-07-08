import React from "react";
import Image from "next/image";
import { useTmdb } from "../utils/useTmdb";

type ShowItemProps = {
	title: string;
	year?: string;
	type?: string;
	imdbId: string;
	poster?: string;
};

const ShowItem = ({ title, year, type, imdbId, poster }: ShowItemProps) => {	
	let banner = poster;
	if (!banner) {
		[banner] = useTmdb(imdbId, 'show', 'placeholder-vertical');
	}

	return (
		<div className="show-item">
			<div className="result-item-floating">
				{ type && <div className="result-item-type">{ type }</div> }
				{ year && <div className="show-item-year">{year}</div> }
			</div>
			
			<div className="show-item-poster-container">
                <Image
                    src={ banner || '/placeholder-vertical.png' }
                    alt="Picture of the author"
                    height={ 400 }
                    width={ 400 }
                    objectFit="contain"
                    quality="100"
                />
			</div>

			<div className="result-item-textuals">
				<div className="show-item-title">{title}</div>
			</div>
		</div>
	);
};

export default ShowItem;
