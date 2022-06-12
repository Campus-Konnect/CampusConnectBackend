const db = require('../../config/Config');


// --- === Inventory Group List === --- \\
exports.InventoryGroupList = (req, res) => {
    db.query('SELECT * FROM inventory__groups', function (err, data) {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                message: 'Ooops somthing went wronge'
            });
        } else {
            if (data.length > 0) {
                return res.json({
                    success: true,
                    data: data
                });
            } else {
                return res.json({
                    success: false,
                    data: data
                });
            }
        }
    })
}
// --- === Inventory Group List === --- \\

// --- === Inventory Group Create === --- \\
exports.InventoryGroupCreate = (req, res) => {
    db.query('INSERT INTO inventory__groups (school_id,inventory_group_name,inventory_group_description) VALUES (?,?,?)', [req.body.school_id,req.body.inventory_group_name, req.body.inventory_group_description], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                message: 'Ooops somthing went wronge'
            });
        } else {
            return res.json({
                success: true,
                message: 'Inventory Group created successfully.'
            });
        }
    })
}
// --- === Inventory Group Create === --- \\

// --- === Inventory Group Edit Function === --- \\
exports.InventoryGroupEdit = (req, res) => {
    db.query('SELECT * FROM inventory__groups WHERE inventory_group_id = ?', [req.query.inventory_group_id], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops somthing went wronge.' });
        } else {
            if (data.length > 0) {
                return res.json({ success: true, data: data });
            } else {
                return res.json({ success: false, data: data });
            }
        }
    })
}
// --- === Inventory Group Edit Function === --- \\

// --- === Inventory Group Update Function === --- \\
exports.InventoryGroupUpdate = (req, res) => {
    db.query('UPDATE inventory__groups SET school_id = ?,inventory_group_name = ?,inventory_group_description = ? WHERE inventory_group_id',[req.body.school_id, req.body.inventory_group_name, req.body.inventory_group_description, req.body.inventory_group_id], function (err) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops somthing went wronge.' });
        } else {
            return res.json({ success: true, message: 'Inventory group updated successfully.' });
        }
    })
}
// --- === Inventory Group Update Function === --- \\


// --- === Inventory Item List === --- \\
exports.InventoryItemList = (req, res) => {
    db.query('SELECT * FROM inventory__items', function (err, data) {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                message: 'Ooops somthing went wronge'
            });
        } else {
            return res.json({
                success: true,
                data: data
            });
        }
    })
}
// --- === Inventory Item List === --- \\


// --- === Inventory Item Create === --- \\
exports.InventoryItemCreate = (req, res) => {
    db.query('INSERT INTO inventory__items (school_id,inventory_group_id,inventory_item_name,inventory_item_description,inventory_item_depreciation,inventory_item_remark,created_by) VALUES (?,?,?,?,?,?,?)', [req.body.school_id,req.body.inventory_group_id, req.body.inventory_item_name, req.body.inventory_item_description, req.body.inventory_item_depreciation, req.body.inventory_item_remark, req.body.user_id], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                message: 'Ooops somthing went wronge'
            });
        } else {
            return res.json({
                success: true,
                message: 'Inventory Items created successfully.'
            });
        }
    })
}
// --- === Inventory Item Create === --- \\

// --- === Assets Item Edit Function === --- \\
exports.InventoryItemEdit = (req, res) => {
    db.query('SELECT * FROM inventory__items WHERE inventory_item_id = ?', [req.query.inventory_item_id], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops somthing went wronge.' });
        } else {
            if (data.length > 0) {
                return res.json({ success: true, data: data });
            } else {
                return res.json({ success: false, data: data });
            }
        }
    })
}
// --- === Assets Item Edit Function === --- \\

// --- === Assets Item Edit Function === --- \\
exports.InventoryItemUpdate = (req, res) => {
    
    db.query('UPDATE inventory__items SET school_id = ?, inventory_group_id = ?,inventory_item_name = ?,inventory_item_description = ?,inventory_item_depreciation = ?,inventory_item_remark = ? ,updated_by = ? WHERE inventory_item_id', [req,body.school_id,req.body.inventory_group_id, req.body.inventory_item_name, req.body.inventory_item_description, req.body.inventory_item_depreciation, req.body.inventory_item_remark, req.body.user_id, req.body.inventory_item_id], function (err) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: 'Oops somthing went wronge.' });
        } else {
            return res.json({ success: true, message: 'Assets item updated successfully.' });
        }
    })
}
// --- === Assets Item Edit Function === --- \\



// --- === Inventory Account === --- \\
exports.InventoryAccounts = (req, res) => {
    db.query('SELECT account_id,account_name FROM accounts', function (err, data) {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                message: 'Oops somthing went wronge.'
            });
        } else {
            return res.json({
                success: true,
                data: data
            });
        }
    })
}
// --- === Inventory Account === --- \\


// --- === Get Itmes List Againts Group Id === --- \\
exports.GetitmeList = (req, res) => {
    db.query('SELECT inventory_group_id,inventory_item_id,inventory_item_name FROM inventory__items WHERE inventory_group_id = ?', [req.query.inventory_group_id], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                message: 'Oops somthing went wronge.'
            });
        } else {
            return res.json({
                success: true,
                data: data
            });
        }
    })
}
// --- === Get Itmes List Againts Group Id === --- \\ 

