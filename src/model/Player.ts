import { Game } from "./Game";

export class Player{
    
    private name!: string;
    private rating!: number;
    private matches!: Game[];

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getRating(): number {
        return this.rating;
    }

    public setRating(rating: number): void {
        this.rating = rating;
    }

    public getMatches(): Array<Game> {
        return this.matches;
    }

    public setMatches(matches: Array<Game>): void {
        this.matches = matches;
    }
}