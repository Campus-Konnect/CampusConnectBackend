const db = require('../../config/Config')
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const Globel = require('../../config/Global');

// --- === Students List Function === --- \\
exports.StudentsList = (req, res) => {
    db.query('SELECT * FROM students WHERE school_id', [req.query.school_id], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops somethinge went went wronge.' });
        } else {
            if (data.length > 0) {
                return res.json({ success: true, data: data });
            } else {
                return res.json({ success: false, data: data });
            }
        }
    })
}
// --- === Students List Function === --- \\

// --- === Students Admission Function === --- \\
exports.StudentsAdmission = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (_err, input, file) {
        // --- === Teacher Profile Storing === --- \\
        if (file.student_profile) {
            var FromPath = file.student_profile.filepath;
            var FileName = "student_profile_" + Math.floor(Math.random() * 100) + 10 + path.extname(file.student_profile.originalFilename);

            var ToPath = path.join(__dirname, '../../public/student_profile/') + FileName;
            fs.rename(FromPath, ToPath, function (err) {
                if (err) throw err;
            });
        } else {
            var FileName = "";
        }
        // --- === Teacher Profile Storing === --- \\

        db.query('INSERT INTO students (school_id,organization_id,academic_year,gr_no,admission_no,admission_date,admission_in_class,section,gender,student_name,student_father_name,student_surname,student_dob,student_dob_in_word,student_age,student_birth_place,student_nationality,student_mother_toungue,student_religion,student_cast,student_blood_group,student_primary_contact,student_secondary_contact,student_email,student_address,student_profile) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [input.school_id, input.organization_id, input.academic_year, input.gr_no, input.admission_no, input.admission_date, input.admission_in_class, input.section, input.gender, input.student_name, input.student_father_name, input.student_surname, input.student_dob, input.student_dob_in_word, input.student_age, input.student_birth_place, input.student_nationality, input.student_mother_toungue, input.student_religion, input.student_cast, input.student_blood_group, input.student_primary_contact, input.student_secondary_contact, input.student_email, input.student_address, FileName], function (err, data) {
            if (err) {
                console.log(err);
                return res.json({ success: false, message: 'Oops somethinge went wronge' });
            } else {

                // --- === Student Parent Detials === --- \\
                db.query('INSERT INTO students__parents (student_id,fathers_name,fathers_mobile,fathers_qualification,fathers_profession,fathers_income,fathers_office_name_address,mothers_name,mothers_mobile,mothers_qualification,mothers_profession,mothers_income,mothers_office_name_address) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [data.insertId, input.fathers_name, input.fathers_mobile, input.fathers_qualification, input.fathers_profession, input.fathers_income, input.fathers_office_name_address, input.mothers_name, input.mothers_mobile, input.mothers_qualification, input.mothers_profession, input.mothers_income, input.mothers_office_name_address], function (err) {
                    if (err) {
                        console.log(err);
                        return res.json({ success: false, message: 'Oops somethinge went wronge' });
                    }
                })
                // --- === Student Parent Detials === --- \\

                // --- === Student Previous School Detials === --- \\
                db.query('INSERT INTO students__old_school (student_id,school_name,transfer_no,previous_class,previous_percentage,rank) VALUES (?,?,?,?,?,?)', [data.insertId, input.school_name, input.transfer_no, input.previous_class, input.previous_percentage, input.rank], function (err) {
                    if (err) {
                        console.log(err);
                        return res.json({ success: false, message: 'Oops somethinge went wronge' });
                    }
                })
                // --- === Student Previous School Detials === --- \\

                // --- === Student Previous School Detials === --- \\
                var doc = JSON.parse(input.siblings);
                for (let i = 0; i < doc.length; i++) {
                    const arr = doc[i];
                    db.query('INSERT INTO  students__relations (student_id,sibling_name,sibling_age,sibling_school_college) VALUES (?,?,?,?)', [data.insertId, arr.sibling_name, arr.sibling_age, arr.sibling_school_college], function (err) {
                        if (err) {
                            console.log(err);
                            return res.json({
                                success: false,
                                message: 'Ooops somthing went wronge.'
                            });
                        }
                    })
                }
                // --- === Student Previous School Detials === --- \\


                // --- === Creating Account Of Student === --- \\
                db.query('INSERT INTO accounts (student_id,account_name,account_email,account_number,account_address) VALUES (?,?,?,?,?)', [data.insertId, input.student_name, input.student_email, input.student_primary_contact, input.student_address], function (err, account) {
                    if (err) {
                        console.log(err);
                        return res.json({
                            success: false,
                            message: 'Ooops somthing went wronge.'
                        });
                    } else {
                        db.query('UPDATE students SET student_account_id = ? WHERE student_id  = ?', [account.insertId, data.insertId], function (err) {
                            if (err) {
                                console.log(err);
                                return res.json({
                                    success: false,
                                    message: 'Ooops somthing went wronge.'
                                });
                            } else {
                                return res.json({
                                    success: true,
                                    message: 'Student admission compeleted successfully.'
                                });
                            }
                        })
                    }
                })
                // --- === Creating Account Of Student === --- \\ 


            }
        })
    })
}
// --- === Students Admission Function === --- \\

