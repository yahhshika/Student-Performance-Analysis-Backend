const Joi = require("joi");

const studentSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .required(),

  rollNumber: Joi.string()
    .alphanum()
    .required(),

  email: Joi.string()
    .email()
    .required(),
  password:Joi.string()
    .required(),

  teacher:Joi.string()
    .required(),
}).required();


const metaDataSchema = Joi.object({

 
  study_hours_weekly: Joi.number()
    .required(),

  attendance_pct: Joi.number()
    .min(0)
    .max(100)
    .required(),

  previous_cgpa: Joi.number()
    .min(0)
    .max(10)
    .required(),

  sleep_hours: Joi.number()
    .required(),

  mental_health_score: Joi.number()
    .min(1)
    .max(10)
    .required(),

  has_part_time_job: Joi.number()
    .valid(0, 1)
    .required(),

  extracurricular: Joi.string()
    .valid(
      "Sports",
      "Cultural",
      "Multiple",
      "No Activity",
      "Technical Club"
    )
    .required(),

  department: Joi.string()
    .valid(
      "Electronics",
      "Computer Science",
      "Mechanical",
      "Information Technology",
      "Civil"
    )
    .required(),

  semester: Joi.number()
    .integer()
    .min(1)
    .max(8)
    .required()

}).required();

const studentSchemaEdit = Joi.object({


  study_hours_weekly: Joi.number()
    .required(),

  attendance_pct: Joi.number()
    .min(0)
    .max(100)
    .required(),

  previous_cgpa: Joi.number()
    .min(0)
    .max(10)
    .required(),

  sleep_hours: Joi.number()
    .required(),

  mental_health_score: Joi.number()
    .min(1)
    .max(10)
    .required(),

  has_part_time_job: Joi.number()
    .valid(0, 1)
    .required(),

  extracurricular: Joi.string()
    .valid(
      "Sports",
      "Cultural",
      "Multiple",
      "No Activity",
      "Technical Club"
    )
    .required(),

  department: Joi.string()
    .valid(
      "Electronics",
      "Computer Science",
      "Mechanical",
      "Information Technology",
      "Civil"
    )
    .required(),

  semester: Joi.number()
    .integer()
    .min(1)
    .max(8)
    .required()
 
}).required();

let studentLoginSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required(),
}).required();

module.exports = {studentSchema, studentLoginSchema, studentSchemaEdit, metaDataSchema};