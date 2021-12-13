const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  nric: {           //required to id the patient
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  allergies: [
    {
      type: String,
    },
  ],
  insuranceID: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  dependents: [     //mainly for Paediatrics
    {
      nric: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      relation: {
          type: String,
          required: true
      },
      DOB: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      allergies: [
        {
          type: String,
        },
      ],
      insuranceID: {
        type: String,
      },
      gender: {
        type: String,
        required: true,
      },
      img: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Patient", PatientSchema);
