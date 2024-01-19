
const userModel = require('../model/userModel');
const {createUser, findUser, UpdateUser,updateFriend} = require('../model/userModel');
const { generateToken, verifyToken } = require('../utils/jwtUtils');
const {createPasswordHash, verifyPassword} = require('../utils/passwordUtils');
const { responseCreator, errorCreator } = require('../utils/responseHandler');
const { getQRImage, verified } = require('../utils/twoFA');

const signup = async(req,res,next)=>{
    //signup logic
   try{
    console.log("signup user")
    const userData = req.body;
    const {password} = userData;
    const pwdHash = await createPasswordHash(password);
    userData.password = pwdHash;
    const {secret,qrcode} = await getQRImage();
    userData.secret = secret;
    const userCreatedData = await createUser(userData);
    
        
        if(userCreatedData){
            res.status(201).send(`
                <h1>user ${userData.username} created successfully !! <h1>
                <h1> two factor authentication setup </h1>
                <h2>Please scan the QR code with google authenticator</h2>
                <img src="${qrcode}"/>
            `);
        }
    
   }
   catch(err){
    next(err);
   }
   
}

const login = async(req,res,next)=>{
    //login logic
    try{
        const {username,password} = req.body;
       
        const {password:pwdHash,secret, ...data} = await findUser(username);
        
       
            if(await (verifyPassword(password,pwdHash))){
                // once password is verified, generate token
                const token = generateToken({data});
                res.cookie('token',token,{
                    maxAge:24*60*60*1000,
                    httpOnly:true,
                })
                res.status(200)
                res.send(responseCreator(` ${username} successfully logged in`,  {...data}));
            }
            else{
                const err = new Error("Incorrect password");
                console.log("controoler err ",err)
                err.status = 401;
                err.response={
                    data
                }
                console.log(err.response)
                throw err;
            }
        
       
    }
    catch(err){
        next(err);
    }

}

const authMiddleware = async(req,res,next)=>{
    // const {authorization = null} = req.headers;
    // if(!authorization){
    //     errorCreator("Token Missing !!",403)
    // }
    try{
        console.log("authMiddleware")
        // const [, token] = authorization.split(" ");
        // console.log(token)
        const {token} = req.cookies;
        console.log({token})
        //console.log(req.cookie, req.cookies)
        const {username} = verifyToken(token);
        console.log(username)
        const {password,...userData} = await userModel.findUser(username)
        res.locals.userData = userData;
       // console.log("userData");
        console.log({userData});
    
        //res.status(200).send(responseCreator("user authenticated",userData));
        // console.log(res.locals)
         
        //console.log(res.locals.userData);
         next();

        
        
    }catch(err){
        next(err);
    }
    // res.send({success:true})
    // next()
}

const loginWithCookie = async(req,res,next)=>{
    try{
        res.send(responseCreator("User authenticated with cookie", res.locals.userData))
    }
    catch(err){
        next(err)
    }

}


const resetPassword = async(req,res,next)=>{
    try{

        const {username, password:pwd, token} = req.body;
        const user = await findUser(username);
        const {secret} = user;
        const isOTPValid = verified(token,secret);
        if(isOTPValid){
            const password = await createPasswordHash(pwd);
            const userUpdated = await UpdateUser(username, {password});
            if(userUpdated){
                res.send(responseCreator("Password updated successfully for ",username));
            }
            else{
                errorCreator("something went wrong!!");
            }
        }
        else{
            errorCreator("invalid OTP", 403);
        }
    }catch(err){
        next(err);
    }
}



const addFriend = async(req,res,next)=>{
    try{
        const {username} = res.locals.userData ;
        const {id, name} = req.body;
        const data = await updateFriend(username,id);
        if(data){
            res.status(200);
            res.send(responseCreator(`You are now friends with ${name}`, data.friendList));
        }
        
    }
    catch(err){
        next(err);
    }
}

const removeFriend = async(req,res,next)=>{
    try{

        const {username} = res.locals.userData;
        const {id, name} = req.body;
        const data = await updateFriend(username, id,  false);
        if(data){
            res.status(200);
            res.send(responseCreator(`You are not a friend with ${name}`, data.friendList));
        }
        
    }

    catch(err){
        next(err);
    }
}

const logout = async(req,res,next)=>{
    res.clearCookie('token');
    res.send(responseCreator("User logged out successfully!!"));
}

module.exports = {signup, login,authMiddleware,loginWithCookie, resetPassword, addFriend,removeFriend, logout};