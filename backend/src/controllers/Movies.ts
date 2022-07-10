import { Request, Response } from 'express';
import { MovieInterface } from 'src/interfaces/movieInterface';
import trakt from '../trakt';


export async function getPopularMovies(req: Request, res: Response) {

    let movies = await trakt.movies.recommended({
        pagination: true,
        limit: 25,
        page: req.params.page
    });    

    let finalMovies : MovieInterface[] = [];

    for (let i = 0; i < movies.data.length; i++) {
        let movie = movies.data[i].movie;

        finalMovies.push({
            title: movie.title,
            year: movie.year,
            traktId: movie.ids.trakt,
            imdbId: movie.ids.imdb,
        });
    }
        
    return res.status(200).json(finalMovies);
}