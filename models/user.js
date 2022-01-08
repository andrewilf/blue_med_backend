const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      requird: true,
    },
    role: {
      type: String,
      required: true,
    },
    patientID: {
      //made two seperate IDs as I currently am unsure if the ref can be made flexible
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
    DoctorID: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
