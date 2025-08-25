const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const responseHelper = require('../utils/responseHelper');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();
const db = new sqlite3.Database('./db/db.db');


// Get all bookings for the authenticated user
router.get('/bookings', requireAuth, (req, res, next) => {
    const user_id = req.session.user.user_id;
    
    const query = `SELECT b.*, a.name as accommodation_name, a.accommodation_id, a.address
                     FROM Bookings b
                     LEFT JOIN Accommodations a ON b.accommodation_id = a.accommodation_id
                     WHERE b.user_id = ?`;
    
    db.all(query, [user_id], (err, rows) => {
        if (err) return next(err);
        return responseHelper.success(res, rows, 'User bookings retrieved successfully');
    });
    }
);

//cancel a booking (only by the user who made it)
router.put('/bookings/:id/cancel', requireAuth, (req, res, next) => {
    const { id } = req.params;
    const user_id = req.session.user.user_id;
    // const updated_at = new Date().toISOString();
    console.log('test')
    // First, verify the booking belongs to the user
    db.get(`SELECT * FROM Bookings WHERE booking_id = ? AND user_id = ?
              AND status != 'cancelled'`, [id, user_id], (err, row) => {
          if (err) return next(err);
          if (!row) {
                return responseHelper.error(res, 'Booking not found or already cancelled', 404);
          }
    
        // Proceed to cancel the booking (only update status)
        db.run(`UPDATE Bookings SET status = 'cancelled' WHERE booking_id = ?`,
            [id], function (err) {
             if (err) return next(err);
             return responseHelper.success(res, null, 'Booking cancelled successfully');
            });
     });
});

module.exports = router;