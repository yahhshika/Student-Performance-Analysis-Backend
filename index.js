const connectFn = require("./mongoDbConnect");
connectFn().then(()=>{console.log("successfully connected to db")}).catch(err=>{console.log("err in connecting to db: "+err)});
const ExpressError = require("./utils/ExxpressError");
const teacherRouter = require("./routes/teacher");
const studentRouter = require("./routes/student");

const express = require("express")
const app = express();

app.use(express.json());
app.use("/api/teacher", teacherRouter);
app.use("/api/student", studentRouter);


let port = 3000; 
app.listen(port, ()=>{
    console.log(`app is listening to port:${port}`);
})
app.get("/", (req,res)=>{
    res.send("root is working")
})

app.use((req,res,next)=>{
    throw new ExpressError(404, "page not found");
})

app.use((err, req,res,next)=>{
    let {status = 500, message = "Something went wrong !"} = err;
    res.status(status).send({errors: message});
})