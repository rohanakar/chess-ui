import { Piece } from "./Piece";
import { Player } from "./Player";

export class Spot{
    private piece:Piece;
    private player:Player;

    public getPiece(): Piece {
        return this.piece;
    }

    public setPiece(piece: Piece): void {
        this.piece = piece;
    }

    public getPlayer(): Player {
        return this.player;
    }

    public setPlayer(player: Player): void {
        this.player = player;
    }

}