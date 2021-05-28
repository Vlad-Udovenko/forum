import React,{useContext} from 'react';

import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from './../../context/AuthContext';


const Header =(props)=>{
    const history = useHistory()
    const auth = useContext(AuthContext)
  
  
    const logoutHandler = event =>{
      event.preventDefault();
      auth.logout();
      history.push('/');
    }
    return(
    <header>
        {!props.creat && <NavLink to="/themeCreate">Create Theme</NavLink>}
        {!props.list && <NavLink to="/themeList">Theme List</NavLink> }
        <br></br>
        <a href= '/' onClick = {logoutHandler}>Log Out </a>
        <br></br>
        <br></br>
        <br></br>
    </header>
        )
    
}

export default Header;