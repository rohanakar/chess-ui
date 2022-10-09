import { render } from "@testing-library/react";
import { useEffect, useState } from "react";
import { Spot } from "../model/Spot";
import BoardGenerator from "../utils/BoardGenerator";
import { render2DList } from "../utils/helper";
import { Board as BoardModel } from "../model/Board";
 
const Board = (props: { board: BoardModel; }) => {

    const board = props.board;

    console.log("rendering board");
    
    return (
        <>
            {
                render2DList(board.getSpots())
            }

    </>)

}

export default Board;





