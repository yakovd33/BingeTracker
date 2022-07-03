import { IdsInterface } from "./idsInterface";

export interface MovieInterface {
    title: string;
    year: string;
    poster: string;
    traktId: number;
    imdbId: number;
    ids?: IdsInterface;
}