const express = require("express");
const router = express.Router();
const {teacherSignUpSchemaValidate, teacherLoginSchemaValidate, isLoggedIn} = require("../middlewares/teacher");
const bcrypt = require("bcrypt");
const asyncWrap = require("../utils/asyncWrap");
const Teacher = require("../models/teacher");
const jwt = require("jsonwebtoken");
const ExpressError = require("../utils/ExxpressError");
const Student = require("../models/student");
router.post("/signup",teacherSignUpSchemaValidate, asyncWrap(async(req,res,next)=>{
    let teacher = req.body;
    let email = teacher.email;

    let existingTeacher = await Teacher.findOne({email});
    if(existingTeacher){
        throw new ExpressError(400, "teacher already exists");
        return;
    }
    let password = teacher.password;
    let hashedPass = await bcrypt.hash(password, 10);
    teacher.password = hashedPass;
    let newTeacher = new Teacher(teacher);
    teacher = await newTeacher.save();

    let data = {
        teacherId : newTeacher._id,
    };
    const token = jwt.sign(data, process.env.JWT_PRIVATE_KEY);

    res.send({teacher,token});
}))

router.post("/login",teacherLoginSchemaValidate,asyncWrap( async(req,res,next)=>{
    let teacher = req.body;
    let email = teacher.email;
   
    let regTeacher = await Teacher.findOne({email});
  
    if(!regTeacher){
        throw new ExpressError(400, "Invalid email or password");
        return;
    }

    let isMatch = await bcrypt.compare(teacher.password, regTeacher.password);
    if(!isMatch){
        throw new ExpressError(400, "Invalid email or password")
    }
    let data = {
        teacherId : regTeacher._id,
    }
    const token = jwt.sign(data, process.env.JWT_PRIVATE_KEY);
    teacher = regTeacher;
    res.send({teacher, token});
}))

router.get("/students",isLoggedIn,asyncWrap(async(req,res,next)=>{
    let teacherId = req.data.teacherId;
    let students = await Student.find({teacher:teacherId});

    res.send({students});

}))


module.exports = router;