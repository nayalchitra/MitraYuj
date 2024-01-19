const mongoose = require('mongoose');
const DB_URL_ENV = process.env.DB_URL;

mongoose.connect(DB_URL_ENV).then(data=>{
    console.log("DB is conncted")
}).catch(err=>console.log(err))


module.exports = {}