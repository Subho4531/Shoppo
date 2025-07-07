require('dotenv').config();

const express = require("express");
const app = express();
const path = require("path");
const cookieParser=require("cookie-parser");
const flash  = require("connect-flash");
const session = require("express-session")



const db= require("./config/mongoose-connection");
const userModel = require("./models/user-model");


const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");



app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(session({
  secret: process.env.EXPRESS_SESSION,
  resave: false,
  saveUninitialized: false,
}))
app.use(flash());
app.use(cookieParser());

app.use("/owners",ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productsRouter);


app.listen(3000);