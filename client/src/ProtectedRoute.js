import React from 'react'
import { Navigate } from 'react-router'

export default function ProtectedRoute({children, isLoggedIn}) {
    console.log({isLoggedIn})
    if(!isLoggedIn){
        return <Navigate to={'/login'}/>
    }
    return children;
}
