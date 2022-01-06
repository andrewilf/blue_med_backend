const express = require("express");
require("dotenv").config();
const Patient = require("../models/patient");
const User = require("../models/user")
const router = express.Router();

//A unique controller that manipulates the user and corresponding patient objects in the database which are tightly linked. 
//Is for streamlining creating and deleting accounts for customers using the platforms, allows the frontend to just to 1 API call instead of the multiple which would be required thus saving time
//when referring to account, this means we are talking about both the user and corresponding patient object.
//POST routes==================================================================================================

//add one account via api
router.post("/", async (req, res) => {
    console.log(req.body.NRIC)
    const patientBody = {
        NRIC: req.body.NRIC,
        name: body.name,
        DOB: req.body.DOB,
        address: req.body.address,
        contactNumber: req.body.contactNumber,
        allergies: req.body.allergies,
        insuranceID: req.body.insuranceID,
        gender: req.body.gender,
        img: req.body.img,
        dependents: req.body.dependents,
    }
    const userBody = {
       email: req.body.email,
       password: req.body.password,
        role: "user",
    }
    console.log(patientBody, userBody)

    //create user object on db first

    //if no issues, create patient object on db

    //if any issues with patient found, delete the user object from the db and report an error
    
     //if no issues, link patient object id to user and link user object id to patient


   });

//DELETE routes==================================================================================================

   //may not be required, just commenting in case