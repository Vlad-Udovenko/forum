import React, { useCallback, useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';

import {AuthContext} from './../../context/AuthContext'
import Loader from '../Loader/Loader';
import ThemeCard from './ThemeCard/ThemeCard'
import Header from '../Header/Header'

let ThemePage = (props)=>{  

  const {token} = useContext(AuthContext)
  const {request, loading}=useHttp()
    const [form, setForm] = useState(null);
    const themeId = useParams().id ;

    const getTheme = useCallback(async ()=>{
      try{
        const data =  await request(`/api/theme/${themeId}`, 'Get', null,{
          Authorization: `Bearer ${token}`
        });
        setForm(data);
      }
      catch{

      }
    }, [token, themeId, request]);

    useEffect(()=>{
      getTheme();
    },[getTheme])

    if(loading){
      return <Loader/>
    }

    return(
      <>
      <Header></Header>
      {!loading && form && <ThemeCard getTheme={getTheme} form={form}/>}
      </>
       
      );


}

export default ThemePage;