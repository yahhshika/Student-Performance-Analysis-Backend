const express= require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {studentSchemaValidation, studentSchemaValidationLogin, studentSchemaValidationEdit} = require("../middlewares/student");
const Student = require("../models/student");
const ExpressError = require("../utils/ExxpressError");
const {studentSignUp, studentLogIn, studentEdit, authenticateRouteHandling} = require("../controllers/student")
const asyncWrap = require("../utils/asyncWrap");
const {authenticate, logout} = require("../controllers/authenticate");
router.post("/signup",studentSchemaValidation, asyncWrap(studentSignUp));

router.post("/login",studentSchemaValidationLogin, asyncWrap(studentLogIn));

router.put("/",authenticate,studentSchemaValidationEdit, asyncWrap(studentEdit));

router.get("/authenticate",authenticate, asyncWrap(authenticateRouteHandling));

router.get("/logout",authenticate, logout);

module.exports  = router;