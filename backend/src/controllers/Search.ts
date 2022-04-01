import { Request, Response } from 'express';
import trakt from '../trakt';

export async function getSearchResults(req: Request, res: Response) {
    let keywords = req.params.keywords;

    let results = await trakt.search.text({
        query: keywords,
        type: 'show,movie'
    });

    res.json(results)
}