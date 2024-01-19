const errorHandler = (error, req,res,next)=>{
    console.log("error here")
    console.log(error)
    if(error.code ==11000){
        error.status = 403;
        error.message = "username already exists";
    }
   
    //    res.status(error.status||500);
    console.error("error caught by error handler")
        res.send({success:false, message:error.message,data:error.response})
    
}

module.exports = errorHandler; 