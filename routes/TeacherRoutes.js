const route = require('express').Router();

const AuthMiddleware = require('../middleware/AuthMiddleware')
// const AuthController = require('../controllers/Teachers/Auth/AuthController');
const GeneralAPI = require('../controllers/Teachers/GeneralAPI/SchoolDiary');



route.get('/Home', function (req,res) {
    return  res.json({success : false,message : 'This is HOme Web'});
});
route.post('/PostRemark', AuthMiddleware.Auth, GeneralAPI.PostRemarks);
route.get('/GetRemarks', AuthMiddleware.Auth, GeneralAPI.GetRemarks);
route.get('/TestRemark', AuthMiddleware.Auth, GeneralAPI.GetRemarks);



module.exports = route