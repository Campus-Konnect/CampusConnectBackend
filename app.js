const express = require('express');
const app = express();
const bodyParser = require('body-parser')
require('dotenv').config();

// route import
const DesktopRoute = require('./routes/DesktopRoutes')
const TeacherRoute = require('./routes/TeacherRoutes')

// --- Body Parser --- \\
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// --- Body Parser --- \\ 


process.on('uncaughtException', function (err) {
    // Handle the error safely
    console.log(err)
})

// --- === Use All Route === --- \\
app.use('/Api/Admin', DesktopRoute)
app.use('/API/Teacher', TeacherRoute)
// --- === Use All Route === --- \\

app.listen(process.env.PORT);