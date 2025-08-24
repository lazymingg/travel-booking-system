const exporess = require('express');
const sqlite3 = require('sqlite3').verbose();
const responseHelper = require('../utils/responseHelper');
const { requireAuth , requireOwner} = require('../middleware/auth');
const router = exporess.Router({ mergeParams: true });
const db = new sqlite3.Database('./db/db.db');


//list bookings for owner accommodations (optional status filter)
router.get('/bookings', requireOwner, (req, res) => {
    const { status } = req.query;
    let query = `
        SELECT b.* FROM Bookings b
        JOIN Accommodations a ON b.accommodation_id = a.accommodation_id
        WHERE a.owner_id = ?`;
    const params = [req.session.user.owner_id];
    if (status) {
        query += ` AND b.status = ?`;
        params.push(status);
    }
    query += ` ORDER BY b.created_at DESC`;
    db.all(query, params, (err, rows) => {
        if (err) return responseHelper.error(res, 'Error retrieving bookings', 500, err.message);
        return responseHelper.success(res, rows, 'Bookings retrieved successfully');
    });
});