const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const generateToken = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists with this email");
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        let createdUser = await userModel.create({
          fullname,
          email,
          password: hash,
        });
        const token = jwt.sign(
          { email, id: createdUser._id },
          process.env.JWT_SECRETKEY
        );
        res.cookie("token", token);

        res.status(200).send(createdUser);
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.loginUser = async (req,res) =>{
    let {email,password} = req.body;

    let user = userModel.findOne({email:email});

    if(!user){
        return res.send("User Doesn't Exists")
    }

    bcrypt.compare(password , user.password, (err,reasult)=>{
        if(reasult){
           generateToken(user);
        }
    })
}
