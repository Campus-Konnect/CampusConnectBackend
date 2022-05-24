const db = require('../../config/Config');

// --- === Class List === --- \\
exports.ClassList = (req, res) => {
    db.query('SELECT * FROM classes', function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: "Oops somthing went wronge." });
        } else {
            res.json({ success: true, data: data });
        }
    })
}
// --- === Class List === --- \\

// --- === Class Create === --- \\
exports.ClassCreate = (req, res) => {
    db.query('INSERT INTO classes (class_name,school_id) VALUES (?,?)', [req.body.class_name, req.body.school_id], function (err) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: "Oops somthing went wronge." });
        } else {
            return res.json({ success: true, message: "Class successfully created." });
        }
    })
}
// --- === Class Create === --- \\

// --- === Class Edit  === --- \\
exports.ClassEdit = (req,res) => {
    db.query('SELECT * FROM classes WHERE class_id = ?', [req.query.class_id], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops somthing went wronge.' });
        } else {
            return res.json({ success: false, data: data });
        }
    })
}
// --- === Class Edit  === --- \\


// --- === Class Update  === --- \\
exports.ClassUpdate = (req,res) => {
    db.query('UPDATE classes SET class_name = ? WHERE class_id = ?',[req.body.class_name,req.body.class_id],function (err,data) {
        if (err) {
            console.log(err);
            return  res.json({success : false,message : 'Oops something went wronge '});
        }else{
            return  res.json({success : true,message : 'Class updated successfully. '});
        }
    })
}
// --- === Class Update  === --- \\

// --- === Class Remove === --- \\
exports.ClassRemove = (req, res) => {
    db.query('SELECT * FROM classes__sub WHERE class_id = ?', [req.query.class_id], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: "Oops somthing went wronge." });
        } else {
            if (data.length > 0) {
                return res.json({ success: false, message: "There are dependency in sub classes." });
            } else {
                db.query('DELETE FROM classes WHERE class_id = ?', [req.query.class_id], function (err) {
                    if (err) {
                        console.log(err);
                        return res.json({ success: false, message: "Oops somthing went wronge." });
                    } else {
                        return res.json({ success: true, message: "Class successfully removed." });
                    }
                })
            }
        }
    })
}
// --- === Class Remove === --- \\


//  --- === Sub Class List === --- \\
exports.SubClassList = (req, res) => {
    db.query('SELECT * FROM classes__sub WHERE class_id = ?', [req.query.class_id], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: "Oops somthing went wronge." });
        } else {
            res.json({ success: true, data: data });
        }
    })
}
//  --- === Sub Class List === --- \\


//  --- === Sub Class Create === --- \\
exports.SubClassCreate = (req, res) => {
    db.query('INSERT INTO classes__sub (class_id,school_id,sub_class_name) VALUES (?,?,?)', [req.body.class_id, req.body.school_id, req.body.sub_class_name], function (err) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: "Oops somthing went wronge." });
        } else {
            return res.json({ success: true, message: "Sub class successfully created." });
        }
    })
}
//  --- === Sub Class Create === --- \\


// --- === Sub Class Edit  === --- \\
exports.SubClassEdit = (req,res) => {
    db.query('SELECT * FROM classes__sub WHERE sub_class_id = ?', [req.query.sub_class_id], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops somthing went wronge.' });
        } else {
            return res.json({ success: false, data: data });
        }
    })
}
// --- === Sub Class Edit  === --- \\


// --- === Sub Class Update  === --- \\
exports.ClassUpdate = (req,res) => {
    db.query('UPDATE classes__sub SET sub_class_name = ? WHERE sub_class_id = ?',[req.body.sub_class_name,req.body.sub_class_id],function (err,data) {
        if (err) {
            console.log(err);
            return  res.json({success : false,message : 'Oops something went wronge '});
        }else{
            return  res.json({success : true,message : 'Class updated successfully. '});
        }
    })
}
// --- === Sub Class Update  === --- \\

//  --- === Sub Class Remove === --- \\
exports.SubClassRemove = (req, res) => {
    db.query('DELETE FROM classes__sub WHERE sub_class_id = ?', [req.query.sub_class_id], function (err) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: "Oops somthing went wronge." });
        } else {
            return res.json({ success: true, message: "Class section successfully removed." });
        }
    })
}
//  --- === Sub Class Remove === --- \\