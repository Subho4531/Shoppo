const mongoose = require("mongoose");


mongoose.connect(process.env.MONGO_CONNECTION_STRING);

const productSchema = mongoose.Schema({
    image:String,
    name:String,
    price:Number,
    discount:{
        type:Number,
        default:0
    },
    panelColor:String,
    bgColor:String,
    textColor:String
})

module.exports= mongoose.model("product",productSchema);