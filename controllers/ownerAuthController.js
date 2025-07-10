const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const generateToken = require("../utils/generateToken");
const ownerModel = require("../models/owner-model");

module.exports.registerOwner = async (req, res) => {

  try {
    let { fullname, email, password } = req.body;
     let owners = await ownerModel.find();
    if (owners.length > 0){

        req.flash("error", "Owner already registered");
        return res.redirect("/owners/login");
        
    }
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        let createdOwner = await ownerModel.create({
          fullname,
          email,
          password: hash,
        });
        const token = jwt.sign(
          { email, id: createdOwner._id },
          process.env.JWT_SECRETKEY
        );
        res.cookie("Otoken", token);

        res.status(200).redirect("/products");
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.loginOwner = async (req, res) => {
  let { email, password } = req.body;

  let owner = await ownerModel.findOne({ email: email });

  if (!owner) {
    req.flash("error", "Email or Password Incorrect");
    return res.status(404).redirect("/owners/login");
  }

  bcrypt.compare(password, owner.password, (err, reasult) => {
    if (reasult) {
      const token = generateToken(owner);
      res.cookie("Otoken", token);
      res.status(200).redirect("/products");
    } else {
      req.flash("error", "Email or Password Incorrect");
      res.status(404).redirect("/owners/login");
    }
  });
};
