const express = require("express");
require("dotenv").config();
const Session = require("../models/session");
const User = require("../models/user");
const router = express.Router();
//const bcrypt = require("bcrypt");

//POST routes=================================================================================================

router.post("/", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const userAccountSearch = await User.find({ email: userEmail });
    const userAccount = userAccountSearch[0]
    console.log(userAccount)
    if (userAccount.length === 0) {
      console.log("email does not exist");
      res.status(400).send("error logging into account");
    } else if (
      //!bcrypt.compareSync(userPassword, userAccount.password)
      userPassword !== userAccount.password
      ) {
      console.log("password incorrect");
      res.status(400).send("error logging into account");
    } else {
      console.log("login successful, creating session");
      req.session.currentUser = userAccount;
      console.log("current user:", req.session.currentUser )
      res.send(req.session.currentUser);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("error when adding session");
  }
});

//DELETE routes===============================================================================================

router.delete("/", async (req, res) => {
  req.session.destroy(() => {
    res.send("deleted session");
  });
});

module.exports = router;
