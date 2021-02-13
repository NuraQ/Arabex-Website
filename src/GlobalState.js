
import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState,useGlobalState }  = createGlobalState({ items: [], done:false});

export const setValues = (x) => {
    setGlobalState('items', x);
  };

  export const setDragging = (x) => {
    setGlobalState('done', x);
  };
  
  
export {useGlobalState}
