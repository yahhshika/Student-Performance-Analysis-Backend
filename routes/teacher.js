const express = require("express");
const router = express.Router();
const {teacherSignUpSchemaValidate, teacherLoginSchemaValidate} = require("../middlewares/teacher");
const bcrypt = require("bcrypt");
const asyncWrap = require("../utils/asyncWrap");
const Teacher = require("../models/teacher");
const jwt = require("jsonwebtoken");
const ExpressError = require("../utils/ExxpressError");
const Student = require("../models/student");
const {teacherSignUp, teacherLogin, teacherStudents,teachers} = require("../controllers/teacher");
const { authenticate, logout } = require("../controllers/authenticate");

router.get('/',authenticate,asyncWrap(teachers));

router.post("/signup",teacherSignUpSchemaValidate, asyncWrap(teacherSignUp));

router.post("/login",teacherLoginSchemaValidate,asyncWrap(teacherLogin));

router.get("/students",asyncWrap(teacherStudents));

router.get("/logout",authenticate,logout);


module.exports = router;