import {  Request, Response } from 'express';
import trakt from '../trakt';
import { ShowInterface } from '../interfaces/showInterface'
import { checkConnected } from 'src/middleware/Auth';
import DB from '../db';
import { getShowByImdbId } from 'src/utils/shows';

export async function getPopularShows(req: Request, res: Response) {

    let shows = await trakt.shows.recommended({
        pagination: true,
        limit: 25,
        page: req.params.page
    });    

    let finalShows : ShowInterface[] = [];

    for (let i = 0; i < shows.data.length; i++) {
        let show = shows.data[i].show;

        finalShows.push({
            title: show.title,
            year: show.year,
            traktId: show.ids.trakt,
            imdbId: show.ids.imdb,
        });
    }
        
    return res.status(200).json(finalShows);
}

export async function getShowById (req: Request, res: Response) {
    let showId = req.params.id;
    let show = await getShowByImdbId(showId, true, true);
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
                
        let query = await DB.query("SELECT * FROM watches WHERE user_id = $1 AND imdb_id = $2", [ userId, episodeRes.data.ids.imdb ]);
        
        episodeRes.data.watches = query.rowCount;
    }    

    res.status(200).json(episodeRes)
}