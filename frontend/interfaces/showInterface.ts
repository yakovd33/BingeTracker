import { IdsInterface } from "./idsInterface";

export interface ShowInterface {
    title: string;
    year: string;
    poster: string;
    traktId: number;
    imdbId: number;
    ids?: IdsInterface;
    overview: string;
    status: string;
    network: string;
    aired_episodes: number;
    images: {
        tvposter: [{
            url: string;
        }], showbackground: [{
            url: string;
        }], seasonposter: [{
            url: string;
        }], seasonbanner: [{
            url: string;
        }]
    }
}