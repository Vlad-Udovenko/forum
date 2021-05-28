import React, { useCallback, useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';

import {AuthContext} from './../../context/AuthContext'



let Info = (props)=>{

    const {token} = useContext(AuthContext)
    const {request}=useHttp()
    const [form, setForm] = useState(null);
    const themeId = useParams().id ;

    const getTheme = useCallback(async ()=>{
      try{
        const data =  await request(`/api/auth/user/${props.name}`, 'Get', null,{
          Authorization: `Bearer ${token}`
        });
        setForm(data);
      }
      catch{}
    }, [token, themeId, request]);
    
    useEffect(()=>{
        if(props.name){
      getTheme();
    }
    },[getTheme])



    if(!props.date){
        return(
            <div>
                <div>
                    No comments
                </div>
                <div>    
                </div>
            </div>
          );
    }
    let newDate= new Date(props.date).toDateString();
    let newTime = new Date(props.date).toLocaleTimeString();

    return(
        <div>
            <div>
                {form}
            </div>
            <div>
                {newDate}
            </div>
            <div>
                {newTime}
            </div>
            
        </div>
      );


}

export default Info;