import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import ApiHelper from '../helpers/ApiHelper';
import { useTmdb } from '../utils/useTmdb';
import { BsFillCheckCircleFill } from 'react-icons/bs'
import ReactTooltip from 'react-tooltip';

// TODO: Check icon to watched episodes(hover: watch counter)
const EpisoodeItem = ({ episodeItem, showId }: any) => {
    const [ poster, additionalData ] = useTmdb(episodeItem.ids.imdb, 'episode');
    const episodeLink = `/show/${ showId }/season/${ episodeItem.season }/episode/${ episodeItem.number }/`;
    const [ watchCount, setWatchCount ] = useState(0);

    useEffect(() => {
        ApiHelper.get('history/get_watch_count/' + episodeItem.ids.imdb, (res: any) => {
            setWatchCount(res.count)
        });
    }, []);

    return (
        <Link href={{ pathname: episodeLink, query: { poster: poster, title: episodeItem.title, overview: additionalData?.overview }}}
          as={episodeLink}>
            <a className="episode-link" href={ `/show/${ showId }/season/${ episodeItem.season }/episode/${ episodeItem.number }/` }>
                <div className={`episode-item ${watchCount ? 'watched' : ''}`}>
                    { watchCount > 0 &&
                        <>
                            <ReactTooltip effect="solid"  />
                            <span className="watched-tick" data-tip={`You watched this episode ${watchCount} ${watchCount == 1 ? 'time' : 'times'}`}><BsFillCheckCircleFill/></span>
                        </>
                    }
                    
                    <div className="episode-item-left">
                        <div className="episode-item-img">
                            <img src={poster} alt="" />
                        </div>
                    </div>

                    <div className="episode-item-right">
                        <div className="episode-item-name">
                            <strong>{ episodeItem.season }x{ episodeItem.number }</strong> {episodeItem.title}
                        </div>

                        <div className="episode-item-air-date">
                            { additionalData && additionalData.air_date }
                        </div>

                        <div className="episode-item-overview">
                            { additionalData && additionalData.overview }
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default EpisoodeItem