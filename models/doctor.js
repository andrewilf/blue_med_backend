const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    languages: [
      //spoken languages
      {
        type: String,
        required: true,
      },
    ],
    bio: {
      //blurb of doctor
      type: String,
    },
    pricing: {
      //rate per session, potentially could be changed to array for multiple rates
      type: Number,
      required: true,
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    gender: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Doctor", DoctorSchema);