// --- === Students Edit Function === --- \\
exports.StudentsEdit = (req, res) => {
    db.query('SELECT * FROM students WHERE student_id = ? ', [req.query.student_id], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops somethinge went wronge.' });
        } else {
            // --- === Student Parents === --- \\
            db.query('SELECT * FROM students__parents WHERE student_id = ?', [req.query.student_id], function (err, parents) {
                if (err) {
                    console.log(err);
                    return res.json({ success: false, message: 'Oops somethinge went wronge.' });
                } else {
                    // --- === Student Old School === --- \\
                    db.query('SELECT * FROM students__old_school WHERE student_id = ?', [req.query.student_id], function (err, old_school) {
                        if (err) {
                            console.log(err);
                            return res.json({ success: false, message: 'Oops somethinge went wronge.' });
                        } else {
                            // --- === Student Sibling === --- \\
                            db.query('SELECT * FROM students__relations WHERE student_id = ?', [req.query.student_id], function (err, sibling) {
                                if (err) {
                                    console.log(err);
                                    return res.json({ success: false, message: 'Oops somethinge went wronge.' });
                                } else {
                                    GetStudentData(parents, old_school, sibling)
                                }
                            })
                            // --- === Student Sibling === --- \\
                        }
                    })
                    // --- === Student Old School === --- \\

                    // === Data Function === \\
                    data[0].parents = [];
                    data[0].old_school = [];
                    data[0].sibling = [];
                    function GetStudentData(parents, old_school, sibling) {
                        data[0].parents = parents;
                        data[0].old_school = old_school;
                        data[0].sibling = sibling;
                        if (data.length > 0) {
                            return res.json({ success: true, data: data });
                        } else {
                            return res.json({ success: false, data: data });
                        }
                    }
                    // === Data Function === \\
                }
            })
        }
    })
}
// --- === Students Edit Function === --- \\

