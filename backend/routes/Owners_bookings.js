const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const responseHelper = require('../utils/responseHelper');
const { requireOwner } = require('../middleware/auth');
const router = express.Router({ mergeParams: true });
const db = new sqlite3.Database('./db/db.db');

// List bookings for owner accommodations (optional status filter)
router.get('/bookings', requireOwner, (req, res) => {
    const { status } = req.query;
    let query = `
        SELECT b.*, u.full_name as guest_name, a.name as accommodation_name, a.address
        FROM Bookings b
        JOIN Accommodations a ON b.accommodation_id = a.accommodation_id
        LEFT JOIN Users u ON b.user_id = u.user_id
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

// Confirm booking (pending → confirmed)
router.put('/bookings/:id/confirm', requireOwner, (req, res) => {
    const { id } = req.params;
    db.run(
        'UPDATE Bookings SET status = ? WHERE booking_id = ? AND status = ?',
        ['confirmed', id, 'pending'],
        function (err) {
            if (err) return responseHelper.error(res, 'Error confirming booking', 500, err.message);
            if (this.changes === 0) {
                return responseHelper.error(res, 'Booking not found or not pending', 404);
            }
            return responseHelper.success(res, id, 'Booking confirmed successfully');
        }
    );
});

// Edit booking details
router.put('/bookings/:id', requireOwner, (req, res) => {
    const { id } = req.params;
    const { status, check_in_date, check_out_date, total_price } = req.body;
    console.log(req.body);
    let fields = [];
    let params = [];
    // Date validation logic
    if (check_in_date && check_out_date && check_in_date >= check_out_date) {
        return responseHelper.validationError(res, 'Check-in date must be before check-out date');
    }
    if (status) { fields.push('status = ?'); params.push(status); }
    if (check_in_date) { fields.push('check_in_date = ?'); params.push(check_in_date); }
    if (check_out_date) { fields.push('check_out_date = ?'); params.push(check_out_date); }
    if (total_price) { fields.push('total_price = ?'); params.push(total_price); }
    if (fields.length === 0) return responseHelper.validationError(res, 'No fields to update');
    params.push(id);
    db.run(
        `UPDATE Bookings SET ${fields.join(', ')} WHERE booking_id = ?`,
        params,
        function (err) {
            if (err) return responseHelper.error(res, 'Error updating booking', 500, err.message);
            if (this.changes === 0) {
                return responseHelper.error(res, 'Booking not found', 404);
            }
            return responseHelper.success(res, id, 'Booking updated successfully');
        }
    );
});

// Cancel booking (confirmed → cancelled)
router.put('/bookings/:id/cancel', requireOwner, (req, res) => {
    const { id } = req.params;
    db.run(
        'UPDATE Bookings SET status = ? WHERE booking_id = ? AND status = ?',
        ['cancelled', id, 'confirmed'],
        function (err) {
            if (err) return responseHelper.error(res, 'Error cancelling booking', 500, err.message);
            if (this.changes === 0) {
                return responseHelper.error(res, 'Booking not found', 404);
            }
            return responseHelper.success(res, id, 'Booking cancelled successfully');
        }
    );

});

// Decline booking (delete)
router.delete('/bookings/:id', requireOwner, (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM Bookings WHERE booking_id = ?', [id], function (err) {
        if (err) return responseHelper.error(res, 'Error deleting booking', 500, err.message);
        if (this.changes === 0) {
            return responseHelper.error(res, 'Booking not found', 404);
        }
        return responseHelper.success(res, id, 'Booking deleted successfully');
    });
});

module.exports = router;