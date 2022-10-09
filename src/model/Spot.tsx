import { Piece } from "./Piece";
import { Player } from "./Player";

export class Spot{
    render(colNum: number) {
        let r = Math.floor(colNum/8);
        let c = colNum%8;
        let cName = "even";
        if(r%2==0)
            cName = (c%2===0)?"even":"odd";
        else
            cName = (c%2===1)?"even":"odd";

        
        console.log("endering spot %d %d",r,c);

        return (
            <div className={`${cName} cell`} key={colNum} >
                {this.getPiece()?.render()}
            </div>
        )
    }

    private piece:Piece | undefined ;

    constructor(piece?:Piece){
        if(piece)
            this.piece = piece;
    }

    public getPiece(): Piece| undefined {
        return this.piece;
    }

    public setPiece(piece:Piece): void{
        this.piece = piece;
    }

}