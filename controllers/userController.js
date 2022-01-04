const express = require("express");
require("dotenv").config();
const User = require("../models/user");
const router = express.Router();

///GET routes==================================================================================================

router.get("/all", async (req, res) => {
    console.log("get all users");
    const userAll = await User.find({});
    //returns all users, should be an array of objects
    res.send(userAll);
  });
  
  router.get("/", async (req, res) => {
    //search multiple users by body
    try {
      console.log(`search by req.body object`);
      const usersGet = await User.find(req.body);
      if (usersGet.length !== 0) {
        //return valid response, should be an array of objects
        res.send(usersGet);
      } else {
        //No user was found
        res.status(404).send(`no users were found`);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("error when finding user");
    }
  });
  
  router.get("/:userID", async (req, res) => {
    //searc for one user by _id
    try {
      const userID = req.params.userID;
      console.log("search for user by _id");
      const userGetOne = await User.findOne({ _id: userID });
      if (userGetOne !== null) {
        //returns one object
        res.send(userGetOne);
      } else {
        //_id was of the correct format but no user was found
        res.status(404).send("user not found");
      }
    } catch (error) {
      //likely the userID was not a string of 12 bytes or a string of 24 hex characters
      console.error(error);
      res.status(400).send("error when finding user, bad input");
    }
  });
  
  router.get("/:searchField/:searchValue", async (req, res) => {
    //search multiple users by defined field
    try {
      const searchField = req.params.searchField;
      const searchValue = req.params.searchValue;
      console.log(`search by field: ${searchField}`);
      const checkFieldExists = Object.keys(User.schema.tree).find(
        //checks if the searchField is a valid field for the model
        (element) => element === searchField
      );
      const usersGet = await User.find({ [searchField]: searchValue });
      if (usersGet.length !== 0 && checkFieldExists) {
        //return valid response, should be an array of objects
        res.send(usersGet);
      } else if (!checkFieldExists) {
        //searchField is not valid
        res.status(400).send(`"${searchField}" is not a valid field`);
      } else {
        //user field exists but no user was found
        res
          .status(404)
          .send(`no users were found for the field: ${searchField}`);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("error when finding user");
    }
  });
  
  //POST routes=================================================================================================
  
  router.post("/", async (req, res) => {
    try {
      //create one user
      const userCreate = await User.create(req.body);
      res.send(userCreate);
    } catch (error) {
      console.error(error);
      res.status(400).send("error when adding user, bad input");
    }
  });
  
  router.post("/sample", async (req, res) => {
    //create a sample user
    const sampleData = {
      email: "aaa@aaa.com",
      password: "asdasd1",
      role: "patient",
      patientID: "507f191e810c19729de860ea",
    };
    try {
      const userCreate = await User.create(sampleData);
      res.send(userCreate);
    } catch (error) {
      console.error(error);
      res.status(400).send("error when adding user, bad input");
    }
  });
  
  //PUT routes==================================================================================================
  
  router.put("/:userID", async (req, res) => {
    //update one user by _id
    console.log("updating one user, find via _id");
  
    try {
      const filterID = { _id: req.params.userID };
      const update = req.body;
      const userFind = await User.findOne(filterID);
      if (userFind !== null) {
        //found the user via _id
        const userUpdated = await User.updateOne(filterID, update);
        res.send(userUpdated);
      } else {
        //if user not found, send 404 status
        res.status(404).send("No users were found with that _id");
      }
    } catch (error) {
      console.error(error);
      //likely the userID was not a string of 12 bytes or a string of 24 hex characters
      res.status(400).send("error when updating user, bad input");
    }
  });
  
  //maybe have an upsert put? Potentially could also have a mass update path if needed, searches by one field, updates according to req.body
  
  //DELETE routes===============================================================================================
  
  router.delete("/all", async (req, res) => {
    //delete all users, use carefully
    try {
      const usersDelete = await User.deleteMany({});
      if (usersDelete.deletedCount !== 0) {
        res.send(usersDelete);
      } else {
        res.status(404).send("No users were found in the db, deletedCount: 0");
      }
    } catch (error) {
      console.error(error);
      res.status(400).send("error when deleting users, bad input");
    }
  });
  
  router.delete("/:userID", async (req, res) => {
    //delete one user by _id
  
    try {
      const userID = req.params.userID;
      const userDelete = await User.deleteOne({ _id: userID });
      if (userDelete.deletedCount !== 0) {
        res.send(userDelete);
      } else {
        res
          .status(404)
          .send("No users were found with that id, deletedCount: 0");
      }
    } catch (error) {
      console.error(error);
      res.status(400).send("error when deleting user, bad input");
    }
  });
  

//need to make unique routes which interact with the User and Patient collection for creating and deleting users

module.exports = router;
