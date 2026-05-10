
const ExpressError = require("../utils/ExxpressError");
const Teacher = require("../models/teacher");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Student = require("../models/student");

module.exports.teacherSignUp = async(req,res,next)=>{
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

    res.cookie("token", token, {
        secure: true,
        sameSite:"none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true

    })

    //delete password before sending.
    teacher = teacher.toObject();
    delete teacher.password;
    res.send({teacher});
}

module.exports.teacherLogin =  async(req,res,next)=>{
    let teacher = req.body;
    let email = teacher.email;
   
    let regTeacher = await Teacher.findOne({email});
  
    if(!regTeacher){
        throw new ExpressError(400, "Invalid email or password");
        return;
    }

    let isMatch = await bcrypt.compare(teacher.password, regTeacher.password);
    if(!isMatch){
        throw new ExpressError(400, "Invalid email or password");
        return;
    }
    let data = {
        teacherId : regTeacher._id,
    }
    const token = jwt.sign(data, process.env.JWT_PRIVATE_KEY);
    res.cookie("token", token, {
        secure: true,
        sameSite:"none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true

    })

    teacher = regTeacher.toObject();
    delete teacher.password;
    res.send({teacher});
}

module.exports.teacherStudents = async(req,res,next)=>{
    let teacherId = req.data.teacherId;
    let students = await Student.find({teacher:teacherId}).select("-password");

    res.send({students});

}
module.exports.teachers = async(req,res,next)=>{
    let teachers = await Teacher.find().select("-password");
    res.send({teachers});
}

module.exports.getAvailableTeacher = async(req,res,next)=>{
    let teacherId = req.data.teacherId;
    let teacher = await Teacher.findById(teacherId).select("-password");
    res.send({teacher});
}