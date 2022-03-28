const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;

// route import
const AppRoute = require('./routes/AppRoutes')

 

// --- === Use All Route === --- \\
app.use('/Admin', AppRoute)
// --- === Use All Route === --- \\

app.listen(port);