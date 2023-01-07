import axios from 'axios';

export const getFanartPics = async (tvdbId: number) : Promise<any> => {
    let apiKey = process.env.FANART_KEY;
    let url = `https://webservice.fanart.tv/v3/tv/${ tvdbId }?api_key=${ apiKey }`;
    let images = await axios.get(url);

    return images.data;
}

export const getPosterFromTmdb = async (imdbId: number, type : string) : Promise<string> => {
    let apiKey = process.env.TMDB_KEY;
    let url = `https://api.themoviedb.org/3/find/${ imdbId }?api_key=${ apiKey }&language=en-US&external_source=imdb_id`;

    let images = await axios.get(url);

    if (type == 'show') {
        return `https://www.themoviedb.org/t/p/w220_and_h330_face/${ images.data.tv_results[0].poster_path  }`;
    } else if (type == 'movie') {
        return `https://www.themoviedb.org/t/p/w220_and_h330_face/${ images.data.movie_results[0].poster_path  }`;
    } else if (type == 'episode') {
        return 'dddd';
    }

    return '';
}