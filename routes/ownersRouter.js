const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const {registerOwner,loginOwner} = require("../controllers/ownerAuthController")

router.get("/", (req, res) => {
  res.send("Hello");
});
router.get("/login", (req, res) => {
  res.render("ownerSignin",{messages:req.flash()})
});
router.get("/uploadproducts", (req, res) => {
  res.render("uploadProducts",{messages:req.flash()})
});



if (process.env.NODE_ENV === "development") {
  router.post("/register", registerOwner);
}

router.post("/login",loginOwner);



module.exports = router;
