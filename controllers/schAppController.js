const express = require("express");
require("dotenv").config();
const scheduledAppointment = require("../models/scheduled_appointment");
const pastAppointment = require("../models/past_appointment");
const doctor = require("../models/doctor");
const router = express.Router();

//GET
//all scheduled appointments
router.get("/all", async (req, res) => {
  const schAppAll = await scheduledAppointment.find({});
  res.send(schAppAll);
});

//all scheduled appointments and populated
router.get("/populated/all", async (req, res) => {
  const schAppAll = await scheduledAppointment
    .find({})
    .populate("doctor")
    .populate("patient");
  res.send(schAppAll);
});

//search for one scheduled appt by ID
router.get("/:schAppID", async (req, res) => {
  try {
    const schAppID = req.params.schAppID;
    console.log("search for scheduled appt by _id");
    const schAppGetOne = await scheduledAppointment.findOne({ _id: schAppID });
    if (schAppGetOne !== null) {
      res.send(schAppGetOne);
    } else {
      res.send(404).end("appointment not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("can't locate appointment, bad input");
  }
});

// get sch appointment by patient ID
router.get("/patients/:patientID", async (req, res) => {
  try {
    const patientID = req.params.patientID;
    console.log("search for schedule by userID");
    const getApp = await scheduledAppointment
      .find({ patient: patientID })
      .populate("doctor")
      .populate("patient");
    if (getApp != null) {
      res.send(getApp);
    } else {
      res.status(404).send("scheduled appointment not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("error occured when finding appointment");
  }
});

//search for one scheduled appt by ID and populated
router.get("/populated/:schAppID", async (req, res) => {
  try {
    const schAppID = req.params.schAppID;
    console.log("search for scheduled appt by _id");
    const schAppGetOne = await scheduledAppointment
      .findOne({ _id: schAppID })
      .populate("doctor")
      .populate("patient");
    if (schAppGetOne !== null) {
      res.send(schAppGetOne);
    } else {
      res.status(404).send("appointment not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("can't locate appointment, bad input");
  }
});

//search by fields
router.get(":/searchField/:searchValue", async (req, res) => {
  try {
    const searchField = req.params.searchField;
    const searchValue = req.params.searchValue;
    console.log(`search by field: ${searchField}`);
    const checkFieldExists = Object.keys(scheduledAppointment.Schema.tree).find(
      (element) => element === searchField
    );
    const schAppGet = await scheduledAppointment.find({
      [searchField]: searchValue,
    });
    if (schAppGet.length !== 0 && checkFieldExists) {
      res.send(schAppGet);
    } else if (!checkFieldExists) {
      res.status(400).send(`"${searchField}" is not a valid term`);
    } else {
      res.status(404).send(`no scheduled appointments were found for the term`);
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("error encountered on search for scheduled appointment");
  }
});

//POST
//creating one scheduled appointment
router.post("/", async (req, res) => {
  try {
    const schAppCreate = await scheduledAppointment.create(req.body);
    res.send(schAppCreate);
  } catch (err) {
    console.error(err);
    res.status(400).send("error encountered when adding scheduled appointment");
  }
});

//make one scheduled appointment become a past appointment. If successful, the scheduled appointment gets deleted
router.post("/promote/:schAppID", async (req, res) => {
  let schAppGetOne;
  let doctorPrice;
  const schAppID = req.params.schAppID;
  try {
    console.log("search for scheduled appt by _id");
    schAppGetOne = await scheduledAppointment.findOne({ _id: schAppID });
    if (schAppGetOne === null) {
      res
        .status(404)
        .send(
          "scheduled appointment not found, cannot promote to past appointment"
        );
    } else {
      doctorPrice = await doctor.findOne({ doctor: schAppGetOne.doctor });
      console.log(doctorPrice.pricing)
      console.log(schAppGetOne);
      const payload = {
        patient: schAppGetOne.patient,
        dependentNRIC: schAppGetOne.dependentNRIC,
        attendee: schAppGetOne.attendee,
        doctor: schAppGetOne.doctor,
        type: schAppGetOne.type,
        patientNotes: schAppGetOne.patientNotes,
        doctorNotes: req.body.doctorNotes,
        appTime: schAppGetOne.appTime,
        cost: doctorPrice.pricing,
        paid: false,
        medicationDelivery: "pending",
        altDeliveryAddress: req.body.altDeliveryAddress,
      };
      try {
        const schAppCreate = await pastAppointment.create(payload);
        if (schAppCreate !== null) {
          try {
            const schAppDel = await scheduledAppointment.deleteOne({
              _id: schAppID,
            });
            if (schAppDel.deletedCount !== 0) {
              res.send(schAppCreate);
            } else {
              res
                .status(404)
                .send(
                  "Failed to delete: no appointments were found with that id"
                );
            }
          } catch (err) {
            console.error(err);
            res.status(400).send("failed to delete, bad input");
          }
        }
      } catch (err) {
        console.error(err);
        res
          .status(400)
          .send("error encountered when creating past appointment");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("cannot locate appointment, bad input");
  }
});

//PUT
//updating scheduled app by ID

router.put(":/schAppID", async (req, res) => {
  console.log("update patient recordin via _id");

  try {
    const filterID = { _id: req.params.schAppID };
    const update = req.body;
    const schAppFind = await scheduledAppointment.findOne(filterID);
    if (schAppFind !== null) {
      const schAppUpdated = await scheduledAppointment.updateOne(
        filterID,
        update
      );
      res.send(schAppUpdated);
    } else {
      res.status(404).send("No appointments were found");
    }
  } catch (error) {
    console.log(error);
    res.send(400).send("update failed, bad input");
  }
});

//DELETE

//delete all scheduled appointments
router.delete("/all", async (req, res) => {
  const schAppDeleted = await scheduledAppointment.deleteMany({});
  res.send(schAppDeleted);
});

//delete one by ID
router.delete("/:schAppID", async (req, res) => {
  try {
    const schAppID = req.params.schAppID;
    const schAppDel = await scheduledAppointment.deleteOne({ _id: schAppID });
    if (schAppDel.deletedCount !== 0) {
      res.send(schAppDel);
    } else {
      res
        .status(404)
        .send("Failed to delete: no appointments were found with that id");
    }
  } catch (err) {
    console.error(err);
    res.status(400).send("failed to delete, bad input");
  }
});
module.exports = router;
