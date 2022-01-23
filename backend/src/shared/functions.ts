import logger from './Logger';
import axios from 'axios';

export const pErr = (err: Error) => {
    if (err) {
        logger.err(err);
    }
};

export const getRandomInt = () => {
    return Math.floor(Math.random() * 1_000_000_000_000);
};

export const getShowPosterFromTvdb = async (id: number) : Promise<string> => {
    let url = `https://api.thetvdb.com/series/${ id }/images/query?keyType=poster`;
    let images = await axios.get(url);

    return `https://thetvdb.com/banners/${ images.data.data[0].fileName }`;
}