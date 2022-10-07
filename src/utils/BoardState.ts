import { WHITE_BOARD_PIECE, BLACK_BOARD_PIECE } from "../enums/BoardMetaData";

class BoardState{

    private board : Array<Array<WHITE_BOARD_PIECE|BLACK_BOARD_PIECE>> = [];
    getBoard = () =>{
        return this.board;
    }
    constructor(){  
        this.generateFirstRow(1);
        this.generateSecondRow(1);
        this.generateMiddleRows();
        this.generateSecondRow(-1);
        this.generateFirstRow(-1);
    }

    generateFirstRow(type: number) {

        const row:Array<WHITE_BOARD_PIECE|BLACK_BOARD_PIECE> = [];
        row.push(type==1?WHITE_BOARD_PIECE.ROOK:BLACK_BOARD_PIECE.ROOK);
        row.push(type==1?WHITE_BOARD_PIECE.KNIGHT:BLACK_BOARD_PIECE.KNIGHT);
        row.push(type==1?WHITE_BOARD_PIECE.BISHOP:BLACK_BOARD_PIECE.BISHOP);
        row.push(type==1?WHITE_BOARD_PIECE.QUEEN:BLACK_BOARD_PIECE.QUEEN);
        row.push(type==1?WHITE_BOARD_PIECE.KING:BLACK_BOARD_PIECE.KING);
        row.push(type==1?WHITE_BOARD_PIECE.BISHOP:BLACK_BOARD_PIECE.BISHOP);
        row.push(type==1?WHITE_BOARD_PIECE.KNIGHT:BLACK_BOARD_PIECE.KNIGHT);
        row.push(type==1?WHITE_BOARD_PIECE.ROOK:BLACK_BOARD_PIECE.ROOK);
        this.board.push(row);

    }
    generateSecondRow(type: number) {
        const row:Array<WHITE_BOARD_PIECE|BLACK_BOARD_PIECE> = [];
        for(let i=0;i<8;i++){
            row.push(type==1 ? WHITE_BOARD_PIECE.PAWN: BLACK_BOARD_PIECE.PAWN);
        }
        this.board.push(row);
    }
    
    generateMiddleRows() {
        for(let r=2;r<=5;r++){
            const row:Array<WHITE_BOARD_PIECE|BLACK_BOARD_PIECE> = [];
            for(let i=0;i<8;i++){
                row.push(WHITE_BOARD_PIECE.EMPTY);
            }
            this.board.push(row);
        }
    }
    
}

export default BoardState;
