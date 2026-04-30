let {teacherSignUpSchema, teacherLoginSchema} = require("../utils/JoiSchemaTeacher");
let ExpressError = require("../utils/ExxpressError");
let jwt = require("jsonwebtoken");
module.exports.teacherSignUpSchemaValidate = (req,res,next)=>{
    let teacher = req.body;
    let response = teacherSignUpSchema.validate(teacher);
    if(response.error){
        let errMsg = response.error.details.map(e=>e.message).join(", ");
        return next(new ExpressError(400,errMsg));
    }
    next();
    
}
module.exports.teacherLoginSchemaValidate = (req,res,next)=>{
    let teacher = req.body;
    let response = teacherLoginSchema.validate(teacher);
    if(response.error){
        let errMsg = response.error.details.map(e=>e.message).join(", ");
        return next(new ExpressError(400,errMsg));
    }
    next();
    
}

