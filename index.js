if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectFn = require("./mongoDbConnect");
connectFn().then(()=>{console.log("successfully connected to db")}).catch(err=>{console.log("err in connecting to db: "+err)});
const ExpressError = require("./utils/ExxpressError");
const teacherRouter = require("./routes/teacher");
const studentRouter = require("./routes/student");

const express = require("express")
const app = express();
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/teacher", teacherRouter);
app.use("/api/student", studentRouter);


let port = 3000; 
app.get("/", (req,res)=>{
    res.send("root is working")
})

app.use((req,res,next)=>{
    throw new ExpressError(404, "page not found");
})

app.use((err, req,res,next)=>{
    let {status = 500, message = "Something went wrong !"} = err;
    res.status(status).send({error: message});
})
app.listen(port, ()=>{
    console.log(`app is listening to port:${port}`);
})