import { IdsInterface } from "./idsInterface";

export interface EpisodeInterface {
    season: number;
    number: number;
    title: string;
    ids: IdsInterface;
    type: string;
    poster: string;
}