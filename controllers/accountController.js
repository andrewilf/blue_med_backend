const express = require("express");
require("dotenv").config();
const Patient = require("../models/patient");
const User = require("../models/user");
const router = express.Router();
const bcrypt= require('bcryptjs')
//A unique controller that manipulates the user and corresponding patient objects in the database which are tightly linked.
//Is for streamlining creating and deleting accounts for customers using the platforms, allows the frontend to just to 1 API call instead of the multiple which would be required thus saving time
//when referring to account, this means we are talking about both the user and corresponding patient object.
//POST routes==================================================================================================

//add one account via api
router.post("/", async (req, res) => {
  const hash=await bcrypt.hash(req.body.password,10)
  console.log(req.body.NRIC);
  //console.log(hash)
  const patientBody = {
    NRIC: req.body.NRIC,
    name: req.body.name,
    DOB: req.body.DOB,
    address: req.body.address,
    contactNumber: req.body.contactNumber,
    allergies: req.body.allergies,
    insuranceID: req.body.insuranceID,
    gender: req.body.gender,
    img: req.body.img,
    dependents: req.body.dependents,
  };
  const userBody = {
    email: req.body.email,
    password: hash,
    role: "user",
  };
  console.log(patientBody, userBody);
  //create user object on db first
  try {
    const userCreate = await User.create(userBody);
    const newUserID = userCreate._id;
    //res.send(userCreate);
    try {
      const patientCreate = await Patient.create(req.body);
      const newPatientID = patientCreate._id;
      //res.send(patientCreate);
      try {
        //if no issues, link patient object id to user and link user object id to patient
        await User.updateOne({ _id: newUserID }, { patientID: newPatientID });
        await Patient.updateOne({ _id: newPatientID },{ userID: newUserID });
        res.send({
          userCreate,
          patientCreate,
        });
      } catch (error) {
        console.error(error);
        await User.deleteOne({ _id: newUserID });
        await Patient.deleteOne({ _id: newPatientID });
        res.status(400).send("error when assigning object id");
      }
    } catch (error) {
      //if any issues with patient found, delete the user object from the db and report an error
      await User.deleteOne({ _id: newUserID });
      console.error(error);
      res
        .status(400)
        .send("error when creating patient, bad input. User deleted");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("error when creating user, bad input");
  }
  //if no issues, create patient object on db
});

//DELETE routes==================================================================================================

//may not be required, just commenting in case

module.exports = router;
