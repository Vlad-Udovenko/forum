import React from 'react';
import Info from "./../../Info/Info";
import Comments from '../../Comments/Comments';

const themeCard = (props)=>{  
  let card = props.form.theme;
  
    return(
         <div>
          <div>
            <h1>{card.topic}</h1>
            <Info name={card.owner} date={card.data} ></Info>
          </div>
          <div>
            <p>{card.text}</p>
          </div>
          <div>
            <Comments getTheme={props.getTheme} comment={card.comments}></Comments>
          </div>
        </div>
    )
}

export default themeCard;