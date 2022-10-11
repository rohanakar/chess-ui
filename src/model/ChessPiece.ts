import { Piece } from "./Piece";
import { PieceType } from "./PieceType";
import { Spot } from "./Spot";

export class King extends Piece{
   
    private spotIncrement: Array<Array<any>> = [];

    public canCastle(board:Spot[][],curr:{i:number,j:number},next:{i:number,j:number}): boolean {
        if(Math.abs(next.j-curr.j)!==2)
            return false;
        
        if(board[curr.i][curr.j].getPiece()?.getMoved())
            return false;
        
        let unableToCastleLeft = !board[curr.i][0].getPiece() || board[curr.i][0].getPiece()?.getMoved();
        let unableToCastleRight = !board[curr.i][7].getPiece() || board[curr.i][7].getPiece()?.getMoved();
        if(!board[curr.i][0].getPiece()?.getMoved()){
            for(let j of [1,2,3])
                if( board[curr.i][j].getPiece())
                    unableToCastleLeft = true;
        }

        if(!board[curr.i][7].getPiece()?.getMoved()){
            for(let j of [5,6])
                if( board[curr.i][j].getPiece())
                    unableToCastleRight = true;
        }
           
        return !unableToCastleLeft || !unableToCastleRight;
    }

    constructor(isWhite: boolean){
        super(PieceType.KING,9999,isWhite);
        for(let i=-1;i<=1;i++){
            for(let j=-1;j<=1;j++){
                if(i==0&&j==0)
                    continue;
                this.spotIncrement.push([i,j]);
            }
        }
    }

    canMove = (curr: { i: number; j: number; },
        next: { i: number; j: number; },
         board: Spot[][]) => {

        let pieceNext = board[next.i][next.j].getPiece();
        if(pieceNext && pieceNext.isWhite() === this.isWhite())
           return false;
        return contains(this.spotIncrement,next.i-curr.i,next.j-curr.j)
   }


}

export class Queen extends Piece{

    private beanIncrement: Array<Array<any>> = [];

    constructor(isWhite:boolean){
        super(PieceType.QUEEN,9,isWhite);

        for(let i=-1;i<=1;i++){
            for(let j=-1;j<=1;j++){
                if(i==0&&j==0)
                    continue;
                this.beanIncrement.push([i,j]);
            }
        }
    }

    canMove = (curr: { i: number; j: number; },
        next: { i: number; j: number; },
         board: Spot[][]) => {

        let pieceNext = board[next.i][next.j].getPiece();
        if(pieceNext && pieceNext.isWhite() === this.isWhite())
           return false;
        return containsBean(this.beanIncrement,curr,next,board);
    }

}

export class Pawn extends Piece{
    

    SPOT_INCREMENTS_MOVE = [[0, 1]];
    SPOT_INCREMENTS_MOVE_FIRST = [[0,1],[0,2]]
    SPOT_INCREMENTS_TAKE = [[-1,1],[1,1]]


    constructor(isWhite: boolean){
        super(PieceType.PAWN,1,isWhite);
    }
   
    canMove = (curr: { i: number; j: number; },
        next: { i: number; j: number; },
         board: Spot[][]) => {

        let pieceNext = board[next.i][next.j].getPiece();
        if(pieceNext && pieceNext.isWhite() === this.isWhite())
           return false;
        
        let op = false; 
        let delI = next.i-curr.i;
        let delJ = next.j-curr.j;
        if(!this.isWhite()){
            delI*=-1;
            delJ*=-1;
        }
        if(!pieceNext)
            op ||= contains(this.SPOT_INCREMENTS_MOVE,delI,delJ);

        if(!pieceNext && !this.getMoved())
            op ||= contains(this.SPOT_INCREMENTS_MOVE_FIRST,delI,delJ);

        if(pieceNext)
             op||=contains(this.SPOT_INCREMENTS_TAKE,delI,delJ);
        return op;    
    }
}

export class Rook extends Piece{
  
    BEAN_INCREMENT = [[-1,0],[1,0],[0,-1],[0,1]]

    constructor(isWhite: boolean){
        super(PieceType.ROOK,5,isWhite);
    }
   
    canMove = (curr: { i: number; j: number; },
        next: { i: number; j: number; },
         board: Spot[][]) => {

        let pieceNext = board[next.i][next.j].getPiece();
        if(pieceNext && pieceNext.isWhite() === this.isWhite())
           return false;
        return containsBean(this.BEAN_INCREMENT,curr,next,board);
    }

}

export class Bishop extends Piece{

    BEAN_INCREMENT = [[-1,1],[1,1],[-1,-1],[1,-1]]

    constructor(isWhite: boolean){
        super(PieceType.BISHOP,3,isWhite);
    }

    canMove = (curr: { i: number; j: number; },
        next: { i: number; j: number; },
         board: Spot[][]) => {

        let pieceNext = board[next.i][next.j].getPiece();
        if(pieceNext && pieceNext.isWhite() === this.isWhite())
           return false;
        return containsBean(this.BEAN_INCREMENT,curr,next,board);
    }
   

}

export class Knight extends Piece{


    SPOT_INCREMENTS = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]]

    constructor(isWhite: boolean){
        super(PieceType.KNIGHT,3,isWhite);
    }

    canMove = (curr: { i: number; j: number; },
        next: { i: number; j: number; },
         board: Spot[][]) => {

        let pieceNext = board[next.i][next.j].getPiece();
        if(pieceNext && pieceNext.isWhite() === this.isWhite())
           return false;
        return contains(this.SPOT_INCREMENTS,next.i-curr.i,next.j-curr.j)
   }
   

}
function contains(moves: number[][], y: number, x: number) {

    return moves.some(e=>e.toString()===[x,y].toString());
}   

function containsBean(moves: number[][], curr: { j: number; i: number; },next: { j: number; i: number; },board:Spot[][]) {

    const delX = next.i-curr.i;
    const delY = next.j-curr.j

    let x = delX==0?0:delX>0?1:-1;
    let y = delY==0?0:delY>0?1:-1;

    if(delX!=0 && delY!=0){
        x=delX/Math.min(Math.abs(delX),Math.abs(delY))
        y=delY/Math.min(Math.abs(delX),Math.abs(delY))
    }
    
    for(let move of moves){
        if(move[0] == x && move[1] == y){
            for(let i=curr.i+move[0],j=curr.j+move[1];i>=0&&i<8&&j>=0&&j<8 ; i+=move[0],j+=move[1]){
                if(i==next.i&&j==next.j)
                    break;
                if(board[i][j].getPiece())
                    return false;
            }
            return true;
        }
    }
    return false;
}   



