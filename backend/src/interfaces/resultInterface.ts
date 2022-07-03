import { IdsInterface } from "./idsInterface";

export interface resultInterface {
    type: string;
    score: number;
    movie?: {
        title: string;
        year: string;
        ids: IdsInterface
    };
    show?: {
        title: string;
        year: string;
        ids: IdsInterface
    }
}