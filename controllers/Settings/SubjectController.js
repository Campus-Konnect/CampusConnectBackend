const db = require('../../config/Config');

// --- === Subject List Funtion === --- \\
exports.SubjectList = (req, res) => {
    db.query('SELECT * FROM subjects', function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops somthing went wronge.' });
        } else {
            return res.json({ success: true, data: data });
        }
    })
}
// --- === Subject List Funtion === --- \\

// --- === Subject Create Function === --- \\
exports.SubjectCreate = (req, res) => {
    db.query('INSERT  INTO subjects (school_id,subject_name) VALUES (?,?)', [req.body.school_id, req.body.subject_name], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops somthing went wronge.' });
        } else {
            return res.json({ success: true, message: 'Subject created sucessfully.' });
        }
    })
}
// --- === Subject Create Function === --- \\

// --- === Subject Edit === --- \\
exports.SubjectEdit = (req, res) => {
    db.query('SELECT * FROM subjects WHERE subject_id = ?', [req.query.subject_id], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops somthing went wronge.' });
        } else {
            return res.json({ success: true, data: data });
        }
    })
}
// --- === Subject Edit === --- \\


// --- === Subject Update === --- \\
exports.SubjectUpdate = (req, res) => {
    db.query('UPDATE subjects SET subject_name = ? WHERE subject_id = ?', [req.body.subject_name, req.body.subject_id], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops somthing went wronge.' });
        } else {
            return res.json({ success: true, message: 'Subject updated successfully.' });
        }
    })
}
// --- === Subject Update === --- \\


// --- === Subject Remove === --- \\
exports.SubjectRemove = (req, res) => {
    db.query('DELETE FROM subjects WHERE subject_id = ?', [req.query.subject_id], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops something went wronge.' });
        } else {
            return res.json({ success: true, message: 'Subject removed  Successfully.' });
        }
    })
}
// --- === Subject Remove === --- \\

