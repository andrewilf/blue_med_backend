const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PastAppSchema = new Schema(
  {
    // name: {
    //   type: String,
    //   required: true,
    // },
    // profession: {
    //   type: String,
    //   requird: true,
    // },
    // languages: [
    //   //spoken languages
    //   {
    //     type: String,
    //     required: true,
    //   },
    // ],
    // bio: {
    //   //blurb of doctor
    //   type: String,
    // },
    // pricing: {
    //   //rate per session, potentially could be changed to array for multiple rates
    //   type: Number,
    //   required: true,
    // },
    // email: {
    //   type: String,
    //   requird: true,
    // },
    // password: {
    //   type: String,
    //   required: true,
    // },
    // gender: {
    //   type: String,
    //   required: true,
    // },
    // img: {
    //   type: String,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PastApp", PastAppSchema);
