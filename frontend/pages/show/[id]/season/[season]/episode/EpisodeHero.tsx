import React from 'react';
import { useTmdb } from '../../../../../../utils/useTmdb';

const EpisodeHero = ({ episodeInfo }: any) => {
    let [episodeBanner, addittionalData] = useTmdb(episodeInfo?.ids?.imdb, 'episode');        

    return (
        <div id="season-single-hero" style={{ backgroundImage: `url('${episodeBanner && episodeBanner}')` }}>
            <img src={`${episodeBanner}`} alt="" />
        </div>
    )
}

export default EpisodeHero;
