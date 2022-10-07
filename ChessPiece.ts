import { Piece } from "./Piece";
import { PieceType } from "./PieceType";

export class King extends Piece{

    private castlingDone: boolean;
    private spotIncrement :Array<Array<any>>;

    public canCastle(): boolean {
        return !this.castlingDone;
    }

    public castle(): void {
        this.castlingDone = true;
    }

    constructor(){
        super(PieceType.KING,9999);
        this.castlingDone = false;
        for(let i=-1;i<=1;i++){
            let array = [];
            for(let j=-1;j<=1;j++){
                if(i==0&&j==0)
                    continue;
                array.push([i,j]);
            }
            this.spotIncrement.push(array);
        }
    }

    public canMove: boolean;

}

export class Queen extends Piece{

    private beanIncrement : Array<Array<any>>;

    constructor(){
        super(PieceType.QUEEN,9);

        for(let i=-1;i<=1;i++){
            let array = [];
            for(let j=-1;j<=1;j++){
                if(i==0&&j==0)
                    continue;
                array.push([i,j]);
            }
            this.beanIncrement.push(array);
        }
    }
    public canMove: boolean;

}

export class Pawn extends Piece{

    SPOT_INCREMENTS_MOVE = [[0, 1]];
    SPOT_INCREMENTS_MOVE_FIRST = [[0,1],[0,2]]
    SPOT_INCREMENTS_TAKE = [[-1,1],[1,1]]


    constructor(){
        super(PieceType.PAWN,1);
    }
    public canMove: boolean;

}

export class Rook extends Piece{

    BEAN_INCREMENT = [[-1,0],[1,0],[0,-1],[0,1]]

    constructor(){
        super(PieceType.ROOK,5);
    }
    public canMove: boolean;

}

export class Bishop extends Piece{

    constructor(){
        super(PieceType.BISHOP,3);
    }
    public canMove: boolean;

}

export class Knight extends Piece{

    SPOT_INCREMENTS = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]]

    constructor(){
        super(PieceType.KNIGHT,3);
    }
    public canMove: boolean;

}
