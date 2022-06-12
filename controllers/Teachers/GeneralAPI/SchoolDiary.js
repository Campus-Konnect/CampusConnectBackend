const path = require('path');
const fs = require('fs');
const db = require('../../config/Config')
const formidable = require('formidable');
const Globel = require('../../config/Global');


// --- === Post Remark Function === --- \\
exports.PostRemarks = (req, res) => {
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
// --- === Post Remark Function === --- \\

// --- === Post Remark Function === --- \\
exports.GetRemarks = (req, res) => {
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
// --- === Post Remark Function === --- \\