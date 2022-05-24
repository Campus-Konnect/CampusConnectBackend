const db = require('../../config/Config')
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

const Globel = require('../../config/Global');

exports.TeacherList = (req, res) => {
    db.query('SELECT * FROM teachers', function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops somthing went wronge.' });
        } else {
            return res.json({ success: true, data: data });
        }
    })
}

exports.TeacherCreate = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (_err, input, file) {
        // --- === Teacher Profile Storing === --- \\
        if (file.teacher_profile) {
            var FromPath = file.teacher_profile.filepath;
            var FileName = "teacher_profile_" + Math.floor(Math.random() * 100) + 10 + path.extname(file.teacher_profile.originalFilename);

            var ToPath = path.join(__dirname, '../../public/teacher_profile/') + FileName;
            fs.rename(FromPath, ToPath, function (err) {
                if (err) throw err;
            });
        } else {
            var FileName = "";
        }
        // --- === Teacher Profile Storing === --- \\

        db.query('INSERT INTO accounts (group_id,account_name,account_email,account_number,account_address) VALUES (?,?,?,?,?)', [Globel.globales['teacher_group_id'], input.teacher_name, input.teacher_email, input.teacher_contact, input.teacher_address], function (err, data) {
            if (err) {
                console.log(err);
                return res.json({ success: false, message: 'Oops somthinge went.' });
            } else {
                db.query('INSERT INTO teachers (school_id,account_id,teacher_name,teacher_email,teacher_contact,teacher_address,teacher_qualification,teacher_profile,craeted_by) VALUES (?,?,?,?,?,?,?,?,?)', [input.school_id, data.insertId, input.teacher_name, input.teacher_email, input.teacher_contact, input.teacher_address, input.teacher_qualification, FileName, input.craeted_by], function (err, data) {
                    if (err) {
                        console.log(err);
                        return res.json({ success: false, message: 'Oops something went wronge' });
                    } else {
                        return res.json({ success: true, message: 'Teacher created successfully.' });
                    }
                })
            }
        })


    })
}

exports.TeacherEdit = (req, res) => {
    db.query('SELECT * FROM teachers WHERE teacher_id = ?', [req.query.teacher_id], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops something went wronge' });
        } else {
            return res.json({ success: true, data: data });
        }
    })
}

exports.TeacherUpdate = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (_err, input, file) {

        // --- === Teacher Profile Storing === --- \\
        if (file.teacher_profile) {
            var FromPath = file.teacher_profile.filepath;
            var FileName = "teacher_profile_" + Math.floor(Math.random() * 100) + 10 + path.extname(file.teacher_profile.originalFilename);

            var ToPath = path.join(__dirname, '../../public/teacher_profile/') + FileName;
            fs.rename(FromPath, ToPath, function (err) {
                if (err) throw err;
            });

            db.query('SELECT teacher_profile FROM teachers WHERE account_id = ?', [input.account_id], function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    if (fs.existsSync(path.join(__dirname, '../../public/teacher_profile/') + data[0].teacher_profile)) {
                        fs.unlinkSync(path.join(__dirname, '../../public/teacher_profile/') + data[0].teacher_profile);
                    }
                }
            })
        } else {
            var FileName = input.teacher_profile;
        }

        db.query('UPDATE accounts SET group_id = ? ,account_name = ?,account_email = ?,account_number=?,account_address = ? WHERE account_id = ?', [Globel.globales['teacher_group_id'], input.teacher_name, input.teacher_email, input.teacher_contact, input.teacher_address, input.account_id], function (err) {
            if (err) {
                console.log(err);
            } else {
                db.query('UPDATE teachers SET school_id = ?,account_id = ?,teacher_name =?,teacher_email=?,teacher_contact=?,teacher_address=?,teacher_qualification=?,teacher_profile=?,craeted_by=? WHERE account_id = ?', [input.school_id, input.account_id, input.teacher_name, input.teacher_email, input.teacher_contact, input.teacher_address, input.teacher_qualification, FileName, input.craeted_by, input.account_id], function (err) {
                    if (err) {
                        console.log(err);
                        return res.json({ success: false, message: 'Oops something went wronge' });
                    } else {
                        return res.json({ success: true, message: 'Teacher updated successfully' });
                    }
                })
            }
        })
    })
}


exports.TeacherRemove = (req, res) => {
    db.query('DELETE FROM accounts WHERE account_id = ?', [req.query.account_id], function (err) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops something went wronge' });
        } else {
            db.query('DELETE FROM teachers WHERE account_id = ?', [req.query.account_id], function (err) {
                if (err) {
                    console.log(err);
                    return res.json({ success: false, message: 'Oops something went wronge' });
                } else {
                    return res.json({ success: true, message: 'Teacher successfully deleted.' });
                }
            })
        }
    })
}

// --- === Teacher Schedule List Function === --- \\
exports.TeacherScheduleList = (req, res) => {
    var teacher_query = "SELECT schedule.*,teachers.teacher_name,classes.class_name,classes__sub.sub_class_name FROM schedule LEFT JOIN teachers ON schedule.teacher_id = teachers.teacher_id LEFT JOIN classes ON schedule.class_id = classes.class_id LEFT JOIN classes__sub ON schedule.sub_class_id = classes__sub.sub_class_id";
    db.query(teacher_query, function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops something went wronge' });
        } else {
            return res.json({ success: true, data: data });
        }
    })
}
// --- === Teacher Schedule List Function === --- \\

// --- === Teacher Schedule Function === --- \\\
exports.TeacherSchedule = (req, res) => {
    db.query('INSERT INTO schedule (class_id,sub_class_id,teacher_id,start_time,end_time) VALUES (?,?,?,?,?)', [req.body.class_id, req.body.sub_class_id, req.body.teacher_id, req.body.start_time, req.body.end_time], function (err) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops something went wronge' });
        } else {
            return res.json({ success: true, message: 'Teacher schedule successfully stored .' });
        }
    })
}
// --- === Teacher Schedule Function === --- \\\


// --- === Teacher Schedule Edit  Function === --- \\
exports.TeacherScheduleEdit = (req, res) => {
    db.query('SELECT * FROM schedule WHERE  schedule_id = ?', [req.query.schedule_id], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops something went wronge' });
        } else {
            return res.json({ success: true, data: data });
        }
    })
}
// --- === Teacher Schedule Edit  Function === --- \\


// --- === Teacher Schedule Update Function === --- \\
exports.TeacherScheduleUpdate = (req, res) => {
    db.query('UPDATE schedule SET class_id = ?,sub_class_id = ?,teacher_id = ?,start_time = ?,end_time = ? WHERE schedule_id = ?', [req.body.class_id, req.body.sub_class_id, req.body.teacher_id, req.body.start_time, req.body.end_time, req.body.schedule_id], function (err) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops something went wronge' });
        } else {
            return res.json({ success: true, message: 'Teacher schedule updated successfully.' });
        }
    })
}
// --- === Teacher Schedule Update Function === --- \\

// --- === Teacher Schedule Remove Function === --- \\
exports.TeacherScheduleRemove = (req, res) => {
    db.query('DELETE FROM schedule WHERE  schedule_id =? ', [req.query.schedule_id], function (err) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops something went wronge' });
        } else {
            return res.json({ success: true, message: 'Teacher schedule remove successfully.' });
        }
    })
}
// --- === Teacher Schedule Remove Function === --- \\