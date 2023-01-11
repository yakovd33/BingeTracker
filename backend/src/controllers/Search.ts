import { Request, Response } from 'express';
import trakt from '../trakt';
import { resultInterface } from '../interfaces/resultInterface';

export async function getSearchResults(req: Request, res: Response) {
    const keywords = req.params.keywords;

    const results = await trakt.search.text({
        query: keywords,
        type: 'show,movie',
    });
    
    let finalResults : resultInterface[] = [];

    for (var i = 0; i < results.data.length; i++) {
        let item = results.data[i];
        finalResults.push(item);
    }

    res.json(finalResults)
}