const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PastAppSchema = new Schema(
  //After appointment with doctor, scheduled appointment is removed and a corresponding past appointment entry is made
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
    attendee: {
      type: String,
      required: true,
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
    doctorNotes: {
      //optional notes doctor can enter after appointment. prescribed medication is listed here
      type: String,
    },
    appTime: {
      //time appointment started
      type: Date,
      required: true,
    },
    appTimeEnd: {
      //time appointment ended
      type: Date,
      required: true,
      default: Date.now,
    },
    cost: {
      //total cost of appointment and medication, if any.
      type: Number,
      required: true,
    },
    paid: {
      //boolean for if the appointment and medication, if any, has been paid for. True if paid, false if not paid yet
      type: Boolean,
      required: true,
    },
    medicationDelivery: {
      //status of medication: NA, pending, en route, delivered, missed delivery
      type: String,
      required: true,
    },
    altDeliveryAddress: {
      //address medication is to be delivered to. Blank if address of patient is to be used
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PastApp", PastAppSchema);
