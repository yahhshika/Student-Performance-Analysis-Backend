const ExpressError = require("../utils/ExxpressError");
const jwt = require("jsonwebtoken");

module.exports.authenticate = (req,res,next)=>{
    let {token} = req.cookies;
    if(!token){
        throw new ExpressError(400, "Kindly login/signup")
        return;
    }
    try{

        let data = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.data = data;
        next();
    }catch(err){
        next(err);
    }
}
module.exports.logout = (req,res,next)=>{
    try{
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "none",   
            secure: true        
        });
        res.status(200).json({ message: "Logged out successfully" });
    }catch(err){
        throw new ExpressError(400, "Something went wrong");
    }
}