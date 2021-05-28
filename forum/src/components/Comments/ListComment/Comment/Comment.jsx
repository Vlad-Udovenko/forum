import React from 'react';
import Info from '../../../Info/Info'


let Comment = (props)=>{
  console.log(props.comment)
  if(props.comment){ 
    return(
        <div>
          {props.maxLengthC ? props.comment.comment.toString().substr(0,props.maxLengthC)+ '...' : props.comment.comment }
          <Info date={props.comment.date} name={props.comment.id}  />
        </div>
      );
    }
    return( 
      <div></div>
    )

}

export default Comment;