import { EpisodeInterface } from '../interfaces/episodeInterface'

export interface watchInterface {
    id: number;
    user_id: number;
    date: string;
    imdb_id: string;
    type: string;
    show_trakt_id?: string;
    episode?: EpisodeInterface;
}

export interface watchInterfacDay {
    date: string;
    history: watchInterface[]
}