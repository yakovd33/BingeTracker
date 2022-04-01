import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import ApiHelper from "../../helpers/ApiHelper";

interface ShowInterface {
	title: string;
	poster: string;
	images: any;
	year: string;
}

const Show = () => {
	const router = useRouter();
	const { id } = router.query;
	const [show, setShow] = useState<ShowInterface>();

	useEffect(() => {
		ApiHelper.get(`shows/${ id }`, (show : any) => {
			if (show.data.length) {
				setShow(show.data[0].show);
			}
		});
	}, [ id ]);

	return <div id="show-single-wrap">
			{ show &&
				<div id="show-single-hero">
					<img src={ show.images.showbackground[Math.floor(Math.random() * show.images.showbackground.length)].url } alt="" />
					<div className="container">

						<div id="show-single-hero-textuals">
							<div id="show-single-hero-title">{ show.title } - { show.year }</div>
						</div>
					</div>
				</div>
			}
	</div>;
};

export default Show;
