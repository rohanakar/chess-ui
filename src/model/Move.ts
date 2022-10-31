import { Piece } from "../components/Piece";
import { Player } from "./Player";
import { Spot } from "../components/Spot";
import { PieceType } from "./PieceType";

export class Move {
    getPiece() {
        return this.piece;
    }


    private player: Player = new Player;
    private initialSpot!: Spot;
    private finalSpot!: Spot;
    private pieceKilled!: Piece | undefined;
    private castlingMove: boolean = false;
    private piece!: Piece;
    private kingSide = true;

    constructor(player: Player, initialSpot: Spot, finalSpot: Spot, pieceKilled: Piece | undefined, castlingMove: boolean, piece: Piece) {
        this.player = player;
        this.initialSpot = initialSpot;
        this.finalSpot = finalSpot;
        this.pieceKilled = pieceKilled;
        this.castlingMove = castlingMove;
        this.piece = piece;
    }

    public getString() {

        let prefix = "";
        
        if (this.piece.getPieceType() === PieceType.PAWN) {
            if (this.pieceKilled)
                prefix = String.fromCharCode(97 + this.initialSpot.getPosition().y) + "x";
            return prefix + annotate(this.finalSpot);
        }

        if (this.castlingMove) {
            return this.kingSide ? "O-O" : "O-O-O";
        }
        prefix = '' + PieceType[this.piece.getPieceType()].charAt(0).toLowerCase();

        if(this.piece.getPieceType() === PieceType.KNIGHT)
            prefix = 'n'
        if (this.pieceKilled)
            prefix+="x";
        return prefix + annotate(this.finalSpot);

    }

    public getPlayer(): Player {
        return this.player;
    }

    public setPlayer(player: Player): void {
        this.player = player;
    }

    public getInitialSpot(): Spot {
        return this.initialSpot;
    }

    public setInitialSpot(initialSpot: Spot): void {
        this.initialSpot = initialSpot;
    }

    public getFinalSpot(): Spot {
        return this.finalSpot;
    }

    public setFinalSpot(finalSpot: Spot): void {
        this.finalSpot = finalSpot;
    }

    public getPieceKilled(): Piece | undefined {
        return this.pieceKilled;
    }

    public setPieceKilled(pieceKilled: Piece): void {
        this.pieceKilled = pieceKilled;
    }

    public isCastlingMove(): boolean {
        return this.castlingMove;
    }

    public setCastlingMove(castlingMove: boolean): void {
        this.castlingMove = castlingMove;
    }


}

function annotate(Spot: Spot) {
    let X = Spot.getPosition().x + 1;
    let Y = Spot.getPosition().y;
    return String.fromCharCode(97 + Y) + "" + X;
}
