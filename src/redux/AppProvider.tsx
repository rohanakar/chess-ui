import { createContext, useState } from 'react';
import { Game } from '../components/Game';

//create a context, with createContext api
export const AppContext = createContext({} as any);

const AppProvider = (props: any) => {
        // this state will be shared with all components 
    const [state, setState] = useState({game:new Game()} as any);
    const updateState = (e:object,move?:string)=>{
        console.log(move);
        setState(e);
    }

    return (
                // this is the provider providing state
            <AppContext.Provider value={[state, updateState]}>
                {props.children}
            </AppContext.Provider>
    );
};

export default AppProvider;