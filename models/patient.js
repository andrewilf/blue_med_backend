const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema(
  {
    NRIC: {
      //required to id the patient
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      //used for patient login
      type: String,
      required: true,
    },
    password: {
      //hashed password string
      type: String,
      required: true,
    },
    DOB: {
      //use format DD/MM/yyyy. type string as easy to parse to date format, saving as date will include timestamp
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
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
      //temporary use a placeholder image. Look into storing actual images in db as a stretch goal
      type: String,
    },
    dependents: [
      //mainly for Paediatrics
      {
        NRIC: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        relation: {
          type: String,
          required: true,
        },
        DOB: {
          //use format DD/MM/yyyy. type string as easy to parse to date format, saving as date will include timestamp
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Patient", PatientSchema);
