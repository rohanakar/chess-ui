import { createContext, useEffect, useState } from 'react';
import { Game } from '../components/Game';

//create a context, with createContext api


//create a context, with createContext api
export const MouseContext = createContext({} as any);

const MouseProvider = (props: any) => {
        // this state will be shared with all components 
    const [state, setState] = useState({x:0,y:0});

    useEffect(() => {
      // 👇️ get global mouse coordinates
      const handleWindowMouseMove = (event: { clientX: any; clientY: any; }) => {
        setState({
          ...state,
          x: event.clientX,
          y: event.clientY,
        });
      };
      window.addEventListener('mousemove', handleWindowMouseMove);
  
      return () => {
        window.removeEventListener('mousemove', handleWindowMouseMove);
      };
    }, []);


    return (
                // this is the provider providing state
            <MouseContext.Provider value={[state, setState]}>
                {props.children}
            </MouseContext.Provider>
    );
};

export default MouseProvider;