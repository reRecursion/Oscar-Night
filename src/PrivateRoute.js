import React from 'react'
import {Route, Redirect} from "react-router-dom";
import { auth} from './FirebaseKey'
import { useAuthState } from 'react-firebase-hooks/auth'

function PrivateRouteProfile({component:Component, ...rest}) {
    const [user] = useAuthState(auth)

    return (
        <Route
            {...rest}
            render = {props => {
               return  user ? <Component {...props}/> :<Redirect to ="/login"/>
            }}
        ></Route>
    )
}


export {PrivateRouteProfile}



