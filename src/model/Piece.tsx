import { Bishop, King, Knight, Pawn, Queen, Rook } from "./ChessPiece";
import { PieceType } from "./PieceType";
import { ReactComponent as KingSVG }from '../assets/king.svg'; 
import { ReactComponent as QueenSVG } from '../assets/queen.svg'; 
import { ReactComponent as RookSVG } from '../assets/rook.svg'; 
import { ReactComponent as BishopSVG } from '../assets/bishop.svg'; 
import { ReactComponent as KnightSVG } from '../assets/knight.svg'; 
import { ReactComponent as PawnSVG } from '../assets/pawn.svg'; 
import { FunctionComponent, SVGProps, useCallback, useEffect, useRef, useState } from "react";
import React from "react";


export abstract class Piece {

    private pieceType: PieceType;
    private value: number;
    private alive: boolean = true;
    private white: boolean = false;

    constructor(pieceType: PieceType, value: number, isWhite: boolean) {
        this.pieceType = pieceType;
        this.value = value;
        this.white = isWhite;
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

    public abstract canMove: boolean;

    public render: any = () => {

        console.log("rendering piece");

        return <div className={this.white?'white piece':'black piece'} >
           {getImage(this.pieceType)}
        </div> ;
    };

}

const getImage = (piece: PieceType) => {
    let Node = getImageFile(piece);
    return <Node/>
}

const getImageFile = (piece: PieceType) => {
    switch (piece) {
        case PieceType.KING:
            return KingSVG;
        case PieceType.QUEEN:
            return QueenSVG;
        case PieceType.ROOK:
            return RookSVG;
        case PieceType.BISHOP:
            return BishopSVG;
        case PieceType.PAWN:
            return PawnSVG;
       default:
            return KnightSVG;
    }
}