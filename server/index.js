const express = require('express'); // CJS ->
const app = express();
const router = require("./routes/router");
const port = 5000;

app.use(express.json());    // middleware to read the body content

app.use('/test-api',router);

app.get("/", (req,res)=>{
    res.send({success:true, message:"hello world"});
})


app.listen(port,()=>{
    console.clear();
    console.log("server started at ",port);
})