import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { clearMessageActionCreator } from '../reducers/userReducer';
  
  function Toast(){

    const {message,success} = useSelector(state=>state.users);
    const dispatch = useDispatch();

    useEffect(()=>{

        if(message)   
        {
            if(success){
                toast.success(message)
                dispatch(clearMessageActionCreator());
            }
            else{
                toast.error(message)
                dispatch(clearMessageActionCreator());
            }
        }
       
    },[success,message])
    

    return (
      <div>
     
        <ToastContainer />
      </div>
    );
  }

  export default Toast;