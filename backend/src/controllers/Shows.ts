import { getShowPosterFromTvdb, getPosterFromTmdb, getFanartPics } from '@shared/functions';
import { Request, Response } from 'express';
import { TypedRequestBody } from 'src/@types/express/TypedRequestBody';
import trakt from '../trakt';

interface ShowInterface {
    title: string;
    year: string;
    poster: string;
    traktId: number;
    imdbId: number;
}

export async function getPopularShows(req: Request, res: Response) {

    let shows = await trakt.shows.recommended({
        pagination: true,
        limit: 24,
        page: req.params.page
    });    

    let finalShows : ShowInterface[] = [];

    for (let i = 0; i < shows.data.length; i++) {
        let show = shows.data[i].show;

        finalShows.push({
            title: show.title,
            year: show.year,
            poster: (await getPosterFromTmdb(show.ids.imdb, 'show')).toString(),
            traktId: show.ids.trakt,
            imdbId: show.ids.imdb,
        });
    }
        
    return res.status(200).json(finalShows);
}

export async function getShowById (req: Request, res: Response) {
    let showId = req.params.id;    

    let show = await trakt.search.id({
        id_type: 'trakt',
        id: showId,
        type: 'show',
        extended: 'full'
    });

    // show.data[0].show['poster'] = await getShowPosterFromTmdb(show.data[0].show.ids.imdb);
    show.data[0].show['images'] = await getFanartPics(show.data[0].show.ids.tvdb);

    res.status(200).json(show)
}