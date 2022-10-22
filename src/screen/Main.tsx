import { useContext, useEffect, useState } from "react";
import { Game } from "../components/Game";
import { Player } from "../model/Player";
import { AppContext } from "../redux/AppProvider";
import { Prop } from "../types/PropTypes";

const Main = (props:Prop) => {

    const [state,updateState] = useContext(AppContext);
    useEffect(()=>{
        console.log("rendering");
        const game = generateGame(props);
        updateState({game});

    },[])
    
    return state.game.renderBoard();
    
}
const generateGame = (props: Prop) => {
    let p1 = new Player();
    let p2 = new Player();
    p1.setName("rishabh");
    p2.setName("ankur");
    let game = new Game();
    game.setPlayers([p1,p2]);
    return game;
}
export default Main;
