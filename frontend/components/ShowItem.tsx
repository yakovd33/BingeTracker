import React from "react";
import Image from "next/image";

type ShowItemProps = {
	title: string;
	year: string;
	poster: string;
};

const ShowItem = ({ title, year, poster }: ShowItemProps) => {
	return (
		<div className="show-item">

			<div className="show-item-poster-container">
				{/* <img src={poster} className="show-item-poster" alt="" /> */}
                <Image
                    src={ poster }
                    alt="Picture of the author"
                    height={ 400 }
                    width={ 400 }
                    objectFit="contain"
                    quality="100"
                />
			</div>

			<div className="show-item-title">{title}</div>
			<div className="show-item-year">{year}</div>
		</div>
	);
};

export default ShowItem;
