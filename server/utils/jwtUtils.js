const jwt = require('jsonwebtoken');
const {sign, verify} = jwt;

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (data)=>{
    const token = sign(data, SECRET_KEY, {
        expiresIn:'20s'
    })
    console.log({token});
    return token;
}

const verifyToken = (token)=>{
    try{
      
        const verified = verify(token, SECRET_KEY);
        console.log({verified});
        return verified.data;
    }catch(err){
        console.log("verify ",err.message);
    }
}
// const userData = {name:"chitra",id:101};
// // console.log(generateToken(userData));
// console.log(verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY2hpdHJhIiwiaWQiOjEwMSwiaWF0IjoxNzA0ODk0MzUwLCJleHAiOjE3MDQ4OTQzNzB9.2jqUWo6fx9yg6g5PPP7NXpPZhXFc3YJPsX8MrFssoaI"))
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY2hpdHJhIiwiaWQiOjEwMSwiaWF0IjoxNzA0ODk0MzUwLCJleHAiOjE3MDQ4OTQzNzB9.2jqUWo6fx9yg6g5PPP7NXpPZhXFc3YJPsX8MrFssoaI";

module.exports={generateToken, verifyToken} 