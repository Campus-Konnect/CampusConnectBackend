const db = require('../../config/Config');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const Group = require('../../config/Global')


exports.Login = (req, res) => {
    db.query('SELECT * FROM schools WHERE (school_email=? AND school_password=?)', [req.query.login_id, req.query.user_password], function (error, data) {
        if (error) throw res.json({ success: false, message: "Invalid credentials please retry.." });
        // --- Success Function --- \\
        if (data.length > 0) {
            // --- Auth Token --- \\
            var token = jwt.sign({ id: data[0].login_id }, process.env.TOKEN_SECRET, {
                expiresIn: process.env.TOKEN_EXPIRES_IN,
            });
            data[0].token = token
            // --- Auth Token --- \\
            res.json({ success: true, messsage: "Login successful redirecting..", data: data })
        } else {
            res.json({ success: false, message: "Invalid credentials please retry.." })
        }
        // --- Success Function --- \\
    });
}