import { Request, Response } from 'express';
import DB from '../db';
import { TypedRequestQueryHeadersParams } from 'src/@types/express/CustomRequest';
import { watchInterface, watchInterfacDay } from '../interfaces/history'
import { getSqlDateColumnToString } from 'src/utils/database';
import { getShowById } from './Shows';
import { getEpisodeByImdbId, getShowByImdbId } from 'src/utils/shows';
import { getPosterFromTmdb } from '@shared/functions';

export async function historyWatch(req: TypedRequestQueryHeadersParams<any, any, any, any>, res: Response) {
    let { imdbId, type } = req.params;
    let { showTraktId } = req.body;
    const userId = req.user.user_id;

    DB.query("INSERT INTO watches (user_id, imdb_id, type, show_trakt_id) VALUES($1, $2, $3, $4)", [userId, imdbId, type, showTraktId]);

    res.send('');
}

export async function historyUnWatch(req: TypedRequestQueryHeadersParams<any, any, any, any>, res: Response) {
    let { imdbId } = req.params;
    const userId = req.user.user_id;

    DB.query("DELETE FROM watches WHERE user_id = $1 AND imdb_id = $2", [userId, imdbId]);

    res.send('');
}

const HISTORY_ITEMS_PER_PAGE = 20

export async function getMyHistory(req: TypedRequestQueryHeadersParams<any, any, any, any>, res: Response) {
    let days = <watchInterfacDay[]>[];
    const userId = req.user.user_id;
    let page = req.params.page || 0;

    const HISTORY_WHERE = `WHERE user_id = ${userId}`
    const HISTORY_LIMIT = `LIMIT ${HISTORY_ITEMS_PER_PAGE} OFFSET ${(page) * HISTORY_ITEMS_PER_PAGE}`;
    const DATE_FORMAT = `TO_CHAR(date, 'YYYY-MM-DD')`;

    let historyDaysQuery = await DB.query(`SELECT DISTINCT ${DATE_FORMAT} AS date, COUNT(*) AS watches FROM watches ${HISTORY_WHERE} AND date IS NOT NULL GROUP BY date ORDER BY date DESC ${HISTORY_LIMIT}`)        

    for (let i = 0; i < historyDaysQuery.rows.length; i++) {
        let historyDay = historyDaysQuery.rows[i];
        let historyDate = historyDay.date;
        let historyQuery = await DB.query(`SELECT *, ${getSqlDateColumnToString('date')} AS date FROM watches ${HISTORY_WHERE} AND ${DATE_FORMAT} = '${historyDate}' ${HISTORY_LIMIT}`);

        if (historyQuery.rows.length) {
            let history = <any>[];

            for (let j = 0; j < historyQuery.rows.length; j++) {
                let historyItem = historyQuery.rows[j];

                if (historyItem.type == 'show') {
                    let episodeQuery = await getEpisodeByImdbId(historyItem['imdb_id']);
                    let episode = episodeQuery[0]?.episode;
                    let episodeImdb = episode?.ids?.imdb;
                    
                    if (episodeImdb) {
                        historyItem['poster'] = await getPosterFromTmdb(episodeImdb, 'episode')                        
                        historyItem['episode'] = episode
                        history.push(historyItem)
                    }
                } else if (historyItem.type == 'movie') {
                    // TODO: Insert movie
                }   
            }

            days.push({
                'date': historyDate,
                'history': history
            });
        }
    }
    res.json(days);
}