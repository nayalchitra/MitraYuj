// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const { errorCreator } = require('../utils/responseHandler');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type:String,
    required:["true","name is mandatory"],
  },
  username: {
    type:String,
    unique:true,
    required:["true","username is mandatory"],   // field is required, if not filled, shows the message
  },
  password: {
    type:String,
    required:["true","password is mandatory"],
    validate:{
        validator:(value)=>{
            return value.length >= 8
        },
        message:"password should be of atleast 8 characters" // if validation fails, this message is shown
    }
  },
  secret:String,
  friendList:[String]
  
});


userSchema.statics.createUser = async(userData)=>{
   
    const data = await userModel.create(userData);
    console.log({data})
    if(data){
        return data;
    }
   
};
userSchema.statics.findUser = async(username)=>{
    const data = (await userModel.findOne({username},{_id:0,__v:0}))?.toObject();
    if(data)
        return data;
    else{
        const err = new Error("User doesn't exist");
        err.staus = 404;
        throw err;
    }
};

userSchema.statics.updateFriend = async(username, id, addFriend=true)=>{
    let data;
    if(addFriend){
      data = await userModel.updateOne({username}, {$addToSet:{friendList:id}})
    }
    else{
      data = await userModel.updateOne({username}, {$pull:{friendList:id}});
    }
    console.log({data});
    if(data.modifiedCount || data.matchedCount){
      return userModel.findUser(username);
    }
    errorCreator("Something went wrong!!");
}

userSchema.statics.UpdateUser = async(username,data)=>{
  const userData = await userModel.updateOne({username},
    {
      $set:{...data}
    });

    if(userData.modifiedCount){
      return true;
    }
    else{
      errorCreator("Something went wrong")
    }
}


//based on schema, we create model
const userModel = mongoose.model("users",userSchema);

module.exports = userModel;
