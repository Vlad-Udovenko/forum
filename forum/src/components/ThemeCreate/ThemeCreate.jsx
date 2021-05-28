import React, {useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import Header from '../Header/Header';

const ThemeCreate = (props)=>{


 const history = useHistory()
 const auth =  useContext(AuthContext);
  const {request} = useHttp();
  const [form, setForm] = useState({initialState: {
    topic:'', text: '' 
}})

const changeHandler = event =>{
  setForm({...form, [event.target.name]: event.target.value})
}

  const createTheme = async (event)=>{
    try {
      event.preventDefault();
      const data = await request('/api/theme/generate', 'POST', {...form}, {Authorization: `Bearer ${auth.token}`});
      history.push(`/themePage/${data.theme._id}`);
    }
    catch(e){ event.preventDefault()}
  }


    return(
        <div>
          <Header creat='creat'></Header>
          <h1> Create THEME</h1>
         
          <form action="" onSubmit={createTheme}>
            <input type="text" name="topic"  onChange={changeHandler} required placeholder="Topic"/>
            <textarea name="text" cols="30" rows="5" minLength='20' required placeholder='Enter text' onChange={changeHandler}></textarea>
            <input type="submit" value="Create" />
          </form>
        </div>
      );


}

export default ThemeCreate;