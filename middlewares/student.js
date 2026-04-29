const {studentSchema, studentLoginSchema, studentSchemaEdit} = require("../utils/JoiSchema");
const ExpressError = require("../utils/ExxpressError");
module.exports.studentSchemaValidation = (req,res,next)=>{
    let student = req.body;
    let response = studentSchema.validate(student);
    if(response.error){
        let errMsg = response.error.details.map(e=>e.message).join(", ");
        return next(new ExpressError(400,errMsg));
    }
    next();
    
}

module.exports.studentSchemaValidationLogin = (req,res,next)=>{
    let student = req.body;
    let response = studentLoginSchema.validate(student);
    if(response.error){
        let errMsg = response.error.details.map(e=>e.message).join(", ");
        return next(new ExpressError(400,errMsg));
    }
    next();
    
}

module.exports.studentSchemaValidationEdit = (req,res,next)=>{
    let student = req.body;
    let response = studentSchemaEdit.validate(student);
    if(response.error){
        let errMsg = response.error.details.map(e=>e.message).join(", ");
        return next(new ExpressError(400,errMsg));
    }
    next();

}
