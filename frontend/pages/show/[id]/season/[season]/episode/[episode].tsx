import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ApiHelper from '../../../../../../helpers/ApiHelper';
import Link from 'next/link';
import EpisodeHero from './EpisodeHero';

const Episode = ({ show, setShow, seasons, setSeasons }: any) => {
    const router = useRouter();
    const { id, season, episode } = router.query;
    const [episodeInfo, setEpisodeInfo] = useState<any>(null);

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
            });
        }
    }, [id, season, episode]);

    const handleWatch = () => {
        ApiHelper.post(`history/watch/${ show.ids.imdb }`, {}, (res : any) => {
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
                                    <div id="add-watch-btn" onClick={ handleWatch }>Add to history</div>
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