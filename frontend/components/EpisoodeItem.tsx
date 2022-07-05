import Link from 'next/link';
import React from 'react'
import { useTmdb } from '../utils/useTmdb';

const EpisoodeItem = ({ episodeItem, showId }: any) => {
    const [ poster, additionalData ] = useTmdb(episodeItem.ids.imdb, 'episode');
    const episodeLink = `/show/${ showId }/season/${ episodeItem.season }/episode/${ episodeItem.number }/`;

    return (
        <Link href={{ pathname: episodeLink, query: { poster: poster, title: episodeItem.title, overview: additionalData?.overview }}}
          as={episodeLink}>
            <a className="episode-link" href={ `/show/${ showId }/season/${ episodeItem.season }/episode/${ episodeItem.number }/` }>
                <div className="episode-item">
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