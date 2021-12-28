const express = require("express");
require("dotenv").config();
const pastAppointment = require("../models/past_appointment");
const router = express.Router();

//get routes

router.get("/all", async (req, res) => {
  const pastAppointmentAll = await pastAppointment.find({});
  console.log(pastAppointmentAll)
  //returns all past scheduled appointments 
  res.send(pastAppointmentAll);
});

module.exports = router;
