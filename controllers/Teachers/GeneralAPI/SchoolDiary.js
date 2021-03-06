const path = require('path');
const fs = require('fs');
const db = require('../../../config/Config')
const formidable = require('formidable');
const Globel = require('../../../config/Global');


// --- === Post Remark Function === --- \\
exports.PostRemarks = (req, res) => {
    // return res.json({response: req.body});
    db.query('INSERT INTO general__remarks (school_id, teacher_id, student_id, remark) VALUES("?","?","?","?")', [Number(req.body.school_id), Number(req.body.teacher_id), Number(req.body.student_id), req.body.remark], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops somethinge went went wronge!!' });
        } else {
            return res.json({ success: true, message: "Remark has been sent!", data: data });
        }
    })
}
// --- === Post Remark Function === --- \\

// --- === Post Remark Function === --- \\
exports.GetRemarks = (req, res) => {
    var start = Number(req.query.page) * Number(req.query.limit);
    // db.query('SELECT * FROM general__remarks WHERE school_id=? AND student_id=? LIMIT ?, ? ORDER BY remark_id DESC; SELECT CEIL(COUNT(*) / ?) AS TotalPages WHERE school_id=? AND student_id=?', [req.query.school_id,req.query.student_id, start, req.query.limit, req.query.student_id, start, req.query.limit, req.query.school_id, req.query.student_id], function (err, data) {
        db.query('SELECT * FROM general__remarks WHERE school_id=? AND student_id=? LIMIT ?,?;SELECT CEIL(COUNT(*) / ?) AS TotalPages FROM general__remarks ?', [req.query.school_id, req.query.student_id,start, Number(req.query.limit), Number(req.query.limit)], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops somethinge went went wronge!!'+err.message });
        } else {
            return res.json({ success: true, message: "Success remarks found!" ,data: data });
            if (data[0].length > 0) {
                return res.json({ success: true, data: data[0], currentPage: req.query.page, totalPages: data[1], previous:  req.query.page>0?true:false, next:totalPages==req.query.page+1?false:true });
            } else {
                return res.json({ success: false, message: "No remarks found!" ,data: data });
            }
        }
    });
}
// --- === Post Remark Function === --- \\