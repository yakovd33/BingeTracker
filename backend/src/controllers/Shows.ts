import { getPosterFromTmdb, getFanartPics } from '@shared/functions';
import { NextFunction, Request, Response } from 'express';
import trakt from '../trakt';
import { ShowInterface } from '../interfaces/showInterface'
import { checkConnected } from 'src/middleware/Auth';
import DB from '../db';

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

    // Get seasons
    show.data[0].seasons = await trakt.seasons.summary({ id: showId, extended: 'episodes' });

    show.data[0].show['images'] = await getFanartPics(show.data[0].show.ids.tvdb);

    res.status(200).json(show)
}

export async function getEpisodeByNumber (req: Request, res: Response) {
    const { season, episode, id } = req.params;
    const { logged } = req.query;

    let episodeRes = await trakt.episodes.summary({
        id,
        season,
        episode,
        extended: 'full'
    });    

    // Get user history of this episode
    
    const user = checkConnected(req, res);    
    if (user) {
        const userId = user.user_id;
        
        console.log(episodeRes.data.ids.imdb);
        
        let query = await DB.query("SELECT * FROM watches WHERE user_id = $1 AND imdb_id = $2", [ userId, episodeRes.data.ids.imdb ]);
        
        episodeRes.data.watches = query.rowCount;
    }    

    res.status(200).json(episodeRes)
}