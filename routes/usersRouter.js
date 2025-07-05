const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("Hello");
});

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let { fullname, email, password } = req.body;

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        let createdUser = await userModel.create({
          fullname,
          email,
          password: hash,
        });
        
        res.status(200).send(createdUser);
      });
    });
  });
}

module.exports = router;
