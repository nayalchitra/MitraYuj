import React from 'react'
import { Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import "./style.css";

export default function LoadingComponent() {
    const {loading, users_loading} = useSelector(({users})=>users);
    console.log({loading})
    if(loading || users_loading)
        return (
   
            <Spinner className='loader-spin' animation="border" role="status"/>

        )
    return <></>
}
