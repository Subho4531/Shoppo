

const mongoose = require("mongoose");

const debug = require("debug")("development:mongoose");

const config = require("config");

mongoose.connect(config.get("MONGODB_URI"))
.then(()=>{
    debug("Connected");
}).catch((err)=>{
    debug("Error !",err)
});



module.exports=mongoose.connection;