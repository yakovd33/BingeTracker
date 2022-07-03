import trakt from '../trakt';
import { getPosterFromTmdb, getFanartPics } from '@shared/functions';

export async function getShowByImdbId(showId: string, withSeasons = false, withImages = false) {
    let show = await trakt.search.id({
        id_type: 'trakt',
        id: showId,
    });

    if (withSeasons) {        
        // Get seasons
        show.data[0].seasons = await trakt.seasons.summary({ id: showId, extended: 'episodes' });
    }

    if (withImages) {
        show.data[0].show['images'] = await getFanartPics(show.data[0].show.ids.tvdb);
    }    

    return show
}

export async function getEpisodeByImdbId(episodeId: string) {
    let episode = await trakt.search.id({
        id_type: 'imdb',
        id: episodeId,
        type: 'episode',
        extended: 'full'
    });

    let images = await getFanartPics(episode?.data?.episode?.ids?.tvdb);
    if (images) {
        episode.data.episode.images = images;
    }    

    return episode.data
}