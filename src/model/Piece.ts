import { PieceType } from "./PieceType";

export abstract class Piece{

    private pieceType: PieceType;
    private value: number;
    private alive: boolean;
    private white: boolean;

    constructor(pieceType:PieceType,value:number){
        this.pieceType = pieceType;
        this.value = value;
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

    public abstract canMove:boolean;

    

}