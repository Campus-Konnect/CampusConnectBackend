const route = require('express').Router();


// --- === Middleware === --- \\
// --- === Middleware === --- \\

// --- === All Controllers === --- \\
const AuthController = require('../controllers/Auth/AuthController')
// --- === All Controllers === --- \\



route.get('/User',AuthController.Login);


module.exports = route