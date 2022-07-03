import { MovieInterface } from "./movieInterface";
import { EpisodeInterface } from "./episodeInterface";

export interface watchInterface {
    id: number;
    user_id: number;
    date: object;
    imdb_id: string;
    show_trakt_id?: string;
    type: string;
    episode?: {
        type: string;
        episode: EpisodeInterface
    };
    movie?: MovieInterface;
}

export interface watchInterfacDay {
    date: string;
    history: watchInterface[]
}