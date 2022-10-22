import BoardGenerator from "../utils/BoardGenerator";
import { Board } from "./Board";
import { GameState } from "../model/GameState";
import { Move } from "../model/Move";
import { Player } from "../model/Player";

export class Game{

    renderBoard = () => {
        return <div className="board">{this.board.render()}</div>;
    }

    private board: Board = new Board;
    private players: Player[] = [];
    private gameState: GameState = 0;
    private movesPlayed: Move[] = [];
    private currentTurn: number = 0;

    constructor(){
        this.board = new BoardGenerator().getBoard();
    }

    public getBoard(): Board {
        return this.board;
    }

    public setBoard(board: Board): void {
        this.board = board;
    }

    public getPlayers(): Player[] {
        return this.players;
    }

    public setPlayers(players: Player[]): void {
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

    public isCurrentTurn(): number {
        return this.currentTurn;
    }

    public setCurrentTurn(currentTurn: number): void {
        this.currentTurn = currentTurn;
    }

    
}