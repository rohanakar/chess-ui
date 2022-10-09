import BoardGenerator from "../utils/BoardGenerator";
import { Board } from "./Board";
import { GameState } from "./GameState";
import { Move } from "./Move";
import { Player } from "./Player";

export class Game{

    private board: Board = new Board;
    private players: Player[][] = [];
    private gameState: GameState = 0;
    private movesPlayed: Move[] = [];
    private currentTurn: boolean = false;

    constructor(){
        this.board = new BoardGenerator().getBoard();
    }

    public getBoard(): Board {
        return this.board;
    }

    public setBoard(board: Board): void {
        this.board = board;
    }

    public getPlayers(): Player[][] {
        return this.players;
    }

    public setPlayers(players: Player[][]): void {
        this.players = players;
    }

    public getGameState(): GameState {
        return this.gameState;
    }

    public setGameState(gameState: GameState): void {
        this.gameState = gameState;
    }

    public getMovesPlayed(): Move[] {
        return this.movesPlayed;
    }

    public setMovesPlayed(movesPlayed: Move[]): void {
        this.movesPlayed = movesPlayed;
    }

    public isCurrentTurn(): boolean {
        return this.currentTurn;
    }

    public setCurrentTurn(currentTurn: boolean): void {
        this.currentTurn = currentTurn;
    }

    
}