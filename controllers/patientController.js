const express = require("express");
require("dotenv").config();
const Patient = require("../models/patient");
const router = express.Router();

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.status(401).send("Not logged in");
  }
};
const isAdmin = (req, res, next) => {
  if (req.session.currentUser.role  === "admin") {
    return next();
  } else {
    res.status(401).send("Not admin");
  }
};

//GET
//all patients
router.get("/all", [isAuthenticated, isAdmin], async (req, res) => {
  const PatientAll = await Patient.find({});
  res.send(PatientAll);
});

//searching one patient by ID
router.get("/:patientID", async (req, res) => {
  try {
    const patientID = req.params.patientID;
    console.log("search for patient by _id");
    const patientGetOne = await Patient.findOne({ _id: patientID });
    if (patientGetOne !== null) {
      res.send(patientGetOne);
    } else {
      res.status(404).send("patient not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("cant find patient, bad input");
  }
});

//searching one patient by ID, with populated field
router.get("/populated/:patientID", async (req, res) => {
  try {
    const patientID = req.params.patientID;
    console.log("search for patient by _id");
    const patientGetOne = await Patient.findOne({ _id: patientID }).populate('userID');
    if (patientGetOne !== null) {
      res.send(patientGetOne);
    } else {
      res.status(404).send("patient not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("cant find patient, bad input");
  }
});

//search by various fields
router.get("/:searchField/:searchValue", async (req, res) => {
  try {
    const searchField = req.params.searchField;
    const searchValue = req.params.searchValue;
    console.log(`search by field: ${searchField}`);
    const checkFieldExists = Object.keys(Patient.schema.tree).find(
      (element) => element === searchField
    );
    const patientGet = await Patient.find({ [searchField]: searchValue });
    if (patientGet.length !== 0 && checkFieldExists) {
      //return response
      res.send(patientGet);
    } else if (!checkFieldExists) {
      //invalid
      res.status(400).send(`"${searchField}" is not a valid field`);
    } else {
      res
        .status(404)
        .send(`no patient records was found for the term: ${searchField}`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("error when finding patient");
  }
});

//POST
//creating one patient data
router.post("/", async (req, res) => {
  try {
    const patientCreate = await Patient.create(req.body);
    res.send(patientCreate);
  } catch (error) {
    console.error(error);
    res.status(400).send("error when adding patient, bad input");
  }
});

//add one sample patient
router.post("/sample", async (req, res) => {
  const addData = {
    NRIC: "S1001101",
    name: "Smith Max",
    DOB: "11/11/1990",
    address: "10 address road",
    contactNumber: 91101101,
    allergies: ["peanuts", "othernuts"],
    insuranceID: "O1as819ss",
    gender: "Male",
    img: "http://fakeurl.com",
    dependents: [
      {
        NRIC: "S10021201",
        name: "Jack Max",
        relation: "son",
        DOB: "11/11/2010",
        address: "10 address road",
        allergies: ["peanuts", "othernuts"],
        insuranceID: "O1as819ss",
        gender: "Male",
        img: "http://fakeurl.com",
      },
      {
        NRIC: "S10331201",
        name: "Grace Max",
        relation: "daughter",
        DOB: "11/11/2010",
        address: "10 address road",
        allergies: ["peanuts", "othernuts"],
        insuranceID: "O1as819ss",
        gender: "Female",
        img: "http://fakeurl.com",
      },
    ],
  };
  try {
    const PatientAdd = await Patient.create(addData);
    res.send(PatientAdd);
  } catch (error) {
    console.error(error);
    res.status(400).send("error in executing request");
  }
});

//PUT
//Updating patient record by ID

router.put("/:patientID", async (req, res) => {
  console.log("updating patient record, find via _id");

  try {
    const filterID = { _id: req.params.patientID };
    const update = req.body;
    const patientFind = await Patient.findOne(filterID);
    if (patientFind !== null) {
      //patient record located via _id
      const patientUpdated = await Patient.updateOne(filterID, update);
      res.send(patientUpdated);
    } else {
      //record not found
      res.status(404).send("No patient records were found with that _id");
    }
  } catch (error) {
    console.error(error);
    res.send(400).send("failed to update, bad input");
  }
});

//DELETE

//delete all patient records
router.delete("/all", async (req, res) => {
  const PatientDeleted = await Patient.deleteMany({});
  res.send(PatientDeleted);
});

//delete patient by ID
router.delete("/:patientID", async (req, res) => {
  try {
    const patientID = req.params.patientID;
    const patientDelete = await Patient.deleteOne({ _id: patientID });
    if (patientDelete.deletedCount !== 0) {
      res.send(patientDelete);
    } else {
      res
        .status(404)
        .send("no patients were found with that id, deletedCount: 0");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("delete failed, bad input");
  }
});

module.exports = router;
