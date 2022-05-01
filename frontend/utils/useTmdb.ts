import React from "react";
import axios from 'axios';

export function useTmdb(imdbId: number, type: string) {
    const [result, setResult] = React.useState('');
    const [additionalData, setAdditionalData] = <any>React.useState(null);
    const [loading, setLoading] = React.useState("false");    
    
    React.useEffect(() => {        
        async function getTmdb(imdbId: number, type: string) {            
            if (imdbId) {
                let apiKey = process.env.TMDB_KEY;
                let url = `https://api.themoviedb.org/3/find/${imdbId}?api_key=${apiKey}&language=en-US&external_source=imdb_id`;
                let images = await axios.get(url);

                if (type == 'show') {
                    setResult(`https://www.themoviedb.org/t/p/w220_and_h330_face/${images?.data.tv_results[0]?.poster_path}`);
                } else if (type == 'movie') {
                    setResult(`https://www.themoviedb.org/t/p/w220_and_h330_face/${images?.data.movie_results[0]?.poster_path}`);
                } else if (type == 'episode') {
                    setResult(`https://www.themoviedb.org/t/p/w454_and_h254_bestv2/${images?.data?.tv_episode_results[0]?.still_path}`);
                    setAdditionalData(images.data.tv_episode_results[0]);                    
                    
                }
            }
        }

        getTmdb(imdbId, type);
    }, [ imdbId, type ]);

    return [result, additionalData];
}
