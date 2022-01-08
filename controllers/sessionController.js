const express = require("express");
require("dotenv").config();
const Session = require("../models/session");
const User = require("../models/user");
const router = express.Router();

///GET routes==================================================================================================

router.get("/all", async (req, res) => {
  console.log("get all sessions");
  const sessionAll = await Session.find({});
  //returns all sessions, should be an array of objects
  res.send(sessionAll);
});

router.get("/:sessionID", async (req, res) => {
  //search for one session by _id
  try {
    const sessionID = req.params.sessionID;
    console.log("search for session by _id");
    const sessionGetOne = await Session.findOne({ _id: sessionID });
    if (sessionGetOne !== null) {
      //returns one object
      res.send(sessionGetOne);
    } else {
      //_id was of the correct format but no session was found
      res.status(404).send("session not found");
    }
  } catch (error) {
    //likely the sessionID was not a string of 12 bytes or a string of 24 hex characters
    console.error(error);
    res.status(400).send("error when finding session, bad input");
  }
});

//POST routes=================================================================================================

router.post("/", async (req, res) => {
  try {
    //create one session, in other words login
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const userAccount = await User.findOne({ email: userEmail });
    if (userAccount.length === 0) {
      console.log("email does not exist");
      res.status(400).send("error logging into account");
    } else if (userPassword !== userAccount.password) {
      console.log("password incorrect");
      res.status(400).send("error logging into account");
    } else {
      console.log("login successful, creating session");
      const sessionCreate = await Session.create({ userID: userAccount._id });
      res.send(sessionCreate);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("error when adding session");
  }
});

//DELETE routes===============================================================================================

router.delete("/all", async (req, res) => {
  //delete all sessions, use carefully
  try {
    const sessionsDelete = await Session.deleteMany({});
    if (sessionDelete.deletedCount !== 0) {
      res.send(sessionsDelete);
    } else {
      res.status(404).send("No sessions were found in the db, deletedCount: 0");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("error when deleting sessions, bad input");
  }
});

router.delete("/:sessionID", async (req, res) => {
  //delete one session by _id

  try {
    const sessionID = req.params.sessionID;
    const sessionDelete = await Session.deleteOne({ _id: sessionID });
    if (sessionDelete.deletedCount !== 0) {
      res.send(sessionDelete);
    } else {
      res
        .status(404)
        .send("No sessions were found with that id, deletedCount: 0");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("error when deleting sessions, bad input");
  }
});

module.exports = router;
