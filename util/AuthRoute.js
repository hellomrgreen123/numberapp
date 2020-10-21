import React , {useContext, Component} from 'react'
import {AuthContext} from './AuthContext'
import {Route,Redirect} from  'react-router-native'

const AuthRoute =({component:Component,...rest})=>{

    const {user} = useContext(AuthContext)
    return(
        <Route
        {...rest}
        
        render={props=>
        user? <Redirect to="/" /> :
        <Component{...props}/>
    }/>
    
        )

}

export default AuthRoute