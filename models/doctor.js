const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    requird: true,
  },
  languages: [
    {
      type: String,
      required: true,
    },
  ],
  bio: {
    type: String,
  },
  pricing: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    requird: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
});

module.exports = mongoose.model("Doctor", DoctorSchema);
