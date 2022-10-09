import { useState } from "react";
import Board from "../components/Board";
import { Game } from "../model/Game";


const Main = () => {
    
    const [game,setGame] = useState(new Game())

    return (<Board board={game.getBoard()}/>)
    
}

export default Main;