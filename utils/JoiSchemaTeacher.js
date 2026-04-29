let Joi = require("joi");

let teacherSignUpSchema = Joi.object({
    name: Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required(),
    department:Joi.string().valid(
        "Electronics",
        "Computer Science",
        "Mechanical",
        "Information Technology",
        "Civil"
      ).required()
}).required();

let teacherLoginSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required(),
}).required();

module.exports = {teacherSignUpSchema, teacherLoginSchema};