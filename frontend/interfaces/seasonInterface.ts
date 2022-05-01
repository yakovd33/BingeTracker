export interface SeasonInterface {
	number: number;
	ids: {
		trakt: number;
		tvdb: number;
		tmdb: number;
		tvrage: number;
	}, episodes: [{
		season: number;
		number: number;
		title: number;
		ids: {
			trakt: number;
			tvdb: number;
			tmdb: number;
			tvrage: number;
		};
	}]
}