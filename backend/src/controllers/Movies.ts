import { getPosterFromTmdb } from '@shared/functions';
import { Request, Response } from 'express';
import { TypedRequestBody } from 'src/@types/express/TypedRequestBody';
import trakt from '../trakt';

interface MovieInterface {
    title: string;
    year: string;
    poster: string;
    traktId: number;
    imdbId: number;
}

export async function getPopularMovies(req: Request, res: Response) {

    let movies = await trakt.movies.recommended({
        pagination: true,
        limit: 24,
        page: req.params.page
    });    

    let finalMovies : MovieInterface[] = [];

    for (let i = 0; i < movies.data.length; i++) {
        let movie = movies.data[i].movie;

        finalMovies.push({
            title: movie.title,
            year: movie.year,
            poster: (await getPosterFromTmdb(movie.ids.imdb, 'movie')).toString(),
            // poster: 'https://place-hold.it/300x500',
            traktId: movie.ids.trakt,
            imdbId: movie.ids.imdb,
        });
    }
        
    return res.status(200).json(finalMovies);
}