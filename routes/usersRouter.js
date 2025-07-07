const express = require("express");
const router = express.Router();
const {registerUser,loginUser} = require("../controllers/authController");
const checkLogin = require("../middlewares/checkLogin");

router.get("/", (req, res) => {
  
  res.render("signin");

});

if (process.env.NODE_ENV === "development") {
  router.post("/register",checkLogin,registerUser);
  router.post("/login",checkLogin,loginUser);
  
}

module.exports = router;
