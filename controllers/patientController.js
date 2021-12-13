const express = require("express");
require("dotenv").config();
const Patient = require("../models/patient");
const router = express.Router();

router.get("/", async (req, res) => {
  const PatientAll = await Patient.find({});
  //console.log(allScientists)
  res.send(PatientAll);
});

// router.post("/", async (req, res) => {
//     const PatientAll = await Patient.create({

//     });
//     //console.log(allScientists)
//     res.send(PatientAll);
//   });
module.exports = router;
