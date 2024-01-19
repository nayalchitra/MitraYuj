const express = require('express'); // CJS ->
const app = express();
const env = require('dotenv');
const cors = require('cors');
env.config();
const dbConnection = require("./dbConnection");
const router = require("./routes/router");
const userRouter = require("./routes/userRouter");
const requestLogger = require('./utils/requestLogger');
const cookieParser = require('cookie-parser');
const errorHandler = require("./utils/errorHandler");


const port = 5000;

// allow incoming request from this origin
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(express.json());    // middleware to read the body content
app.use(cookieParser());
app.use(requestLogger);
app.use('/test-api',router);
app.use("/user",userRouter);

app.get("/", (req,res)=>{
    res.send({success:true, message:"hello world"});
})

app.use(errorHandler);

app.listen(port,()=>{
    console.clear();
    console.log("server started at ",port);
})