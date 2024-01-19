import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutActionCreator } from '../../reducers/userReducer';

export const Logout = () =>{
  
    const dispatch = useDispatch();
    dispatch(logoutActionCreator());
  
}
