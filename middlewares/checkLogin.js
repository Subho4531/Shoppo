const cookieParser = require("cookie-parser");
const { verify } = require("jsonwebtoken");
const userModel = require("../models/user-model");


module.exports = async (req,res,next)=>{
if(!req.cookies.token){
    req.flash("error","You need to login first");
    return res.redirect("/users")
}else{

    
    try{
        let decoded  = verify(req.cookies.token , process.env.JWT_SECRETKEY);
        let user = await userModel.findOne({email:decoded.email});
        req.user = user
        next();
    }
    catch{
        req.flash("error","You need to login first");
        return res.redirect("/users/register")
    }
}
}