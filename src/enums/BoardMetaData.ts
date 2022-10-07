export enum WHITE_BOARD_PIECE{
    PAWN = 1,
    BISHOP = 2 ,
    KNIGHT = 3,
    ROOK = 4,
    QUEEN = 5,
    KING = 6,
    EMPTY = 0
}

export enum BLACK_BOARD_PIECE{
    PAWN = -1,
    BISHOP = -2 ,
    KNIGHT = -3,
    ROOK = -4,
    QUEEN = -5,
    KING = -6,
    EMPTY = 0
}


const valueMap : {[key in keyof (typeof WHITE_BOARD_PIECE|typeof BLACK_BOARD_PIECE)]: number} = {
    PAWN:1,
    BISHOP:3,
    KNIGHT:3,
    ROOK:5,
    QUEEN:9,
    KING:99999,
    EMPTY:0
}

export const BoardPieceValue = (boardPiece:WHITE_BOARD_PIECE|BLACK_BOARD_PIECE):number =>{
    return valueMap[boardPiece];
}