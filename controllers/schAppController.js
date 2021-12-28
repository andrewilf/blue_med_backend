const express = require("express");
require("dotenv").config();
const scheduledAppointment = require("../models/scheduled_appointment");
const router = express.Router();

//get routes
//get all scheduled appts
router.get("/", async (req, res) => {
  const schApptsAll = await scheduledAppointment.find({});
  console.log(schApptsAll)
  res.send(schApptsAll);
});

//sample scheduled appts
router.post('/sample', async (req, res) => {
  const apptData = {
    patient: 'John Doe', 
    appTime: '11/11/2022', 
    doctor: 'Danel Gan', 
    type: 'GP', 
    patientNotes: 'NA', 
    zoomLink: 'www.zoom.com', 
  }; 

  try {
    const scheduleAdd = await scheduledAppointment.create(apptData); 
    res.send(scheduleAdd); 
  } catch (error) {
    console.error(error)
    res.status(404).send('appointment not found!')
  }
})

//add one appointment via api 
router.post("/", async (req, res) => {
  console.log(req.body)
  try {
    const addAppt = await scheduledAppointment.create(req.body); 
    res.send(addAppt); 
  } catch (error) {
    console.error(error) 
    res.status(400).send('error in executing request')
  }
})

//delete routes
//delete appointment - currently tied to an appointmentID, may need to be added into schema
router.delete ('/:appointmentID', async (req, res) => {

  try {
    const apptDelete = await scheduledAppointment.deleteOne({_id: appointmentID})
    if (apptDelete.deletedCount !==0) {
      res.send(apptDelete); 
    } else {
      res
        .status(404)
        .send('No doctors were found with that id, deletedCount: 0')
    }
  } catch (error) {
    console.error(error); 
    res.status(400).send('error when deleting appointment, bad input');
  }
})
module.exports = router;
