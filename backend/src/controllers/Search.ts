import { Request, Response } from 'express';
import trakt from '../trakt';
import { resultInterface } from 'src/interfaces/resultInterface';
import { getPosterFromTmdb } from '@shared/functions';

export async function getSearchResults(req: Request, res: Response) {
    let keywords = req.params.keywords;

    let results = await trakt.search.text({
        query: keywords,
        type: 'show,movie'
    });
    
    let finalResults : resultInterface[] = [];

    for (var i = 0; i < results.data.length; i++) {
        let item = results.data[i];

        if (item.type == 'movie') {            
            if (item?.movie?.ids?.imdb) {
                finalResults.push({
                    ...item, poster: (await getPosterFromTmdb(item.movie.ids.imdb, 'movie')).toString()
                });
            }
        } else if (item.type == 'show') {
            if (item?.show?.ids?.imdb) {
                finalResults.push({
                    ...item, poster: (await getPosterFromTmdb(item.show.ids.imdb, 'show')).toString()
                });
            }
        }
    }

    res.json(finalResults)
}