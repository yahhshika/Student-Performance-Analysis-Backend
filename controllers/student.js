const ExpressError = require("../utils/ExxpressError");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const Student = require("../models/student");
module.exports.authenticate = (req,res,next)=>{
    let {token} = req.headers;
    if(!token){
        throw new ExpressError(400, "Kindly login/signup")
        return;
    }
    let data = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.data = data;
    next();
}

module.exports.studentSignUp = async(req,res,next)=>{

    let student = req.body;
    const inputData = req.body.inputData;

    let email = student.email;
    let rollNumber = student.rollNumber;
    let sameUser = await Student.findOne( {$or: [
        { email: email },
        { rollNumber: rollNumber }
    ]});
    if(sameUser){
        throw new ExpressError(400, "email already exists");
        return;
    }
  
    const apiResponse = await fetch(
      "https://student-performance-ml-model.onrender.com/api/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputData)
      }
    );

    let resJson = await apiResponse.json();
    student.input_data = resJson.input_data; 
    student.result = {predictions: resJson.predictions, insights: resJson.insights, success:resJson.success};
    student.predictions = resJson.predictions;
    
    let password = student.password;
    let hashedPass = await bcrypt.hash(password, 10);
    student.password = hashedPass;
    let newStudent = new Student(student);
    let finalRes = await newStudent.save();

    //authentication:
    let data = {
        userId: newStudent._id 
    }
    let token = jwt.sign(data, process.env.JWT_PRIVATE_KEY);
    student = finalRes
    res.send({student,token});

}

module.exports.studentLogIn = async(req,res,next)=>{
    let student = req.body;
    let email = student.email;
    let registeredStu = await Student.findOne({email});
    if(!registeredStu){
        throw new ExpressError(400, "Invalid email or password");
    }
    let enteredPassword = student.password;
    let isMatch = await bcrypt.compare(enteredPassword, registeredStu.password);
    if(!isMatch){
        throw new ExpressError(400, "Invalid email or password");
    }
    let data = {
        userId: registeredStu._id
    }
    let token = jwt.sign(data, process.env.JWT_PRIVATE_KEY);
    student = registeredStu
    res.send({student});
}

module.exports.studentEdit = async(req,res,next)=>{


    let student = req.body;
    delete student.password;
    let email = student.email;
    let registeredStu = await Student.findOne({email});
    if(!registeredStu){
        throw new ExpressError(400, "No such student found");
        return;
    }
    console.log(registeredStu._id);
    console.log(req.data.userId);
    if(!registeredStu._id.equals(req.data.userId)){
        throw new ExpressError(401, "unauthorized access");
        return;
    }

    let inputData = req.body.inputData;
    const apiResponse = await fetch(
      "https://student-performance-ml-model.onrender.com/api/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputData)
      }
    );
    if (!apiResponse.ok) {
        throw new ExpressError(500, "ML service failed");
    }

    let resJson = await apiResponse.json();

    student.input_data = resJson.input_received; 
    student.result = {predictions: resJson.predictions, insights: resJson.insights, success:resJson.success};
    student.teacher = "69f09a0f42124656240efe2e";
    registeredStu.set(student);
    student = await registeredStu.save();
    res.send({student});

}

module.exports.authenticateRouteHandling = async(req,res,next)=>{
    let data = req.data;
    let userId = data.userId;
    let registeredStu = await Student.findById(userId);
    if(!registeredStu){
        throw new ExpressError(400, "No such user found");
        return;
    }
    let student = registeredStu;
    res.send({student})
}