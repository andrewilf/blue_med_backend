# SEI7 Project 3 - BlueMed

To experience the full application, click on the frontend repo linked below and click on the demo link which can be found there.  
[Frontend Repo](https://github.com/faithchan/bluemed-frontend)

## 💊 Introduction

This Backend application was created to manage the logic for the application: Blue Med. The application is a proof of concept telemedicine app for a hypothetical clinic called Blue Med.
For more details on the general project, view the readme file on frontend's github repo: https://github.com/faithchan/bluemed-frontend

## 🩺 Features
- Express server to serve API calls for the frontend application.
- Communication with a MongoDB database through Mongoose.
- 5 Different schemas: Users, Patients, Doctors, Past Appointments, and Scheduled Appointments.
- Full CRUD operations for the 5 schemas.
- Express Sessions for user authentication.
- Bcryptjs used to hash passwords sent to the backend for user account creation and login verification.

## 💻 Technologies

- Express
- Express-Session
- Bcryptjs
- Mongoose/MongoDB
- Node.js

## Running the server locally
If you wish to clone and run this server on your local machine:
- you need to configure some config variables. The npm library, dotenv is included in the package.json file so you can edit the included file "dotenv"(remember to rename it .env) and write the configurations you desire the app to use.
- Run the following commands inside your BLUE_MED_BACKEND folder: npm install, npm start.

## Contributors
- Andrew @andrewilf
- Faith @faithchan
- Rosh @candontwork