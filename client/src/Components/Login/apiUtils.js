import axios from "axios";

const instance = axios.create({
    baseURL:"http://localhost:5000/",
    withCredentials:true
})

const END_POINTS = {
    LOGIN:'user/login',
    LOGOUT:'user/logout',
    SIGNUP:'user/signup',
    ADD_FRIEND:'user/addFriend',
    REMOVE_FRIEND:'user/removeFriend'
}


export const loginApi = (payload)=>{
    return instance.post(END_POINTS.LOGIN,payload);
}

export const loginWithCookieApi = ()=>{
    return instance.get(END_POINTS.LOGIN);
}

export const signupApi = (payload)=>{
    return instance.post(END_POINTS.SIGNUP,payload);
}


export const logoutApi = ()=>{
    return instance.get(END_POINTS.LOGOUT);
}

export const addFriendApi = (payload)=>{
    return instance.patch(END_POINTS.ADD_FRIEND,payload)
}

export const removeFriendApi = (payload)=>{
    return instance.patch(END_POINTS.REMOVE_FRIEND,payload);
}