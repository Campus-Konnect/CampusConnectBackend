const express = require('express');
const app = express();
require('dotenv').config();

// route import
const AppRoute = require('./routes/AppRoutes')



// --- === Use All Route === --- \\
app.use('/Api/Admin', AppRoute)
// --- === Use All Route === --- \\

app.listen(process.env.PORT);