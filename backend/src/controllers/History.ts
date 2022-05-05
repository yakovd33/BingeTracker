import { Request, Response } from 'express';
import DB from '../db';
import { TypedRequestQueryHeadersParams } from 'src/@types/express/CustomRequest';

export async function historyWatch(req: TypedRequestQueryHeadersParams<any, any, any, any>, res: Response) {
    let { imdbId } = req.params;
    const userId = req.user.user_id;

    DB.query("INSERT INTO watches (user_id, imdb_id) VALUES($1, $2)", [ userId, imdbId ]);

    res.send('');
}

export async function historyUnWatch(req: TypedRequestQueryHeadersParams<any, any, any, any>, res: Response) {
    let { imdbId } = req.params;
    const userId = req.user.user_id;

    DB.query("DELETE FROM watches WHERE user_id = $1 AND imdb_id = $2", [ userId, imdbId ]);

    res.send('');
}