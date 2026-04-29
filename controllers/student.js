const ExpressError = require("../utils/ExxpressError");
const jwt = require("jsonwebtoken")
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