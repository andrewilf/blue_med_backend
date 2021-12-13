const express = require("express");
require("dotenv").config();
const Patient = require("../models/patient");
const router = express.Router();

//get all
router.get("/", async (req, res) => {
  const PatientAll = await Patient.find({});
  res.send(PatientAll);
});

//add one sample user
router.post("/sample", async (req, res) => {
  const addData = {
    NRIC: "S1001101",
    name: "Smith Max",
    email: "smith@email.com",
    password: "asdi1ninsida1",
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
    console.error(error)
    res.status(400).send("error in executing request");
  }
});

//add one user via api
router.post("/", async (req, res) => {
  console.log(req.body)
  try {
    const PatientAdd = await Patient.create(req.body);
    res.send(PatientAdd);
  } catch (error) {
    console.error(error)
    res.status(400).send("error in executing request");
  }
});

//delete all, use carefully
router.delete("/all", async (req, res) => {
  const PatientDeleted = await Patient.deleteMany({});
  res.send(PatientDeleted);
});

module.exports = router;
