const express = require("express");
const router = express.Router();
const {registerUser,loginUser} = require("../controllers/authController");
const checkLogin = require("../middlewares/checkLogin");

router.get("/", (req, res) => {
  
  res.render("signin",{messages:req.flash()});

});

if (process.env.NODE_ENV === "development") {
  router.post("/register",registerUser);
  router.post("/login",loginUser);
  
}

module.exports = router;
