import * as React from "react";
import { useState, useEffect } from "react";
import ShowItem from "../components/ShowItem";
import ApiHelper from "../helpers/ApiHelper";
import Link from "next/link";

interface ShowsInterface {
	title: string;
	year: string;
	poster: string;
	traktId: number;
}

const Shows = () => {
	const [showsList, setShowsList] = useState<ShowsInterface[]>([]);

	useEffect(() => {
		ApiHelper.get("shows", (res: any) => {
			setShowsList(res);
		});
	}, []);

	return (
		<div>
			<div id="shows-list">
				{ showsList && showsList.map((show) => (
					<Link href={ `/show/${ show.traktId }` }>
						<a href={ `/show/${ show.traktId }` }>
							<ShowItem
								title={show.title}
								year={show.year}
								poster={show.poster}
							/>
						</a>
					</Link>
				)) }
			</div>
		</div>
	);
};

export default Shows;
