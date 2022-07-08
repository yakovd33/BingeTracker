import { EpisodeInterface } from "../interfaces/episodeInterface";
import { MovieInterface } from "../interfaces/movieInterface";
import { ShowInterface } from "../interfaces/showInterface";

export interface resultInterface {
    type: string;
    score?: number;
    movie?: MovieInterface;
    show?: ShowInterface;
    episode?: EpisodeInterface;
}