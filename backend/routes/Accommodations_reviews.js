const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const responseHelper = require('../utils/responseHelper');
const { requireAuth , requireOwner} = require('../middleware/auth');
const router = express.Router({ mergeParams: true });
const db = new sqlite3.Database('./db/db.db');

//get reviews for an accommodation
router.get('/reviews', (req, res, next) => {
    const accommodation_id = req.params.accommodation_id;
    db.all(
        'SELECT r.*, u.full_name, u.email FROM Reviews r JOIN Users u ON r.user_id = u.user_id WHERE r.accommodation_id = ? ORDER BY r.created_at DESC',
        [accommodation_id],
        (err, rows) => {
            if (err) return next(err);
            return responseHelper.success(res, rows, 'Reviews retrieved successfully');
        }
    );
});

module.exports = router;