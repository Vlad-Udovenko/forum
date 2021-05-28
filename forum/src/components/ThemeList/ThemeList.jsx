import React, { useCallback, useContext, useEffect, useState } from 'react';


import Header from '../Header/Header'
import Theme from './Theme/Theme';
import Futter from './../Futter/Futter'
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../Loader/Loader';


let ThemeList = (props)=>{
  const [themes,setThemes] = useState([]);
  const {loading,request} = useHttp();
  const {token} = useContext(AuthContext);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [themLength, setThemLength] = useState()
  const getList = useCallback(async()=>{
    try{
      const list = await request(`http://localhost:8000/api/theme/?page=${page}&limit=${limit}`, 'GET', null, {Authorization: `Bearer ${token}`});
      setThemes(list);
      setThemLength(list.length);
    } catch (e){

    }
  },[request, token, limit,page])

    useEffect(()=>{
      getList();
    },[getList]);
    
    if(loading) {
      return <Loader/>
    }

    return(
      <>
          <Header list='list'></Header>
          <section>
          {!loading && <Theme getList={getList} themes={themes}></Theme> }
          </section>
          <Futter page={page} themLength={themLength} setLimit={setLimit} setPage={setPage} length={limit}></Futter>
      </>
      );


}

export default ThemeList;