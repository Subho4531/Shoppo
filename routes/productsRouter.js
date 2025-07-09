const express = require("express");
const checkLogin = require("../middlewares/checkLogin");

const router = express.Router();

router.get("/",checkLogin,(req,res)=>{
    res.render("products");
})


module.exports=router;