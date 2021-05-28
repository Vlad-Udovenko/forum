import React from 'react';

let Futter = (props)=>{
    let length = props.length

    let page = props.page;

    const nextPage = ()=>{
        props.setPage(++page);
    }

    const previousPage = ()=>{
        props.setPage(--page);
    }
    


    return(
        <div>
        <div> 
            <button disabled={props.themLength !== length } onClick={nextPage}>  Next Page </button>
            <button disabled={props.page===1} onClick={previousPage}> Previous Page  </button> 
        </div>
            length:{length}
        </div>
      );
}

export default Futter;