import React, { useState } from 'react';
import axios from 'axios';
import {NavLink, useHistory} from "react-router-dom";




let RegistrationPage = (props)=>{
    const history =useHistory();
    const [form, setForm] = useState({initialState: {
        login:'', password: ''
    }})

    const changeHandler = event =>{
        setForm({...form, [event.target.name]: event.target.value})
    }


    const registerHandler = event => {
        event.preventDefault();
        let newForm = {
            ...form
        }    
        axios.post(`http://localhost:8000/api/auth/register`, { ...newForm })
          .then(res => {
            alert('registered!');
            history.push('/');
          }).catch(error=>{
              alert(error.response.data.message);
          })
      }


    return(
        <div>
            <form>
                <h2>Registration</h2>
                <label>
                    E-Mail: 
                    <input type="email" name="login"  onChange={changeHandler}/>
                </label>
                <label>
                    Password: 
                    <input type="password" name="password"  onChange={changeHandler}/>
                </label>
                <input  onClick={registerHandler}  type="submit" value="Create"/>
                <NavLink to="/">Back to login</NavLink>               
            </form>
        </div>
      );


}

export default RegistrationPage;