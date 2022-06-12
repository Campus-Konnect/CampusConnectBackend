const path = require('path');
const fs = require('fs');
const db = require('../../../config/Config')
const formidable = require('formidable');
const Globel = require('../../../config/Global');


// --- === Post Remark Function === --- \\
exports.PostRemarks = (req, res) => {
    db.query('INSERT INTO remarks (teacher_id, student_id, remark) VALUES("?","?","?")', [req.query.teacher_id, student_id, remark], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops somethinge went went wronge.' });
        } else {
            if (data.length > 0) {
                return res.json({ success: true, message: "Remark has been sent!", data: data });
            } else {
                return res.json({ success: false, message: "Try again, invalid remark", data: data });
            }
        }
    })
}
// --- === Post Remark Function === --- \\

// --- === Post Remark Function === --- \\
exports.GetRemarks = (req, res) => {
    var start = req.query.page * req.query.limit;
    db.query('SELECT * FROM remarks WHERE school_id=? LIMIT ?, ? ORDER BY remark_id DESC; SELECT CEIL(COUNT(*) / ?) AS TotalPages WHERE school_id=?', [req.query.school_id, start, req.query.limit, start, req.query.limit, req.query.school_id], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops somethinge went went wronge.'+err });
        } else {
            if (data.length > 0) {
                return res.json({ success: true, data: data[0], currentPage: req.query.page, totalPages: data[1], previous:  req.query.page>0?true:false, next:totalPages==req.query.page+1?false:true });
            } else {
                return res.json({ success: false, message: "No remarks found!" ,data: data });
            }
        }
    })
}
// --- === Post Remark Function === --- \\