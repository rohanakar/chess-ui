import { useState } from "react";
import MouseProvider from "../redux/MouseFactory";
import { Piece } from "./Piece";

export class Spot{

    _self = this;
    getIJ(): any {
        return {i:this.i,j:this.j};
    }

    i:number=-1;
    j:number=-1;

    render(_STATE:any) {
        let r = this.i;
        let c = this.j;
        let cName = "even";
        if(r%2==0)
            cName = (c%2===0)?"even":"odd";
        else
            cName = (c%2===1)?"even":"odd";

        
        // console.log("rendering spot %d %d",r,c);
        const Child = ()=>{

            const [active,setActive] = _STATE;
            return this.getPiece()?.render(this.getIJ(),active,(i:any,j:any,k:any)=>{setActive({i,j,initial:k})});
        }
        return (
            <div className={`${cName} cell ${r} ${c}`} key={r*8+c} >
                <MouseProvider><Child /></MouseProvider>
            </div>
        )
    }

    private piece:Piece | undefined ;

    constructor(r:number,c:number,piece?:Piece){
        this.i = r;
        this.j = c;
        if(piece){
            this.piece = piece;
        }
    }

    public getPiece(): Piece| undefined {
        return this.piece;
    }

    public setPiece(piece?:Piece): void{
        this.piece = piece;
    }

}