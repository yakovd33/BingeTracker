import React from "react";
import Image from "next/image";

type ShowItemProps = {
	title: string;
	year?: string;
	poster: string;
	type?: string;
};

const ShowItem = ({ title, year, poster, type }: ShowItemProps) => {
	return (
		<div className="show-item">
			<div className="result-item-floating">
				{ type && <div className="result-item-type">{ type }</div> }
				{ year && <div className="show-item-year">{year}</div> }
			</div>
			
			<div className="show-item-poster-container">
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
				<div className="show-item-title">{title}</div>
			</div>
		</div>
	);
};

export default ShowItem;
