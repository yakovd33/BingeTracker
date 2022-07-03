import { IdsInterface } from "../global/interfaces";

export interface SeasonInterface {
	number: number;
	ids: IdsInterface,
	episodes: [{
		season: number;
		number: number;
		title: number;
		ids: IdsInterface;
	}]
}