import { useContext, useState } from "react";
import { King } from "../model/ChessPiece";
import { PieceType } from "../model/PieceType";
import { AppContext } from "../redux/AppProvider";
import { Position } from "../types/Position";
import { Board } from "./Board";
import { Piece } from "./Piece";

export class Spot{

    position:Position ;
    updatePiece?:Function;

    getPosition = ():Position => {
        return this.position;
    }


    render = ()=> {
        
        const [state,updateState] = useContext(AppContext);
        const game = state.game;

        let {x:row,y:col} = this.position;
        
        let cName = "even";
        if(row%2==0)
            cName = (col%2===0)?"even":"odd";
        else
            cName = (col%2===1)?"even":"odd";

        
        const Child = ()=>{
            return this.piece?.render(this.getPosition());
        }
        return (
            <div className={`${cName} cell ${row} ${col}`} key={row*8+col} 
                onDrop={(e)=>{
                        e.preventDefault();
                        var initial = JSON.parse (e.dataTransfer.getData("initial")) as Position;
                        
                        let initialPiece :Piece= game.getBoard().getSpots()[initial.x][initial.y].getPiece();
                        
                let prev = initial;
                let curr = this.getPosition(); 
                if(prev.x==curr.x && prev.y == curr.y)
                    return;       
                if(!initialPiece.canMove(prev,curr,game.getBoard().getSpots())){
                    if(initialPiece.getPieceType() === PieceType.KING){
                        let x:any = initialPiece;
                        if((x as King).canCastle(game.getBoard().getSpots(),prev,curr)){
                            let prevPiece:Piece = game.getBoard().getSpots()[prev.x][prev.y].getPiece();
                            let currPiece:Piece = game.getBoard().getSpots()[curr.x][(curr.y>prev.y&&initialPiece.isWhite())?7:0].getPiece();
                            game.getBoard().getSpots()[prev.x][(+curr.y)+((+curr.y)>prev.y?-1:1)].setPiece(currPiece);
                            game.getBoard().getSpots()[curr.x][curr.y].setPiece(prevPiece);


                            game.getBoard().getSpots()[prev.x][prev.y].setPiece(null);
                            game.getBoard().getSpots()[curr.x][(+curr.y)>prev.y?7:0].setPiece(null);

                            prevPiece.setMoved(true);
                            currPiece.setMoved(true);
                            updateState({game},""+PieceType[initialPiece.getPieceType()]+" - "+String.fromCharCode(65+this.position.y)+""+(this.position.x+1));
                            return;
                        }
                    }
                }
                
                if(!initialPiece.canMove(prev,curr,game.getBoard().getSpots()))
                    return;
                        
                        
                        
                        game.getBoard().getSpots()[initial.x][initial.y].setPiece(undefined);
                        game.getBoard().getSpots()[this.position.x][this.position.y].setPiece(initialPiece);
                        initialPiece.setMoved(true);
                        updateState({game},""+PieceType[initialPiece.getPieceType()]+" - "+String.fromCharCode(65+this.position.y)+""+(this.position.x+1));

                    }} 
                onDragOver={(e)=>{
                    e.dataTransfer.dropEffect = "move";
                    e.preventDefault();
                }}
                
                onDragLeave={(e)=>{
                    e.preventDefault();
                }}
                >
            <Child />
            </div>
        )
    }

    private piece?:Piece ;

    constructor(x:number,y:number,piece?:Piece){
        this.position = {x,y};
        if(piece){
            this.piece = piece;
            this.piece.setPosition(this.position);
        }
    }

    public getPiece(): Piece| undefined {
        return this.piece;
    }

    public setPiece(piece?:Piece): void{
        this.piece = piece;
        this.piece?.setPosition(this.position);
    }

}