const express = require("express");
require("dotenv").config();
const pastAppointment = require("../models/past_appointment");
const User = require('../models/user')
const router = express.Router();

//POST 
//create a pastAppointment
router.post('/', async (req, res) => {
  try {
    const pastAppCreate = await pastAppointment.create(req.body); 
    res.send(pastAppCreate); 
  } catch (error) {
    console.error(error); 
    res.status(400).send('error occurred, bad input')
  }
});

//GET
//Getting all past apoointments
router.get("/all", async (req, res) => {
  const pastAppointmentAll = await pastAppointment.find({});
  console.log(pastAppointmentAll)
  //returns all past scheduled appointments 
  res.send(pastAppointmentAll);
});

//getting specific past appointment by ID
router.get('/:appID', async (req, res) => {
  try {
    const appID = req.params.appID; 
    console.log('searched for schedule by ID'); 
    const getApp = await pastAppointment.findOne({_id: appID}); 
    if (getApp != null) {
      res.send(getApp);
    } else {
      res.status(404).send('past appointment not found'); 
    }
  } catch (error) {
    console.error(error); 
    res.status(500).send('error occured when finding appointment')
  }
})

//getting specific past appointment by ID and populated
router.get('/populated/:appID', async (req, res) => {
  try {
    const appID = req.params.appID; 
    console.log('searched for schedule by ID'); 
    const getApp = await pastAppointment.findOne({_id: appID}).populate('doctor').populate('patient'); 
    if (getApp != null) {
      res.send(getApp);
    } else {
      res.status(404).send('past appointment not found'); 
    }
  } catch (error) {
    console.error(error); 
    res.status(500).send('error occured when finding appointment')
  }
})

// get past appointment by patient ID

router.get('/patients/:patientID', async (req, res) => {
  try {
    const patientID = req.params.patientID; 
    console.log('search for schedule by userID'); 

    const getApp = await pastAppointment.find({patient: patientID}).populate('doctor').populate('patient');
    if (getApp != null) {
      res.send(getApp);
    } else {
      res.status(404).send('past appointment not found'); 
    }
  } catch (err) {
    console.error(err); 
    res.status(500).send('error occured when finding appointment')
  }
})

//PUT
router.put("/:appID", async (req, res) => {
  //update the past appointment 
  console.log('update one past appointment, located by id'); 

  try {
    const filterID = {_id: req.params.appID};
    const update = req.body; 
    const pastAppFind = await pastAppointment.findOne(filterID);
    if (pastAppFind !== null) {
      const pastAppUpdated = await pastAppointment.updateOne(filterID, update);
      res.send(pastAppUpdated)
    } else {
      //if app not found, send 404 status
      res.status(404).send('No past appointment was found'); 
    }
  } catch (error) {
    console.error(error); 
    res.status(500).send('error occured when updating appointment, bad input')
  }
}) 

//DELETE
//deleting one pastAppointment
router.delete('/:pastAppID', async (req, res) => {
  try {
    const pastAppID = req.params.appID; 
    const pastAppDel = await pastAppointment.deleteOne({_id: pastAppID});
    if (pastAppDel.deletedCount !== 0) {
      res.send(pastAppDel); 
    } else {
      res
        .status(404)
        .send('No past App was found with that ID'); 
    }
  } catch (error) {
    console.error(error); 
    res.status(400).send('error occur when deleting appointment, bad input')
  }
})

//deleting all past appointments 
router.delete("/all", async (req,res) => {
  try {
    const allPastAppDel = await pastAppointment.deleteMany([]); 
    if (allPastAppDel.deletedCount !== 0) {
      res.send(allPastAppDel)
    } else {
      res.status(404).send('no past appointments found, delete failed')
    }
  } catch (error) {
    console.error(error); 
    res.status(400).send('unable to delete, bad input')
  }
});

module.exports = router;