// --- === Stock List === --- \\
exports.StockList = (req, res) => {
    db.query('SELECT * FROM  inventory__transaction', function (err, data) {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                message: 'Oops somthing went wronge.'
            });
        } else {
            return res.json({
                success: true,
                data: data
            });
        }
    })
}
// --- === Stock List === --- \\


// --- === Stock In List === --- \\
exports.StockInList = (req, res) => {
    db.query('SELECT * FROM  inventory__transaction WHERE stock_out = ?', [0], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                message: 'Oops somthing went wronge.'
            });
        } else {
            return res.json({
                success: true,
                data: data
            });
        }
    })
}
// --- === Stock In List === --- \\

// --- === Stock In === --- \\
exports.StockIn = (req, res) => {
    //  res.send(req.body.inventory_item_id);
    db.query('SELECT inventory_item_status FROM inventory__items WHERE inventory_item_id = ? ', [req.body.inventory_item_id], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                message: 'Oops somthing went wronge.'
            });
        } else {
            var closing_item_qty = Number(data[0].inventory_item_status) + Number(req.body.stock_qty);

            db.query('UPDATE inventory__items SET inventory_item_status = ? WHERE inventory_item_id = ?', [closing_item_qty, req.body.inventory_item_id], function (err, data) {
                if (err) {
                    console.log(err);
                    return res.json({
                        success: false,
                        message: 'Oops somthing went wronge.'
                    });
                } else {
                    db.query('INSERT INTO inventory__transaction (account_id,inventory_group_id,inventory_item_id,stock_price,stock_qty,stock_sku,remark,stock_in,transaction_by) VALUES (?,?,?,?,?,?,?,?,?)', [req.body.account_id, req.body.inventory_group_id, req.body.inventory_item_id, req.body.stock_price, req.body.stock_qty, req.body.stock_sku, req.body.remark, req.body.stock_qty, req.body.user_id], function (err, data) {
                        if (err) {
                            console.log(err);
                            return res.json({
                                success: false,
                                message: 'Oops somthing went wronge.'
                            });
                        } else {
                            return res.json({
                                success: true,
                                message: 'Stock successfully inserted.'
                            });
                        }
                    })
                }
            })
        }
    })
}
// --- === Stock In === --- \\

// --- === Stock Out List Function === --- \\
exports.StockOutList = (req, res) => {
    db.query('SELECT * FROM  inventory__transaction WHERE stock_in = ?', [0], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                message: 'Oops somthing went wronge.'
            });
        } else {
            return res.json({
                success: true,
                data: data
            });
        }
    })
}
// --- === Stock Out List Function === --- \\

// --- === Stock Out Function === --- \\ 
exports.StockOut = (req, res) => {
    db.query('SELECT inventory_item_status FROM inventory__items WHERE inventory_item_id = ? ', [req.body.inventory_item_id], function (err, data) {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                message: 'Oops somthing went wronge.'
            });
        } else {
            var closing_item_qty = Number(data[0].inventory_item_status) - Number(req.body.stock_qty);

            if (Number(data[0].inventory_item_status) > Number(req.body.stock_qty)) {
                db.query('UPDATE inventory__items SET inventory_item_status = ? WHERE inventory_item_id = ?', [closing_item_qty, req.body.inventory_item_id], function (err, data) {
                    if (err) {
                        console.log(err);
                        return res.json({
                            success: false,
                            message: 'Oops somthing went wronge.'
                        });
                    } else {
                        db.query('INSERT INTO inventory__transaction (account_id,inventory_group_id,inventory_item_id,stock_price,stock_qty,stock_sku,remark,stock_out,transaction_by) VALUES (?,?,?,?,?,?,?,?,?)', [req.body.account_id, req.body.inventory_group_id, req.body.inventory_item_id, req.body.stock_price, req.body.stock_qty, req.body.stock_sku, req.body.remark, req.body.stock_qty, req.body.user_id], function (err, data) {
                            if (err) {
                                console.log(err);
                                return res.json({
                                    success: false,
                                    message: 'Oops somthing went wronge.'
                                });
                            } else {
                                return res.json({
                                    success: true,
                                    message: 'Stock successfully inserted.'
                                });

                            }
                        })
                    }
                })
            } else {
                return res.json({
                    success: false,
                    message: 'You have an  insufficient stock to issue'
                });
            }
        }
    })
}
// --- === Stock Out Function === --- \\ 


// --- === Inventry Item Status === --- \\
exports.InventoryItemStatus = (req, res) => {
    db.query('SELECT inventory__items.inventory_item_name,inventory__items.date,inventory__items.inventory_item_status,inventory__transaction.stock_price FROM inventory__items LEFT JOIN inventory__transaction ON inventory__items.inventory_item_id = inventory__transaction.inventory_item_id', function (err, data) {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                message: 'Oops somthing went wronge.'
            });
        } else {
            return res.json({
                success: true,
                data: data
            });
        }
    })
}
// --- === Inventry Item Status === --- \\