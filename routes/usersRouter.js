const express = require("express");
const router = express.Router();
const {registerUser} = require("../controllers/authController");

router.get("/", (req, res) => {
  
  res.send("hello");

});

if (process.env.NODE_ENV === "development") {
  router.post("/register", registerUser);
}

module.exports = router;
