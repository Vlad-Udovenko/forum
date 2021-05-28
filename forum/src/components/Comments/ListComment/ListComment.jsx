import React, { useState,useCallback,useEffect  } from 'react';
import Comment from './Comment/Comment'
import Futter from '../../Futter/Futter'

let ListComment = (props)=>{
  const [limit,setLimit] = useState(20);
  const [page,setPage] = useState(1);
  const [themLength, setThemLength] = useState();
  const [comm, setComm] = useState();

  let comments=props.comments.slice(0).reverse();


const getArr = useCallback(()=>{
  try{

    const subarray = []
    for (let i = 0; i <Math.ceil(comments.length/limit); i++){
        subarray[i] = comments.slice((i*limit), (i*limit) + limit);
    }
    setThemLength(subarray[page-1].length)
    setComm(subarray);
  } catch (e){

  }
},[limit,page])

useEffect(()=>{
  getArr();
},[getArr]); 

  if(!comm){
    return(<div>
      NO comments yet
    </div>)
  }

    return(
        <div>
          <div>
            {comm[page-1].map(element => {
              return(
              <Comment key={comments.length++}  comment={element}></Comment>
              )
            })}
          </div>
          <Futter  page={page} themLength={themLength} setLimit={setLimit} setPage={setPage} length={limit}></Futter>
        </div>
      );


}

export default ListComment;