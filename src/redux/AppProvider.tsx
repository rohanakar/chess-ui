import { createContext, useEffect, useState } from 'react';
import { Game } from '../components/Game';
import { Move } from '../model/Move';
import { Player } from '../model/Player';
import { Prop } from '../types/PropTypes';

//create a context, with createContext api
export const AppContext = createContext({} as any);

const AppProvider = (props: any) => {

    const generateGame = (props?: Prop) => {
        let p1 = new Player();
        let p2 = new Player();
        p1.setName("rishabh");
        p2.setName("ankur");
        let game = new Game();
        game.setPlayers([p1,p2]);
        return game;
    }
        // this state will be shared with all components 
        
    const [state, setState] = useState( {curr:generateGame()} as any);
    console.log(state);
    
    const updateGame = (e:Game)=>{
    
        setState({curr:e});
    }

    const updateState = (e:any)=>{
        setState(e);
    }

    const undo = ()=>{

        let game:Game = state.curr;
        let movesPlayed = game.getMovesPlayed();
            let move:Move|undefined = movesPlayed.pop();
            if(!move)
                return;

            let initS = move?.getInitialSpot();
            let finalS = move?.getFinalSpot();
            let finalP = move?.getPieceKilled();
            let initP = move?.getPiece();
            initS?.setPiece(initP);
            finalS?.setPiece(finalP);
            game.setCurrentTurn((game.getCurrentTurn()+1)%2);
        updateState({curr:game,moves:!state.moves?[move]:[...state.moves,move]});
        
    }

    const redo = ()=>{
        let game:Game = state.curr;

        let movesPlayed:Move[] = state.moves;
            let move:Move|undefined = movesPlayed.pop();
            if(!move)
            return;

            let initS = move?.getInitialSpot();
            let finalS = move?.getFinalSpot();
            let finalP = move?.getPieceKilled();
            let initP = move?.getPiece();
            initS?.setPiece(undefined);
            finalS?.setPiece(initP);
            game.setCurrentTurn((game.getCurrentTurn()+1)%2);
            if(move)
            game.getMovesPlayed().push(move);
            updateState({curr:game,moves:state.moves});
       
    }

    return (
                // this is the provider providing state
            <AppContext.Provider value={[state, updateGame,updateState,undo,redo]}>
                {props.children}
            </AppContext.Provider>
    );

    
};

export default AppProvider;