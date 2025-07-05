const express = require("express");

const router = express.Router();

const ownerModel = require("../models/owner-model");



router.get("/",(req,res)=>{
    res.send("Hello")
})


if(process.env.NODE_ENV === "development"){
    router.post("/create",async(req,res)=>{
        let owners = await ownerModel.find();
        if(owners.length > 0) res.status(403).send("You dont have permission to create a new owner");

        let {fullname,email,password}= req.body;

        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password
        })
        
        res.status(200).send(createdOwner);


        });
};





module.exports=router;

