import logger from './Logger';
import axios from 'axios';
import DB from '../db';
import bcrypt from 'bcrypt';

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

export const getPosterFromTmdb = async (imdbId: number, type : string) : Promise<string> => {
    let apiKey = process.env.TMDB_KEY;
    let url = `https://api.themoviedb.org/3/find/${ imdbId }?api_key=${ apiKey }&language=en-US&external_source=imdb_id`;
    let images = await axios.get(url);
    let finalPath = '';

    if (type == 'show') {
        finalPath = images.data.tv_results[0].poster_path
    } else if (type == 'movie') {
        finalPath = images.data.movie_results[0].poster_path
    } else if (type == 'episode') {        
        finalPath = images.data.tv_episode_results[0].still_path
    }

    if (finalPath != '') {
        return `https://www.themoviedb.org/t/p/w220_and_h330_face/${finalPath}`
    }
    
    return '';
}

export const getFanartPics = async (tvdbId: number) : Promise<any> => {
    if (tvdbId) {
        let apiKey = process.env.FANART_KEY;
        let url = `https://webservice.fanart.tv/v3/tv/${ tvdbId }?api_key=${ apiKey }`;
        let images = await axios.get(url);

        return images.data;
    } else {
        return null
    }
}

export const isEmailValid = (email : string) => {
    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
}

export const doesEmailExist = async (email : string) => {
    try {
        let emailQuery = await DB.query(`SELECT * FROM users WHERE email = '${ email }'`);        
        return emailQuery.rows.length > 0;
    } catch (e) {
        console.log(e);
    }

    return false;
}

export const getUserRowByEmail = async (email : string) => {
    try {
        let query = await DB.query(`SELECT * FROM users WHERE email = '${ email }'`);
        
        if (query.rows.length) {
            return query.rows[0];
        }
    } catch (e) {
        console.log(e);
    }

    return false;
}

export const checkPassHash = async (pass : string, hash : string) => {
    let compare = await bcrypt.compare(pass, hash);    
    return compare;
}