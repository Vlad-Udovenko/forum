import React, {useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import {useParams} from 'react-router-dom';


let AddComment = (props)=>{
  
  const auth =  useContext(AuthContext);
  const {request} = useHttp();
  const themeId = useParams().id ;

  const [form, setForm] = useState({initialState: {
    comment:'' , userId: ''
}})

const changeHandler = event =>{
  setForm({...form, [event.target.name]: event.target.value})
}

const createComment =async (event)=>{
  try {
    form.userId = auth.userId;
    form.date = new Date();
    await request(`/api/theme/${themeId}/addcomment`, 'PUT', {...form}, {Authorization: `Bearer ${auth.token}`});
    props.getTheme();
  }
  catch(e){ }
  if(event){event.target.reset();}
} ;


    return(
        <div>
          <form onSubmit={createComment}>
          <textarea  onChange={changeHandler} required name="comment" id="commentAdd" cols="30" rows="3"></textarea>
          <button>Add Comment</button>
          </form>
        </div>
      );


}

export default AddComment;