const express = require("express");
const router = express.Router();
const {teacherSignUpSchemaValidate, teacherLoginSchemaValidate, isLoggedIn} = require("../middlewares/teacher");
const bcrypt = require("bcrypt");
const asyncWrap = require("../utils/asyncWrap");
const Teacher = require("../models/teacher");
const jwt = require("jsonwebtoken");
const ExpressError = require("../utils/ExxpressError");
const Student = require("../models/student");
const {teacherSignUp, teacherLogin, teacherStudents} = require("../controllers/teacher")
router.post("/signup",teacherSignUpSchemaValidate, asyncWrap(teacherSignUp))

router.post("/login",teacherLoginSchemaValidate,asyncWrap(teacherLogin))

router.get("/students",isLoggedIn,asyncWrap(teacherStudents))


module.exports = router;