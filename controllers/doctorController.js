const express = require("express");
require("dotenv").config();
const Doctor = require("../models/doctor");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("get all doctors");
  const doctorAll = await Doctor.find({});
  res.send(doctorAll);
});

//GET routes==================================================================================================

router.get("/:doctorID", async (req, res) => {
  //searc for one doctor by _id
  try {
    const doctorID = req.params.doctorID;
    console.log("search for doctor by _id");
    const doctorGetOne = await Doctor.findOne({ _id: doctorID });
    if (doctorGetOne !== null) {
      res.send(doctorGetOne);
    } else {
      //_id was of the correct format but no doctor was found
      res.status(404).send("doctor not found");
    }
  } catch (error) {
    //likely the doctorID was not a string of 12 bytes or a string of 24 hex characters
    console.error(error);
    res.status(400).send("error when finding doctor, bad input");
  }
});

router.get("/:searchField/:searchValue", async (req, res) => {
  //search multiple doctors by defined field
  try {
    const searchField = req.params.searchField;
    const searchValue = req.params.searchValue;
    console.log(`search by field: ${searchField}`);
    const checkFieldExists = Object.keys(Doctor.schema.tree).find(
      //checks if the searchField is a valid field for the model
      (element) => element === searchField
    );
    const doctorsGet = await Doctor.find({ [searchField]: searchValue });
    if (doctorsGet.length !== 0 && checkFieldExists) {
      //return valid response
      res.send(doctorsGet);
    } else if (!checkFieldExists) {
      //searchField is not valid
      res.status(400).send(`"${searchField}" is not a valid field`);
    } else {
      //doctor field exists but no doctor was found
      res
        .status(404)
        .send(`no doctors were found for the field: ${searchField}`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("error when finding doctor");
  }
});

//maybe have routes to search if a session price should be greater than, less than, between

// router.get("/priceGreater/:greaterThanValue", async (req, res) => {});

// router.get("/priceLower/:lessThanValue", async (req, res) => {});

// router.get("/priceBetween/:minValue/:maxValue", async (req, res) => {});

//POST routes=================================================================================================

router.post("/", async (req, res) => {
  try {
    //create one doctor
    const doctorCreate = await Doctor.create(req.body);
    res.send(doctorCreate);
  } catch (error) {
    console.error(error);
    res.status(400).send("error when adding doctor, bad input");
  }
});

router.post("/sample", async (req, res) => {
  //create a sample doctor
  const sampleData = {
    name: "doctor girl",
    profession: "paedeatrics",
    languages: ["english", "hokkien"],
    bio: "is also very good",
    pricing: 101,
    email: "email2@email.com",
    password: "asd12dsa212a123",
    gender: "female",
    img: "fakeurl.com",
  };
  try {
    const doctorCreate = await Doctor.create(sampleData);
    res.send(doctorCreate);
  } catch (error) {
    console.error(error);
    res.status(400).send("error when adding doctor, bad input");
  }
});

//PUT routes==================================================================================================

//DELETE routes===============================================================================================

router.delete("/:doctorID", async (req, res) => {
  //delete one doctor by _id
  const doctorID = req.params.doctorID;
  try {
    const doctorDelete = await Doctor.deleteOne({ _id: doctorID });
    if (doctorDelete.deletedCount !== 0) {
      res.send(doctorDelete);
    } else {
      res
        .status(404)
        .send("No doctors were found with that id, deletedCount: 0");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("error when deleting doctor, bad input");
  }
});

module.exports = router;
