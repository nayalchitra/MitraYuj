import { addFriendApi, loginApi, loginWithCookieApi, logoutApi, removeFriendApi, signupApi } from "../Components/Login/apiUtils";

const initialState = {

    username:"",
    name:"",
    friendList:[],
    success:false,
    message:"",
    loading:null,
    isLoggedIn:null,
    users_loading:false,
}

const ACTIONS = {
    LOGIN:'LOGIN',
    SIGNUP:'SIGNUP',
    LOGOUT:'LOGOUT',
    ADD_FRIEND:'ADD_FRIEND',
    REMOVE_FRIEND:'REMOVE_FRIEND',
    ERROR:'ERROR',
    RESET_MSG:'RESET_MSG',
    LOADING:'LOADING',
    IS_LOGGED_IN:'IS_LOGGED_IN',
    USERS_LOADING:'USERS_LOADING',
}


// export const loginActionCreator = async (payload)=>{
    
   
//         try{
//             const {data} =  ( await loginApi(payload)).data;
//             console.log(data)
//             // const {success, message, data:{
//             //     friendList,
//             //     name,
//             //     username
//             // }} = data;
//             return {
//                 type:ACTIONS.LOGIN, payload:data
//             }
    
//         }catch(err){
//             console.log(err);
//             return {
//                 type:ACTIONS.ERROR,
//                 payload:{success:false,
//                 message:err.message
//             }
//             };
//         }
    
  
// }

const ActionCreator = (helperApi,action,payload)=>{
    return async(dispatch)=>{
        try{
            dispatch(loadingActionCreator(true))
            const data =  (await helperApi(payload)).data;
            console.log("user login data",data)
            dispatch({
                ...action,
                payload:data
            })
            
    
        }catch(err){
            console.log("error: " ,err);
           
            dispatch(loadingActionCreator(false));
        }
        finally{
            dispatch({
                type:ACTIONS.LOADING,
                payload:false
            })
        }
    }
}

export const loadingActionCreator = (payload)=>{
    return {
        type:ACTIONS.LOADING,
        payload
    }
}

export const userLoadingActionCreator = (payload)=>{
    return {
        type:ACTIONS.USERS_LOADING,
        payload
    }
}

export const loginActionCreator = (payload)=>{
    const action = {type:ACTIONS.LOGIN}
    return ActionCreator(loginApi,action,payload);
}
export const clearMessageActionCreator =()=>{
    const action = {
        type:ACTIONS.RESET_MSG
    }
    return action;
}

export const signupActionCreator = (payload)=>{
    const action = {
        type:ACTIONS.SIGNUP
    }
    return ActionCreator(signupApi,action,payload);
}

export const loginWithCookieActionCreator = ()=>{
    const action = {
        type:ACTIONS.LOGIN
    }
    return ActionCreator(loginWithCookieApi,action);
}

export const addFriendActionCreator = (payload)=>{
    const action = {
        type:ACTIONS.ADD_FRIEND
    }
    return ActionCreator(addFriendApi,action,payload);
}

export const removeFriendActionCreator = (payload)=>{
    const action = {
        type:ACTIONS.REMOVE_FRIEND
    }
    return ActionCreator(removeFriendApi,action,payload);
}

export const logoutActionCreator =()=>{
    const action = {
        type:ACTIONS.LOGOUT
    }
    return ActionCreator(logoutApi,action);
}



// export const loginActionCreator = (payload)=>{
    
//     return async(dispatch)=>{
//         try{
//             const data =  (await loginApi(payload)).data;
//             console.log("user login data",data)
//             dispatch( {
//                 type:ACTIONS.LOGIN, payload:data
//             })
    
//         }catch(err){
//             console.log(err);
//             dispatch({
//                 type:ACTIONS.ERROR,
//                 payload:{
//                     success:false,
//                     message:err.message
//                 }
//             });
//         }
//     }
  
// }

// export const loginWithCookieActionCreator = ()=>{
    
//     return async(dispatch)=>{
//         try{
//             const data =  (await loginWithCookieActionCreator()).data;
//             console.log("user login data",data)
//             dispatch( {
//                 type:ACTIONS.LOGIN, payload:data
//             })
    
//         }catch(err){
//             console.log(err);
//             dispatch({
//                 type:ACTIONS.ERROR,
//                 payload:{
//                     success:false,
//                     message:err.message
//                 }
//             });
//         }
//     }
  
// }

// export const signupActionCreator = (payload)=>{

//     return async (dispatch)=>{
//         try{
//             const data = (await signupApi(payload)).data;
//             console.log("signup ",data);
//             dispatch({
//                 type:ACTIONS.SIGNUP,
//                 payload:data
//             })

//         }catch(err){
//             return dispatch({
//                 type:ACTIONS.ERROR,
//                 payload:{
//                     success:false,
//                     message:err.message
//                 }
//             })
//         }
//     }
// }

export const userReducer = (state = initialState, action)=>{
    const {success, message,  data} = action.payload || ''
    switch(action.type){
        case ACTIONS.LOGIN:
           
            const {username, name, friendList} = data;
            return {
                ...state,
                username,
                name,
                friendList,
                success,
                message,
                isLoggedIn:true,
            }
        
        case ACTIONS.SIGNUP:
            return {
                ...state,
                username,
                name,
                friendList,
                success,
                message,
                
            }

        case ACTIONS.ADD_FRIEND:
           
            return {
                ...state,
                friendList:data,
                message,
                success
            }


        case ACTIONS.REMOVE_FRIEND:
           
            return {
                ...state,
                friendList:data,
                success,
                message
            }

        case ACTIONS.ERROR:
            return {
                ...state,
                message,
                success
            }   

        case ACTIONS.RESET_MSG:
            return {
                ...state,
                message:'',
                
            }
        case ACTIONS.LOADING:
            return {
                ...state,
                loading:action.payload
            }
        case ACTIONS.LOGOUT:
            return initialState;
        
        case ACTIONS.USERS_LOADING:
            return {
                ...state,
                users_loading:action.payload
            }
        // case ACTIONS.IS_LOGGED_IN:
        //     return {
        //         ...state,
        //         isLoggedIn:action.payload;
        //     }
            default:
            return state;
    }
}