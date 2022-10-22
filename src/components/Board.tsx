import { Spot } from "./Spot";
import { render2DList } from "../utils/helper";

export class Board{

    private spots: Spot[][] = [];


    public getSpots(): Spot[][] {
        return this.spots;
    }

    public setSpots(spots: Spot[][]): void {
        this.spots = spots;
    }
 

    render = () => {

       return render2DList(this.getSpots());

    }
    
    
}