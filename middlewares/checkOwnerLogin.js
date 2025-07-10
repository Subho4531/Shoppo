const cookieParser = require("cookie-parser");
const { verify } = require("jsonwebtoken");
const ownerModel = require("../models/owner-model");



module.exports = async (req,res,next)=>{
if(!req.cookies.token){
    req.flash("error","You need to login first");
    return res.redirect("/users")
}else{

    
    try{
        let decoded  = verify(req.cookies.token , process.env.JWT_SECRETKEY);
        let owner = await ownerModel.findOne({email:decoded.email});
        req.owner = owner
        next();
    }
    catch{
        req.flash("error","You need to login first");
        return res.redirect("/owners/login")
    }
}
}