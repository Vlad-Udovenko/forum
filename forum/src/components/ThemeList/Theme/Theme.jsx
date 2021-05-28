import React,{useContext,useEffect,useCallback} from 'react';
import Info from"./../../Info/Info";
import {Link} from 'react-router-dom';
import {AuthContext} from '../../../context/AuthContext';
import { useHttp } from '../../../hooks/http.hook';
import Comment from '../../Comments/ListComment/Comment/Comment';



let Theme = (props)=>{
    const auth =  useContext(AuthContext);
    const {request} = useHttp();

    const deleteTheme = useCallback (async (e, val)=>{
        try {
            e.preventDefault();
            const data = await request(`/api/theme/${val}`, 'DELETE', null, {Authorization: `Bearer ${auth.token}`});
            debugger;
        }
          catch(e){ }
        }
        ,[])
    useEffect(()=>{
        deleteTheme();
    },[deleteTheme]);   


    return(
        <div>
        {props.themes.slice(0).reverse().map(theme =>{
            return(
            <div style={{margin: "120px"}} key={theme._id}>
                <div>
                    <Info name={theme.owner} date={theme.data}/>
                    <h1>{theme.topic}</h1>
                    <Link to={`/themePage/${theme._id}`}>Detail</Link>
                    { theme.owner == auth.userId && <button onClick={(e) => {deleteTheme(e,theme._id); props.getList()}}>Delete</button>}
                
                </div>
                <div>
                   {theme.comments && <Comment comment={theme.comments.slice(0).reverse()[0]} maxLengthC={200}/>}
                </div>
            </div>
                )
        })  
        }
        </div>
      );


}

export default Theme;