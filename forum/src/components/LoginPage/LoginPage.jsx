import React, { useContext, useEffect, useState } from 'react';
import {NavLink} from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import { useMessage } from '../../hooks/message.hook';



const LoginPage = ()=>  {
    const auth = useContext(AuthContext)

    const message = useMessage ();
    const { request, error, clearError} = useHttp();
    const [form, setForm] = useState({initialState: {
        login:'', password: ''
    }})

    useEffect (()=>{
        console.log('Error', error)
        message(error);
        clearError();
    },[error,message,clearError ])


    const changeHandler = event =>{
        setForm({...form, [event.target.name]: event.target.value})
    }

    const signHandler = async (event) =>{
        try {
            event.preventDefault();
            const data = await request ('http://localhost:8000/api/auth/login','POST',{...form})
            auth.login(data.token, data.userId)
        } catch(e){}
    }
        return(
        <div>
            <form >
                <h2>Login</h2>
                <label>
                    E-Mail: 
                    <input type="email" name="login" onChange={changeHandler}/>
                </label>
                <label>
                    Password: 
                    <input type="password" name="password"  onChange={changeHandler}/>
                </label>
                <input type="submit" onClick={signHandler} value="Login"/>
                <NavLink to="/registration">Registration</NavLink>          
            </form>
        </div>
    )


}

export default LoginPage;