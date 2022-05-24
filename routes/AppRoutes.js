const route = require('express').Router();


// --- === Middleware === --- \\
const AuthMiddleware = require('../middleware/AuthMiddleware')
// --- === Middleware === --- \\

// --- === All Controllers === --- \\
const AuthController = require('../controllers/Auth/AuthController');
const EnquiryController = require('../controllers/Enquiry/EnquiryController');
const ClassController = require('../controllers/Settings/ClassController');
const SubjectController = require('../controllers/Settings/SubjectController');
const TecherController = require('../controllers/Schools/TeacherController');
const StudentController = require('../controllers/Students/StudentController');

// --- === All Controllers === --- \\




// --- Auth Route --- \\
route.get('/Login', AuthController.Login);
// --- Auth Route --- \\

// --- Enquiry Route --- \\
route.get('/EnquiryList', AuthMiddleware.Auth, EnquiryController.EnquiryList);
route.post('/EnquiryStore', AuthMiddleware.Auth, EnquiryController.EnquiryStore);
route.get('/EnquiryEdit', AuthMiddleware.Auth, EnquiryController.EnquiryEdit);
route.post('/EnquiryUpdate', AuthMiddleware.Auth, EnquiryController.EnquiryUpdate);
route.get('/EnquiryRemove', AuthMiddleware.Auth, EnquiryController.EnquiryRemove);
// --- Enquiry Route --- \\

// --- === Settings === --- \\

// --- Class Routes --- \\
route.get('/ClassList', AuthMiddleware.Auth, ClassController.ClassList);
route.post('/ClassCreate', AuthMiddleware.Auth, ClassController.ClassCreate);
route.get('/ClassEdit', AuthMiddleware.Auth, ClassController.ClassEdit);
route.post('/ClassUpdate', AuthMiddleware.Auth, ClassController.ClassUpdate);
route.get('/ClassRemove', AuthMiddleware.Auth, ClassController.ClassRemove);
// --- Class Routes --- \\

// --- Sub Class Routes --- \\
route.get('/SubClassList', AuthMiddleware.Auth, ClassController.SubClassList);
route.post('/SubClassCreate', AuthMiddleware.Auth, ClassController.SubClassCreate);
route.get('/SubClassEdit', AuthMiddleware.Auth, ClassController.SubClassEdit);
route.get('/SubClassRemove', AuthMiddleware.Auth, ClassController.SubClassRemove);
// --- Sub Class Routes --- \\

// --- Subjects Routes --- \\
route.get('/SubjectList', AuthMiddleware.Auth, SubjectController.SubjectList);
route.post('/SubjectCreate', AuthMiddleware.Auth, SubjectController.SubjectCreate);
route.get('/SubjectEdit', AuthMiddleware.Auth, SubjectController.SubjectEdit);
route.post('/SubjectUpdate', AuthMiddleware.Auth, SubjectController.SubjectUpdate);
route.get('/SubjectRemove', AuthMiddleware.Auth, SubjectController.SubjectRemove);
// --- Subjects Routes --- \\


// --- === Teacher Routes === --- \\
route.get('/TeacherList', AuthMiddleware.Auth, TecherController.TeacherList);
route.post('/TeacherCreate', AuthMiddleware.Auth, TecherController.TeacherCreate);
route.get('/TeacherEdit', AuthMiddleware.Auth, TecherController.TeacherEdit);
route.post('/TeacherUpdate', AuthMiddleware.Auth, TecherController.TeacherUpdate);
route.get('/TeacherRemove', AuthMiddleware.Auth, TecherController.TeacherRemove);
// --- Teacher Schedule --- \\
route.get('/TeacherScheduleList', AuthMiddleware.Auth, TecherController.TeacherScheduleList);
route.post('/TeacherSchedule', AuthMiddleware.Auth, TecherController.TeacherSchedule);
route.get('/TeacherScheduleEdit', AuthMiddleware.Auth, TecherController.TeacherScheduleEdit);
route.post('/TeacherScheduleUpdate', AuthMiddleware.Auth, TecherController.TeacherScheduleUpdate);
route.get('/TeacherScheduleRemove', AuthMiddleware.Auth, TecherController.TeacherScheduleRemove);
// --- Teacher Schedule --- \\
// --- === Teacher Routes === --- \\


// --- === Student Admission === --- \\
route.get('/StudentsList', AuthMiddleware.Auth, StudentController.StudentsList);
route.post('/StudentsAdmission', AuthMiddleware.Auth, StudentController.StudentsAdmission);
route.get('/StudentsEdit', AuthMiddleware.Auth, StudentController.StudentsEdit);
route.post('/StudentsAdmissionUpdate', AuthMiddleware.Auth, StudentController.StudentsAdmissionUpdate);
// --- === Student Admission === --- \\

// --- === Settings === --- \\


module.exports = route