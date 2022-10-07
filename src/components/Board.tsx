import { render } from "@testing-library/react";
import { useEffect, useState } from "react";
import { BLACK_BOARD_PIECE, WHITE_BOARD_PIECE } from "../enums/BoardMetaData";
import BoardState from "../utils/BoardState";
import { render2DList } from "../utils/helper";

const renderPiece = (boardPiece: WHITE_BOARD_PIECE | BLACK_BOARD_PIECE) => {
    if(WHITE_BOARD_PIECE[boardPiece] === undefined)
        return "black "+BLACK_BOARD_PIECE[boardPiece];
    return WHITE_BOARD_PIECE[boardPiece] ;
}


const renderCell = (boardPiece : WHITE_BOARD_PIECE|BLACK_BOARD_PIECE) => {

    return(<div className="cell">{renderPiece(boardPiece)}</div>)

    
}

const Board = () => {

    const [boardState,setBoard] = useState(new BoardState());
    const board = boardState.getBoard();
    
    return (
        <>
            {
                render2DList(board,renderCell)
            }

    </>)

}

export default Board;





