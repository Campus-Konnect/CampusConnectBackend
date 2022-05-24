const { mutateExecOptions } = require('nodemon/lib/config/load');
const db = require('../../config/Config')


// --- === Session List === --- \\
exports.SessionList = (req, res) => {
    db.query('SELECT * FROM session', function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops somethinge went wronge' });
        } else {
            if (data.length > 0) {
                res.json({ success: true, data: data });
            } else {
                res.json({ success: false, data: data });
            }
        }
    })
}
// --- === Session List === --- \\

// --- === Session Create === --- \\
exports.SessionCreate = (req, res) => {
    db.query('INSERT INTO session (session_shift,session_start_time,session_end_time,total_periods) VALUES (?,?,?,?)', [req.body.session_shift, req.body.session_start_time, req.body.session_end_time, req.body.total_periods], function (err) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops somethinge went wronge' });
        } else {
            return res.json({ success: true, message: 'Session created successfully' });
        }
    })
}
// --- === Session Create === --- \\

// --- === Session Edit === --- \\
exports.SessionEdit = (req, res) => {
    db.query('SELECT * FROM session WHERE session_id  = ?', [req.query.session_id], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops somethinge went wronge' });
        } else {
            if (data.length > 0) {
                res.json({ success: true, data: data });
            } else {
                res.json({ success: false, data: data });
            }
        }
    })
}
// --- === Session Edit === --- \\

// --- === Session Update === --- \\
exports.SessionUpdate = (req, res) => {
    db.query('UPDATE session SET session_shift = ?,session_start_time = ?,session_end_time = ?,total_periods = ? WHERE session_id  = ?', [req.body.session_shift, req.body.session_start_time, req.body.session_end_time, req.body.total_periods, req.body.session_id], function (err) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops somethinge went wronge' });
        } else {
            return res.json({ success: true, message: 'Session updated successfully' });
        }
    })
}
// --- === Session Update === --- \\

// --- === Session Remove === --- \\
exports.SessionRemove = (req, res) => {
    db.query('DELETE FROM session WHERE session_id = ?', [req.query.session_id], function (err) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops somethinge went wronge' });
        } else {
            return res.json({ success: true, message: 'Session remove successfully' });
        }
    })
}
// --- === Session Remove === --- \\