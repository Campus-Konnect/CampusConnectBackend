const route = require('express').Router();



route.get('/', (req, res) => {
    res.json({ success: true, message: 'The has been successsfull run.' });
});


module.exports = route