import { Piece } from "./Piece";
import { PieceType } from "./PieceType";

export class King extends Piece{

    private castlingDone: boolean;
    private spotIncrement: Array<Array<any>> = [];

    public canCastle(): boolean {
        return !this.castlingDone;
    }

    public castle(): void {
        this.castlingDone = true;
    }

    constructor(isWhite: boolean){
        super(PieceType.KING,9999,isWhite);
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

    public canMove: boolean = false;

}

export class Queen extends Piece{

    private beanIncrement: Array<Array<any>> = [];

    constructor(isWhite:boolean){
        super(PieceType.QUEEN,9,isWhite);

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
    public canMove: boolean = false;

}

export class Pawn extends Piece{

    SPOT_INCREMENTS_MOVE = [[0, 1]];
    SPOT_INCREMENTS_MOVE_FIRST = [[0,1],[0,2]]
    SPOT_INCREMENTS_TAKE = [[-1,1],[1,1]]


    constructor(isWhite: boolean){
        super(PieceType.PAWN,1,isWhite);
    }
    public canMove: boolean = false;

}

export class Rook extends Piece{

    BEAN_INCREMENT = [[-1,0],[1,0],[0,-1],[0,1]]

    constructor(isWhite: boolean){
        super(PieceType.ROOK,5,isWhite);
    }
    public canMove: boolean = false;

}

export class Bishop extends Piece{

    constructor(isWhite: boolean){
        super(PieceType.BISHOP,3,isWhite);
    }
    public canMove: boolean = false;

}

export class Knight extends Piece{

    SPOT_INCREMENTS = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]]

    constructor(isWhite: boolean){
        super(PieceType.KNIGHT,3,isWhite);
    }
    public canMove: boolean = false;

}
