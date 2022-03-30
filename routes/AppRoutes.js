const route = require('express').Router();


// --- === Middleware === --- \\
const AuthMiddleware = require('../middleware/AuthMiddleware')
// --- === Middleware === --- \\

// --- === All Controllers === --- \\
const AuthController = require('../controllers/Auth/AuthController')
// --- === All Controllers === --- \\




// --- Auth Route --- \\
route.get('/Login',AuthController.Login);
// --- Auth Route --- \\

// --- Home Route --- \\
route.get('/Home',AuthMiddleware.Auth,AuthController.Home);
// --- Home Route --- \\


module.exports = route