import React from "react";
import axios from 'axios';

export function useTmdb(imdbId: string, type: string, defaultPicture = 'placeholder') {
    const [result, setResult] = React.useState('');
    const [additionalData, setAdditionalData] = <any>React.useState(null);
    const [loading, setLoading] = React.useState("false");   
    
    React.useEffect(() => {        
        async function getTmdb(imdbId: string, type: string) {            
            let apiKey = process.env.TMDB_KEY;
            let url = `https://api.themoviedb.org/3/find/${imdbId}?api_key=${apiKey}&language=en-US&external_source=imdb_id`;
            
            let images = await axios.get(url);            

            let finalPath = '';

            if (type == 'show') {
                finalPath = images?.data.tv_results[0]?.poster_path
                setResult(`https://www.themoviedb.org/t/p/w220_and_h330_face/${finalPath}`);
            } else if (type == 'movie') {
                finalPath = images?.data.movie_results[0]?.poster_path
                setResult(`https://www.themoviedb.org/t/p/w220_and_h330_face/${finalPath}`);
            } else if (type == 'episode') {
                finalPath = images?.data?.tv_episode_results[0]?.still_path
                setResult(`https://image.tmdb.org/t/p/w500/${finalPath}`);

                if (images?.data?.tv_episode_results[0]) {
                    setAdditionalData(images.data.tv_episode_results[0]);                    
                }
            }
                                  
            if (!finalPath || finalPath == '') {
                setResult(`/${defaultPicture}.png`)
            }
        }

        getTmdb(imdbId, type);
    }, [ imdbId, type ]);

    console.log(result);
    

    return [result, additionalData];
}
