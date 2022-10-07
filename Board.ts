import { Spot } from "./Spot";

export class Board{

    private spots : Spot[][];


    public getSpots(): Spot[][] {
        return this.spots;
    }

    public setSpots(spots: Spot[][]): void {
        this.spots = spots;
    }
}