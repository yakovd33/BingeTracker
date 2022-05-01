export interface resultInterface {
    type: string;
    score: number;
    movie?: {
        title: string;
        year: string;
        ids: {
            trakt: number;
            slug: string;
            imdb: string;
            tmdb: number;
        }
    };
    show?: {
        title: string;
        year: string;
        ids: {
            trakt: number;
            slug: string;
            imdb: string;
            tmdb: number;
            tvdb: number;
            tvrage: number;
        }
    }
}