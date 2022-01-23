import { getShowPosterFromTvdb } from '@shared/functions';
import { Request, Response } from 'express';
import trakt from '../trakt';

interface ShowInterface {
    title: string;
    year: string;
    poster: string;
    traktId: number;
}

export async function getPopularShows(req: Request, res: Response) {
    let shows = await trakt.shows.popular({
        pagination: true
    });

    let finalShows : ShowInterface[] = [];

    for (let i = 0; i < shows.data.length; i++) {
        let show = shows.data[i];
        finalShows.push({
            title: show.title,
            year: show.year,
            poster: (await getShowPosterFromTvdb(show.ids.tvdb)).toString(),
            traktId: show.ids.trakt
        });
    }
        
    return res.status(200).json(finalShows);
}