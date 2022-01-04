const express = require('express')
const app = express();

//About Page
app.get('/')

//View services - if not signed in auto direct to /login
app.get('/services/all')

//GP
app.get('/services/general-practioner')
//Mental Well-being
app.get('/services/mental-well-being')
//Padiatrics
app.get('/services/paediatrics')

//MyApp - if not signed in auto direct to /login
app.get('/appointments/all')

//MyApp- scheduled
app.get('/appointments/all')


app.get('/appointments')