// --- === Students Update Function === --- \\
exports.StudentsAdmissionUpdate = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (_err, input, file) {
        // --- === Teacher Profile Storing === --- \\
        if (file.student_profile) {
            var FromPath = file.student_profile.filepath;
            var FileName = "student_profile_" + Math.floor(Math.random() * 100) + 10 + path.extname(file.student_profile.originalFilename);

            var ToPath = path.join(__dirname, '../../public/student_profile/') + FileName;
            fs.rename(FromPath, ToPath, function (err) {
                if (err) throw err;
            });

            db.query('SELECT student_profile FROM students WHERE student_id = ?', [input.student_id], function (err, profile) {
                if (err) {
                    console.log(err);
                } else {
                    if (fs.existsSync(path.join(__dirname, '../../public/student_profile/') + profile[0].student_profile)) {
                        fs.unlinkSync(path.join(__dirname, '../../public/student_profile/') + profile[0].student_profile);
                    }
                }
            })
        } else {
            var FileName = input.student_profile;
        }
        // --- === Teacher Profile Storing === --- \\

        db.query('UPDATE students SET academic_year=?,gr_no=?,admission_no=?,admission_date=?,admission_in_class=?,section=?,gender=?,student_name=?,student_father_name=?,student_surname=?,student_dob=?,student_dob_in_word=?,student_age=?,student_birth_place=?,student_nationality=?,student_mother_toungue=?,student_religion=?,student_cast=?,student_blood_group=?,student_primary_contact=?,student_secondary_contact=?,student_email=?,student_address=?,student_profile=? WHERE student_id = ?', [input.academic_year, input.gr_no, input.admission_no, input.admission_date, input.admission_in_class, input.section, input.gender, input.student_name, input.student_father_name, input.student_surname, input.student_dob, input.student_dob_in_word, input.student_age, input.student_birth_place, input.student_nationality, input.student_mother_toungue, input.student_religion, input.student_cast, input.student_blood_group, input.student_primary_contact, input.student_secondary_contact, input.student_email, input.student_address, FileName, input.student_id], function (err) {
            if (err) {
                console.log(err);
                return res.json({
                    success: false,
                    message: 'Ooops somthing went wronge.'
                });
            } else {

                // --- === Perivous School Detail === --- \\
                db.query('UPDATE students__old_school SET school_name = ?,transfer_no = ?,previous_class = ?,previous_percentage = ?,rank = ? WHERE student_id = ?', [input.school_name, input.transfer_no, input.previous_class, input.previous_percentage, input.rank, input.student_id], function (err) {
                    if (err) {
                        console.log(err);
                        return res.json({
                            success: false,
                            message: 'Ooops somthing went wronge.'
                        });
                    }
                })
                // --- === Perivous School Detail === --- \\

                // --- === Student Parents Detail Update === --- \\
                db.query('UPDATE students__parents SET fathers_name = ?,fathers_mobile = ?,fathers_qualification = ?,fathers_profession = ?,fathers_income = ?,fathers_office_name_address = ?,mothers_name = ?,mothers_mobile = ?,mothers_qualification = ?,mothers_profession = ?,mothers_income = ?,mothers_office_name_address = ? WHERE student_id = ?', [input.fathers_name, input.fathers_mobile, input.fathers_qualification, input.fathers_profession, input.fathers_income, input.fathers_office_name_address, input.mothers_name, input.mothers_mobile, input.mothers_qualification, input.mothers_profession, input.mothers_income, input.mothers_office_name_address, input.student_id], function (err) {
                    if (err) {
                        console.log(err);
                        return res.json({
                            success: false,
                            message: 'Ooops somthing went wronge.'
                        });
                    }
                })
                // --- === Student Parents Detail Update === --- \\


                // --- === Student Sibling Detail Update === --- \\
                // if (input.siblings.length > 0) {
                    db.query('DELETE FROM students__relations WHERE student_id = ?', [input.student_id], function (err) {
                        if (err) {
                            return res.json({
                                success: false,
                                message: 'Ooops somthing went wronge.'
                            });
                        } else {
                            var doc = JSON.parse(input.siblings);
                            for (let i = 0; i < doc.length; i++) {
                                const arr = doc[i];
                                db.query('INSERT INTO  students__relations (student_id,sibling_name,sibling_age,sibling_school_college) VALUES (?,?,?,?)', [input.student_id, arr.sibling_name, arr.sibling_age, arr.sibling_school_college], function (err) {
                                    if (err) {
                                        console.log(err);
                                        return res.json({
                                            success: false,
                                            message: 'Ooops somthing went wronge.'
                                        });
                                    }
                                })
                            }
                        }
                    })
                // }
                // --- === Student Sibling Detail Update === --- \\
                return res.json({
                    success: true,
                    message: 'Student updated successfully.'
                });
            }
        })
    })
}
// --- === Students Update Function === --- \\
