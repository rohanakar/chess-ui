import { Piece } from "./Piece";
import { Player } from "./Player";
import { Spot } from "./Spot";

export class Move{

    private player: Player = new Player;
    private initialSpot!: Spot;
    private finalSpot!: Spot;
    private pieceKilled!: Piece;
    private castlingMove: boolean = false;

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

    public getPieceKilled(): Piece {
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