const route = require('express').Router();

const AuthMiddleware = require('../middleware/AuthMiddleware')
const AuthController = require('../controllers/Teachers/Auth/AuthController');
const GeneralAPI = require('../controllers/Teachers/GeneralAPI/SchoolDiary.js');



route.post('/PostRemark', AuthMiddleware.Auth, GeneralAPI.PostRemarks);
route.get('/GetRemarks', AuthMiddleware.Auth, GeneralAPI.GetRemarks);