const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchAppSchema = new Schema(
  {
    patient: {
      //patient _id from patient collection
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    dependentNRIC: {
      //optional field. if appointment is for a dependent, their NRIC number is here, if not field is blank
      type: String,
    },
    doctor: {
      //doctor _id from doctor collection
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    type: {
      //type of appointment: GP, Mental Wellness, or Paediatrics
      type: String,
      required: true,
    },
    patientNotes: {
      //optional notes patient can give for reason of appointment
      type: String,
    },
    zoomLink: {
      type: String,
      required: true,
    },
    appTime: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SchApp", SchAppSchema);
