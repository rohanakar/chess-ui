import { createContext, useState } from 'react';
import { Game } from '../model/Game';

//create a context, with createContext api
export const AppContext = createContext({} as any);

const AppProvider = (props: any) => {
        // this state will be shared with all components 
    const [state, setState] = useState({game:new Game()} as any);

    return (
                // this is the provider providing state
            <AppContext.Provider value={[state, setState]}>
                {props.children}
            </AppContext.Provider>
    );
};

export default AppProvider;