import { Board } from "../components/Board";
import { King, Queen, Rook, Bishop, Pawn, Knight } from "../model/ChessPiece";
import { Piece } from "../components/Piece";
import { PieceType } from "../model/PieceType";
import { Spot } from "../components/Spot";

const getPiece = (piece: PieceType, isWhite: boolean) => {
    switch (piece) {
        case PieceType.KING:
            return new King(isWhite);
        case PieceType.QUEEN:
            return new Queen(isWhite);
        case PieceType.ROOK:
            return new Rook(isWhite);
        case PieceType.BISHOP:
            return new Bishop(isWhite);
        case PieceType.PAWN:
            return new Pawn(isWhite);
        case PieceType.KNIGHT:
            return new Knight(isWhite);
    }
}

class BoardGenerator{

    /*
   
      00 10 20
    */


    private board : Board ;
    getBoard = () =>{
        return this.board;
    }
    constructor(){  
        this.board = new Board();
        this.board.setSpots([]);
        this.generateFirstRow(1);
        this.generateSecondRow(1);
        this.generateMiddleRows();
        this.generateSecondRow(-1);
        this.generateFirstRow(-1);
    }

    generateFirstRow(type: number) {

        const row:Spot[] = [];
        const r = type==1?0:7;
        let c = 0;
        row.push(new Spot(r,c++,getPiece(PieceType.ROOK,type===1?true:false)));
        row.push(new Spot(r,c++,getPiece(PieceType.KNIGHT,type===1?true:false)));
        row.push(new Spot(r,c++,getPiece(PieceType.BISHOP,type===1?true:false)));
        row.push(new Spot(r,c++,getPiece(PieceType.QUEEN,type===1?true:false)));
        row.push(new Spot(r,c++,getPiece(PieceType.KING,type===1?true:false)));
        row.push(new Spot(r,c++,getPiece(PieceType.BISHOP,type===1?true:false)));
        row.push(new Spot(r,c++,getPiece(PieceType.KNIGHT,type===1?true:false)));
        row.push(new Spot(r,c++,getPiece(PieceType.ROOK,type===1?true:false)));
        this.board.getSpots().push(row);

    }
    generateSecondRow(type: number) {
        const row:Spot[] = [];
        const r = type==1?1:6;
        for(let i=0;i<8;i++){
            row.push(new Spot(r,i,getPiece(PieceType.PAWN,type===1?true:false)));
        }
        this.board.getSpots().push(row);
    }
    
    generateMiddleRows() {
        for(let r=2;r<=5;r++){
            const row:Spot[] = [];
            for(let i=0;i<8;i++){
                row.push(new Spot(r,i));
            }
            this.board.getSpots().push(row);
        }
    }
    
}

export default BoardGenerator;
