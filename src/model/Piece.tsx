import { PieceType } from "./PieceType";
import { ReactComponent as KingSVG }from '../assets/king.svg'; 
import { ReactComponent as QueenSVG } from '../assets/queen.svg'; 
import { ReactComponent as RookSVG } from '../assets/rook.svg'; 
import { ReactComponent as BishopSVG } from '../assets/bishop.svg'; 
import { ReactComponent as KnightSVG } from '../assets/knight.svg'; 
import { ReactComponent as PawnSVG } from '../assets/pawn.svg'; 
import { useContext, useEffect, useRef, useState } from "react";
import { Spot } from "./Spot";
import { AppContext } from "../redux/AppProvider";
import { MouseContext } from "../redux/MouseFactory";
import { King } from "./ChessPiece";

export abstract class Piece {
    abstract canMove( curr: { i:  number; j:  number; },
                    next:{ i:  number; j:  number; },
                    board:Spot[][]):boolean

    private pieceType: PieceType;
    private value: number;
    private moved = false;
    private alive: boolean = true;
    private white: boolean = false;

    constructor(pieceType: PieceType, value: number, isWhite: boolean) {
        this.pieceType = pieceType;
        this.value = value;
        this.white = isWhite;
    }

    public getMoved = () => this.moved;

    public setMoved = (moved:boolean) => {
        this.moved=moved;
    }

    public getPieceType(): PieceType {
        return this.pieceType;
    }

    public getValue(): number {
        return this.value;
    }

    public isAlive(): boolean {
        return this.alive;
    }

    public setAlive(alive: boolean): void {
        this.alive = alive;
    }

    public isWhite(): boolean {
        return this.white;
    }

    public setWhite(white: boolean): void {
        this.white = white;
    }

    public render: any = (currIJ:any,active:any,updateActive:any) => {

        const [state,setState] = useContext(AppContext);

        const validateAndUpdateBoard = (current:any,mouse:{x:number,y:number},prev:any)=>{

                current.style.pointerEvents ='none';
                const curr = getSpot(mouse.x,mouse.y,prev.i+" "+prev.j);
                current.style.pointerEvents = '';
                let game = state.game;
                let prevPiece:Piece = game.getBoard().getSpots()[prev.i][prev.j].getPiece();
                if(!curr.i )
                    return;
                if(!this.canMove(prev,curr,game.getBoard().getSpots())){
                    if(this.pieceType === PieceType.KING){
                        let x:any = this;
                        if((x as King).canCastle(game.getBoard().getSpots(),prev,curr)){
                            let prevPiece:Piece = game.getBoard().getSpots()[prev.i][prev.j].getPiece();
                            let currPiece:Piece = game.getBoard().getSpots()[curr.i][(curr.j>prev.j&&this.isWhite())?7:0].getPiece();
                            game.getBoard().getSpots()[prev.i][(+curr.j)+((+curr.j)>prev.j?-1:1)].setPiece(currPiece);
                            game.getBoard().getSpots()[curr.i][curr.j].setPiece(prevPiece);


                            game.getBoard().getSpots()[prev.i][prev.j].setPiece(null);
                            game.getBoard().getSpots()[curr.i][(+curr.j)>prev.j?7:0].setPiece(null);

                            prevPiece.setMoved(true);
                            currPiece.setMoved(true);
                            setState({game})
                            return;
                        }
                    }
                }
                
                if(!this.canMove(prev,curr,game.getBoard().getSpots()))
                    return;
                game.getBoard().getSpots()[prev.i][prev.j].setPiece(null);
                game.getBoard().getSpots()[curr.i][curr.j].getPiece()?.setAlive(false);
                game.getBoard().getSpots()[curr.i][curr.j].setPiece(prevPiece);
                prevPiece.setMoved(true);
               
                setState({game})

        }

        return <div className={this.white?'white piece':'black piece'} >
           {GetImage(this.pieceType,validateAndUpdateBoard,active,updateActive,currIJ)}
        </div> ;
    };

}

const GetImage = (piece: PieceType,validateAndUpdateBoard:Function,active:any,updateActive:any,currentIJ:any) => {

    let Node = getImageFile(piece);
    const ref = useRef<SVGSVGElement>(null);

    const [mouse,setMouse] = useContext(MouseContext);
    let isinMotion = active.i===currentIJ.i&&active.j===currentIJ.j;
    const {i,j} = currentIJ;
    // console.log(active.initial)
    const style = isinMotion ?{top:mouse.y-active.initial.y,left:mouse.x-active.initial.x,zIndex:1}:{};

    return <Node 
                style={style}
                ref={ref}
                onMouseDown={(e)=>{
                    if(active.i!==-1)
                        return;
                    
                    console.log({active,currentIJ});
                    let x=e.clientX;
                    let y=e.clientY;
                    
                    if(ref.current!=null){
                        let box = ref.current.getBoundingClientRect();
                        x-=box.left;
                        y-=box.top;
                    }
                    let node = ref.current?.parentElement?.parentElement;
                    updateActive(i,j,{x,y});
                }}    
                onMouseUp={(e)=>{
                    console.error(`removing ${JSON.stringify(active)}`);
                    validateAndUpdateBoard(ref.current,mouse,active);
                    updateActive(-1,-1,{x:0,y:0});

                }}  
                
                
            />
}

const getImageFile = (piece: PieceType) => {
    switch (piece) {
        case PieceType.KING:
            return KingSVG;
        case PieceType.QUEEN:
            return QueenSVG;
        case PieceType.ROOK:
            return RookSVG;
        case PieceType.BISHOP:
            return BishopSVG;
        case PieceType.PAWN:
            return PawnSVG;
       default:
            return KnightSVG;
    }
}

function getSpot(x: number, y: number,currentIndice:string):{i:number,j: number}{
    
    let stack = [];
    let elementMouseIsOver:any = document.elementFromPoint(x, y)!;
    
    stack.push(elementMouseIsOver);

    while (elementMouseIsOver.tagName !== 'HTML'){

        elementMouseIsOver.style.pointerEvents = 'none';
        elementMouseIsOver = document.elementFromPoint(x, y);

        stack.push(elementMouseIsOver);
    }

/* Now clean it up */
var i  = 0,
    il = stack.length;

    let node = stack[0];
for (; i < il; i += 1) {
    stack[i].style.pointerEvents = '';
    if(stack[i].classList.contains("cell") && !stack[i].classList.value.includes(currentIndice))
        node = stack[i];
}
    return getIndice(node);
}

function getIndice(node: Element|null|undefined ):{i: any,j: any}{
    let classList:any  = node?.classList.value.split(" ");
    return {i:classList[2],j:classList[3]};
}
