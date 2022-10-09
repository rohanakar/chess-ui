import { useContext, useEffect } from "react";
import Board from "../components/Board";
import { Game } from "../model/Game";
import { AppContext } from "../redux/AppProvider";

const Main = () => {

    const [state] = useContext(AppContext);
    console.log("main")
    return (<Board board={state.game.getBoard()}/>)
    
}

export default Main;