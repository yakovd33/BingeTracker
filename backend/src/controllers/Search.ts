import { Request, Response } from 'express';
import trakt from '../trakt';
import { resultInterface } from 'src/interfaces/resultInterface';

export async function getSearchResults(req: Request, res: Response) {
    let keywords = req.params.keywords;

    let results = await trakt.search.text({
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