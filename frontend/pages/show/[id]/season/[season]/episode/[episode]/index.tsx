import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ApiHelper from '../../../../../../../helpers/ApiHelper';
import Link from 'next/link';
import EpisodeHero from '../EpisodeHero';

const Episode = ({ show, setShow, seasons, setSeasons }: any) => {
    const router = useRouter();
    const { id, season, episode } = router.query;
    const [episodeInfo, setEpisodeInfo] = useState<any>(null);
    const [ watches, setWatches ] = useState(0);
    const [ watched, setWatched ] = useState(false);

    // Get show
    useEffect(() => {
        if (id) {
            ApiHelper.get(`shows/${id}`, (show: any) => {
                if (show.data.length) {
                    setSeasons(show.data[0].seasons.data);
                    setShow(show.data[0].show);
                }
            });
        }

        if (season && episode) {
            ApiHelper.get(`shows/${id}/${season}/${episode}`, (episode: any) => {                
                setEpisodeInfo(episode.data);
                setWatches(episode.data.watches);
            });
        }
    }, [id, season, episode]);

    const handleWatch = () => {
        if (!watched) {
            ApiHelper.post(`history/watch/${ episodeInfo.ids.imdb }/show`, { showTraktId: id }, (res : any) => {
                setWatches(watches + 1);
                setWatched(true);
            });
        }
    }

    const handleUnWatch = () => {
        ApiHelper.post(`history/unwatch/${ episodeInfo.ids.imdb }`, {}, (res : any) => {
            if (watches) setWatches(watches - 1);
            console.log(res);
        });
    }

    return <div id="episode-single-wrap">
        {show && season &&
            <>
                {episodeInfo &&
                    <>
                        <EpisodeHero episodeInfo={episodeInfo} />

                        <div className="container">
                            <div id="show-single-hero-textuals">
                                <div id="show-single-hero-title">{season && season}x{episode && episode} {episodeInfo && episodeInfo.title}</div>
                            </div>

                            <div id="floating-show-sidebar">
                                <div id="show-poster">
                                    <img src={show?.images?.tvposter[0]?.url} alt="" />
                                </div>
                            </div>

                            <div id="show-content-wrap">
                                <div id="episode-btns">
                                    <div id="watch-btn-wrap">
                                       <div id="add-watch-btn" onClick={ handleWatch } className={ `${ watched ? 'disabled' : '' }` }>Add to history</div> 

                                        <span id="add-watch-text">You watched this episode <Link href={ `/show/${id}/season/${season}/episode/${episode}/history` }><a href={ `history/` }>{ watches } times</a></Link></span>
                                    </div>
                                </div>

                                <h4 id="episodes-navigation-title">Episodes:</h4>
                                <div id="episode-navigation">
                                    {[...Array(seasons[parseInt(String(season)) - 1].episodes.length)].map((_, index) => (
                                        <Link href={`/show/${id}/season/${season}/episode/${index + 1}/`} scroll={false}><a href={`/show/${id}/season/${season}/episode/${index + 1}/`}><span className={`episode-navigation-item ${(index + 1 == parseInt(String(episode))) ? 'active' : ''}`}>{index + 1}</span></a></Link>
                                    ))}
                                </div>

                                <h6 className="show-content-title">Overview:</h6>
                                <p>
                                    {episodeInfo.overview}
                                </p>
                            </div>
                        </div>
                    </>
                }
            </>
        }
    </div>;
}

export default Episode;
