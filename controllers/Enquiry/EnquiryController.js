const db = require('../../config/Config');
const formidable = require('formidable');


// --- === Enquiry List === --- \\
exports.EnquiryList = (req, res) => {
    db.query('SELECT * FROM enquiries', function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Ooops somthing went wronge.' });
        } else {
            return res.json({ success: true, data: data });
        }
    })
}
// --- === Enquiry List === --- \\


exports.EnquiryStore = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (_err, fields) {
        db.query('INSERT INTO enquiries (orgnization_id,school_id,child_name,father_name,surname,mother_name,child_dob,addmission_class,gender,primary_contact,secondry_contact,email,registration_fees,payment_status,address,remark) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [fields.orgnization_id, fields.school_id, fields.child_name, fields.father_name, fields.surname, fields.mother_name, fields.child_dob, fields.addmission_class, fields.gender, fields.primary_contact, fields.secondry_contact, fields.email, fields.registration_fees, fields.payment_status, fields.address, fields.remark], function (err) {
            if (err) {
                console.log(err);
                return res.json({ success: false, message: 'Ooops somthing went wronge.record not submitted.' });
            } else {
                return res.json({ success: true, message: 'Enquiry record successfully stored.' });
            }
        })
    });
}


// --- === Enquiry Edit Function === --- \\
exports.EnquiryEdit = (req, res) => {
    db.query('SELECT * FROM enquiries WHERE enquiry_id = ?', [req.query.enquiry_id], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Ooops somthing went wronge.' });
        } else {
            return res.json({ success: true, data: data });
        }
    })
}
// --- === Enquiry Edit Function === --- \\

// --- === Enquiry Update Function === --- \\
exports.EnquiryUpdate = (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (_err, fields) {
        db.query('UPDATE enquiries SET orgnization_id = ?,school_id = ?,child_name = ?,father_name =?,surname = ?,mother_name = ?,child_dob = ?,addmission_class = ?,gender = ?,primary_contact = ?,secondry_contact = ?,email = ?,registration_fees = ?,payment_status = ?,address = ?, remark = ?', [fields.orgnization_id, fields.school_id, fields.child_name, fields.father_name, fields.surname, fields.mother_name, fields.child_dob, fields.addmission_class, fields.gender, fields.primary_contact, fields.secondry_contact, fields.email, fields.registration_fees, fields.payment_status, fields.address, fields.remark], function (err) {
            if (err) {
                console.log(err);
                return res.json({ success: false, message: 'Ooops somthing went wronge.' });
            } else {
                return res.json({ success: true, message: 'Enquiry record successfully update.' });
            }
        })
    })
}
// --- === Enquiry Update Function === --- \\


// --- === Enquiry Remove === --- \\
exports.EnquiryRemove = (req,res) => {
    db.query('DELETE FROM enquiries WHERE enquiry_id = ? ',[req.query.enquiry_id],function (err,data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Ooops somthing went wronge.' });
        }else{
            return res.json({ success: true, message: 'Enquiry record removed.' });
        }
    })
}
// --- === Enquiry Remove === --- \\