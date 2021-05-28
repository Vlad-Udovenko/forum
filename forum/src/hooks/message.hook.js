import{useCallback} from 'react';

export const useMessage = ()=>{
    return useCallback( text =>{
        if(typeof text === 'string' || text instanceof String ){
        alert(text)}
}, [])

}