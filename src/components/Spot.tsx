import _ from "lodash";
import { useContext, useState } from "react";
import { King } from "../model/ChessPiece";
import { Move } from "../model/Move";
import { PieceType } from "../model/PieceType";
import { AppContext } from "../redux/AppProvider";
import { Position } from "../types/Position";
import { Board } from "./Board";
import { Game } from "./Game";
import { Piece } from "./Piece";

export class Spot{

    private position:Position ;
    private piece?:Piece ;

    getPosition = ():Position => {
        return this.position;
    }


    render = ()=> {
        
        const [state,updateGame] = useContext(AppContext);
        const game:Game = state.curr;

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
                        
                        let initialPiece :Piece= game.getBoard().getSpots()[initial.x][initial.y].getPiece() as Piece;
                        
                let prev = initial;
                let curr = this.getPosition(); 
                if(prev.x==curr.x && prev.y == curr.y)
                    return;       

                if(initialPiece.isWhite() && game.getCurrentTurn() !==0) 
                    return ;    
                
                if(!initialPiece.isWhite() && game.getCurrentTurn()!==1)
                    return ;    

                if(!initialPiece.canMove(prev,curr,game.getBoard().getSpots())){
                    if(initialPiece.getPieceType() === PieceType.KING){
                        let x:any = initialPiece;
                        if((x as King).canCastle(game.getBoard().getSpots(),prev,curr)){
                            let prevPiece:Piece = game.getBoard().getSpots()[prev.x][prev.y].getPiece() as Piece;
                            let currPiece:Piece|undefined = game.getBoard().getSpots()[curr.x][(curr.y>prev.y&&initialPiece.isWhite())?7:0].getPiece();
                            game.getBoard().getSpots()[prev.x][(+curr.y)+((+curr.y)>prev.y?-1:1)].setPiece(currPiece);
                            game.getBoard().getSpots()[curr.x][curr.y].setPiece(prevPiece);


                            game.getBoard().getSpots()[prev.x][prev.y].setPiece(undefined);
                            game.getBoard().getSpots()[curr.x][(+curr.y)>prev.y?7:0].setPiece(undefined);

                            prevPiece.setMoved(true);
                            currPiece?.setMoved(true);
                            game.getMovesPlayed().push(new Move(
                                game.getPlayers()[game.getCurrentTurn()],
                                game.getBoard().getSpots()[initial.x][initial.y],
                                this,
                                undefined,
                                true,
                                prevPiece
                            ));
                            game.setCurrentTurn((game.getCurrentTurn()+1)%2);

                            updateGame(game);
                            return;
                        }
                    }
                }
                
                if(!initialPiece.canMove(prev,curr,game.getBoard().getSpots()))
                    return;
                        
                        game.getBoard().getSpots()[initial.x][initial.y].setPiece(undefined);
                        initialPiece.setMoved(true);
                        game.setMovesPlayed([...game.getMovesPlayed()]);
                        game.getMovesPlayed().push(new Move(
                            game.getPlayers()[game.getCurrentTurn()],
                            game.getBoard().getSpots()[initial.x][initial.y],
                            this,
                            game.getBoard().getSpots()[this.position.x][this.position.y].getPiece(),
                            false,
                            initialPiece
                        ));
                        game.getBoard().getSpots()[this.position.x][this.position.y].setPiece(initialPiece);

                        game.setCurrentTurn((game.getCurrentTurn()+1)%2);

                        updateGame(game);

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