const express = require("express");
require("dotenv").config();
const Patient = require("../models/patient");
const router = express.Router();

//GET routes==================================================================================================

router.get("/all", async (req, res) => {
  console.log("get all patients");
  const patientAll = await Patient.find({});
  //returns all patients, should be an array of objects
  res.send(patientAll);
});


router.get("/:patientID", async (req, res) => {
  //search for one patient by _id
  try {
    const patientID = req.params.patientID;
    console.log("search for patient by _id");
    const patientGetOne = await Doctor.findOne({ _id: patientID });
    if (patientGetOne !== null) {
      //returns one object
      res.send(patientGetOne);
    } else {
      //_id was of the correct format but no patient was found
      res.status(404).send("patient not found");
    }
  } catch (error) {
    //likely the patientID was not a string of 12 bytes or a string of 24 hex characters
    console.error(error);
    res.status(400).send("error when finding patient, bad input");
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
      //return valid response, should be an array of objects
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



router.put("/:doctorID", async (req, res) => {
  //update one doctor by _id
  console.log("updating one doctor, find via _id");

  try {
    const filterID = { _id: req.params.doctorID };
    const update = req.body;
    const doctorFind = await Doctor.findOne(filterID);
    if (doctorFind !== null) {
      //found the doctor via _id
      const doctorUpdated = await Doctor.updateOne(filterID, update);
      res.send(doctorUpdated);
    } else {
      //if doctor not found, send 404 status
      res.status(404).send("No doctors were found with that _id");
    }
  } catch (error) {
    console.error(error);
    //likely the doctorID was not a string of 12 bytes or a string of 24 hex characters
    res.status(400).send("error when updating doctor, bad input");
  }
});

//maybe have an upsert put? Potentially could also have a mass update path if needed, searches by one field, updates according to req.body

//DELETE routes===============================================================================================

router.delete("/all", async (req, res) => {
  //delete all doctors, use carefully
  try {
    const doctorsDelete = await Doctor.deleteMany({});
    if (doctorsDelete.deletedCount !== 0) {
      res.send(doctorsDelete);
    } else {
      res.status(404).send("No doctors were found in the db, deletedCount: 0");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("error when deleting doctor, bad input");
  }
});

router.delete("/:doctorID", async (req, res) => {
  //delete one doctor by _id

  try {
    const doctorID = req.params.doctorID;
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




// const express = require("express");
// require("dotenv").config();
// const Patient = require("../models/patient");
// const router = express.Router();

// //get all
// router.get("/", async (req, res) => {
//   const PatientAll = await Patient.find({});
//   res.send(PatientAll);
// });

// //add one sample user
// router.post("/sample", async (req, res) => {
//   const addData = {
//     NRIC: "S1001101",
//     name: "Smith Max",
//     email: "smith@email.com",
//     password: "asdi1ninsida1",
//     DOB: "11/11/1990",
//     address: "10 address road",
//     contactNumber: 91101101,
//     allergies: ["peanuts", "othernuts"],
//     insuranceID: "O1as819ss",
//     gender: "Male",
//     img: "http://fakeurl.com",
//     dependents: [
//       {
//         NRIC: "S10021201",
//         name: "Jack Max",
//         relation: "son",
//         DOB: "11/11/2010",
//         address: "10 address road",
//         allergies: ["peanuts", "othernuts"],
//         insuranceID: "O1as819ss",
//         gender: "Male",
//         img: "http://fakeurl.com",
//       },
//       {
//         NRIC: "S10331201",
//         name: "Grace Max",
//         relation: "daughter",
//         DOB: "11/11/2010",
//         address: "10 address road",
//         allergies: ["peanuts", "othernuts"],
//         insuranceID: "O1as819ss",
//         gender: "Female",
//         img: "http://fakeurl.com",
//       },
//     ],
//   };
//   try {
//     const PatientAdd = await Patient.create(addData);
//     res.send(PatientAdd);
//   } catch (error) {
//     console.error(error)
//     res.status(400).send("error in executing request");
//   }
// });

// //add one user via api
// router.post("/", async (req, res) => {
//   console.log(req.body)
//   try {
//     const PatientAdd = await Patient.create(req.body);
//     res.send(PatientAdd);
//   } catch (error) {
//     console.error(error)
//     res.status(400).send("error in executing request");
//   }
// });

// //delete all, use carefully
// router.delete("/all", async (req, res) => {
//   const PatientDeleted = await Patient.deleteMany({});
//   res.send(PatientDeleted);
// });

// module.exports = router;
