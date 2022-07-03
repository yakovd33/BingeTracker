import { EpisodeInterface } from "../interfaces/episodeInterface";
import { MovieInterface } from "../interfaces/movieInterface";
import { ShowInterface } from "../interfaces/showInterface";

export interface IdsInterface {
    trakt?: number;
    slug?: string;
    imdb?: string;
    tmdb?: number;
    tvdb?: number;
    tvrage?: number;
}

export interface resultInterface {
    type: string;
    score?: number;
    movie?: MovieInterface;
    show?: ShowInterface;
    episode?: EpisodeInterface;
    poster: string;
}