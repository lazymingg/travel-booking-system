const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const responseHelper = require('../utils/responseHelper');
const { requireAuth } = require('../middleware/auth');
const router = express.Router({ mergeParams: true });

const db = new sqlite3.Database('./db/db.db');

//list bookings for an accommodation (optional status filter)
router.get('/:accommodation_id/bookings', (req, res) => {
  const { accommodation_id } = req.params;
  const { status } = req.query;
  let query = `SELECT b.* FROM Bookings b WHERE b.accommodation_id = ?`;
  const params = [accommodation_id];
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

//get a single booking
router.get('/:accommodation_id/bookings/:id', (req, res) => {
  const { id } = req.params;
  const query = `SELECT b.* FROM Bookings b WHERE b.booking_id = ?`;
  db.get(query, [id], (err, row) => {
    if (err) return responseHelper.error(res, 'Error retrieving booking', 500, err.message);
    if (!row) return responseHelper.error(res, 'Booking not found', 404);
    return responseHelper.success(res, row, 'Booking retrieved successfully');
  });
});

//create booking for accommodation (requires auth)
router.post('/:accommodation_id/bookings', requireAuth, (req, res) => {
  const { accommodation_id } = req.params;
  const user_id = req.session.user.user_id;
  const { room_id, check_in_date, check_out_date, total_price } = req.body;

  if (!room_id || !check_in_date || !check_out_date || !total_price) {
    return responseHelper.error(res, 'Missing required fields');
  }

  const created_at = new Date().toISOString();
  db.run(
    `INSERT INTO Bookings (user_id, accommodation_id, room_id, check_in_date, check_out_date, total_price, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [user_id, accommodation_id, room_id, check_in_date, check_out_date, total_price, created_at],
    function (err) {
      if (err) return responseHelper.error(res, 'Error creating booking', 500, err.message);
      return responseHelper.success(res, { booking_id: this.lastID }, 'Booking created successfully', 201);
    }
  );
});


// Temp
router.post('/:accommodation_id/bookings_temp', (req, res) => {
  const { accommodation_id } = req.params;
  // const user_id = req.session.user.user_id;
  const user_id = 1; // Temp
  const { room_id, check_in_date, check_out_date, total_price } = req.body;

  console.log("Temp Booking:", { room_id, check_in_date, check_out_date, total_price });

  if (!room_id || !check_in_date || !check_out_date || !total_price) {
    return responseHelper.error(res, 'Missing required fields');
  }

  const created_at = new Date().toISOString();
  db.run(
    `INSERT INTO Bookings (user_id, accommodation_id, room_id, check_in_date, check_out_date, total_price, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [user_id, accommodation_id, room_id, check_in_date, check_out_date, total_price, created_at],
    function (err) {
      if (err) return responseHelper.error(res, 'Error creating booking', 500, err.message);
      return responseHelper.success(res, { booking_id: this.lastID }, 'Booking created successfully', 201);
    }
  );
});

//update booking status (cancel/confirm) — should be protected/admin/owner in real app
router.patch('/:accommodation_id/bookings/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) return responseHelper.validationError(res, 'Status is required');

  db.run('UPDATE Bookings SET status = ? WHERE booking_id = ?', [status, id], function (err) {
    if (err) return responseHelper.error(res, 'Error updating booking', 500, err.message);
    if (this.changes === 0) return responseHelper.error(res, 'Booking not found', 404);
    return responseHelper.success(res, null, 'Booking updated successfully');
  });
});

module.exports = router;
