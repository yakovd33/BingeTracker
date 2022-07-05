import React from 'react';
import { useTmdb } from '../../../../../../utils/useTmdb';

const EpisodeHero = ({ episodeInfo, poster }: any) => {
    if (!poster) {        
        [poster] = useTmdb(episodeInfo?.ids?.imdb, 'episode');
    }
    
    return (
        <div id="season-single-hero" style={{ backgroundImage: `url('${poster && poster}')` }}>
            <img src={`${poster}`} alt="" />
        </div>
    )
}

export default EpisodeHero;
