import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import ThemeList from './components/ThemeList/ThemeList'
import ThemePage from './components/ThemePage/ThemePage'
import ThemeCreate from './components/ThemeCreate/ThemeCreate'

import LoginPage from './components/LoginPage/LoginPage'
import RegistrationPage from './components/RegistrationPage/RegistrationPage'

const UseRoutes = (props) => {
    if(props.isAuthenticated){
        return(
            <Switch>
                <Route path='/themeList' exact render={()=><ThemeList/>}/>
                <Route path='/themePage/:id'  render={()=><ThemePage/>}/>
                <Route path='/themeCreate' exact render={()=><ThemeCreate/>}/>
                <Redirect to = '/themeList'/>
            </Switch>
        )
    }
    return(
        <Switch>
            <Route path='/' exact render={()=><LoginPage/>}/>
            <Route path='/registration'  render={()=><RegistrationPage/>}/>
            <Redirect to = '/'/>
        </Switch>
    )
}


export default UseRoutes;