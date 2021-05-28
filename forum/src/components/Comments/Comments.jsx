import React from 'react';
import AddComment from './AddComment/AddComment';
import ListComment from './ListComment/ListComment';


let Comments =  (props)=>{
    return(
        <div>
          <AddComment getTheme={props.getTheme} />
          <ListComment comments={props.comment}/>
        </div>
      );
}

export default Comments;