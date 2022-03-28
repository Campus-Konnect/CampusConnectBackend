const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;


app.get('/', (req, res) => {
    res.send('The Campus connect is running ' + process.env.PORT)
});

app.listen(port);