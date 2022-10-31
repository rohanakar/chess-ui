import { useContext, useEffect, useState } from "react";
import { Game } from "../components/Game";
import { Player } from "../model/Player";
import { AppContext } from "../redux/AppProvider";
import { Prop } from "../types/PropTypes";

const Main = () => {

    const [state,,,undo,redo] = useContext(AppContext);

    const handleKeyDown = (e:any) => {
        if(e.key === 'ArrowLeft'){
            undo();
        }else if(e.key === 'ArrowRight'){
            redo();
        }
    }

    let game:Game =state.curr;
    return <div tabIndex={0} onKeyDown={handleKeyDown}>{game&&game.render()}</div>;
    
}

export default Main;
