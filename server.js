const express = require("express");
require("dotenv").config();

const app = express();
const mongoose = require("mongoose");
const db = mongoose.connection;
const PORT = process.env.PORT;
const DATABASE = process.env.DATABASE;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_BASE_URL = process.env.MONGO_BASE_URL;
const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_BASE_URL}/${DATABASE}?retryWrites=true&w=majority`;

//--------------------------------------------controllers--------------------------------------------

const patientController = require("./controllers/patientController");
const doctorController = require("./controllers/doctorController");
const scheduledAppointmentController = require("./controllers/schAppController");
const pastAppointmentController = require("./controllers/pastAppController");

app.use('/patient', patientController);
app.use('/doctor', doctorController);
app.use('/schapp', scheduledAppointmentController);
app.use('/pastapp', pastAppointmentController);

mongoose.connect(MONGO_URL).then(async () => {
  console.log("database connected");
  app.listen(PORT, () => {
    console.log("listening on", PORT);
  });
});

db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));