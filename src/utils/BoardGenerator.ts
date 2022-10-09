import { Board } from "../model/Board";
import { King, Queen, Rook, Bishop, Pawn, Knight } from "../model/ChessPiece";
import { Piece } from "../model/Piece";
import { PieceType } from "../model/PieceType";
import { Spot } from "../model/Spot";

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
        row.push(new Spot(getPiece(PieceType.ROOK,type===1?true:false)));
        row.push(new Spot(getPiece(PieceType.KNIGHT,type===1?true:false)));
        row.push(new Spot(getPiece(PieceType.BISHOP,type===1?true:false)));
        row.push(new Spot(getPiece(PieceType.QUEEN,type===1?true:false)));
        row.push(new Spot(getPiece(PieceType.KING,type===1?true:false)));
        row.push(new Spot(getPiece(PieceType.BISHOP,type===1?true:false)));
        row.push(new Spot(getPiece(PieceType.KNIGHT,type===1?true:false)));
        row.push(new Spot(getPiece(PieceType.ROOK,type===1?true:false)));
        this.board.getSpots().push(row);

    }
    generateSecondRow(type: number) {
        const row:Spot[] = [];
        for(let i=0;i<8;i++){
            row.push(new Spot(getPiece(PieceType.PAWN,type===1?true:false)));
        }
        this.board.getSpots().push(row);
    }
    
    generateMiddleRows() {
        for(let r=2;r<=5;r++){
            const row:Spot[] = [];
            for(let i=0;i<8;i++){
                row.push(new Spot());
            }
            this.board.getSpots().push(row);
        }
    }
    
}

export default BoardGenerator;
