const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const responseHelper = require('../utils/responseHelper');
const router = express.Router();

const db = new sqlite3.Database('./db/db.db');

// Get all rooms for an accommodation
router.get('/accommodation/:accommodation_id', (req, res, next) => {
  const { accommodation_id } = req.params;
  
  db.all('SELECT * FROM Rooms WHERE accommodation_id = ?', [accommodation_id], (err, rows) => {
    if (err) return next(err);
    return responseHelper.success(res, rows, 'Rooms retrieved successfully');
  });
});

// Get specific room
router.get('/:accommodation_id/:room_id', (req, res, next) => {
  const { accommodation_id, room_id } = req.params;
  
  db.get('SELECT * FROM Rooms WHERE accommodation_id = ? AND room_id = ?', 
    [accommodation_id, room_id], (err, row) => {
    if (err) return next(err);
    if (!row) {
      return responseHelper.error(res, 'Room not found', 404);
    }
    return responseHelper.success(res, row, 'Room retrieved successfully');
  });
});

// Create new room
router.post('/', (req, res, next) => {
  const { accommodation_id, room_id, room_type, price_per_day, capacity, description } = req.body;
  
  if (!accommodation_id || !room_id || !room_type || !price_per_day || !capacity) {
    return responseHelper.validationError(res, 'Accommodation ID, room ID, room type, price per day, and capacity are required');
  }
  
  const created_at = new Date().toISOString();

  db.run(
    `INSERT INTO Rooms (accommodation_id, room_id, room_type, price_per_day, capacity, description, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [accommodation_id, room_id, room_type, price_per_day, capacity, description, created_at],
    function (err) {
      if (err) return next(err);
      return responseHelper.success(res, { accommodation_id, room_id }, 'Room created successfully', 201);
    }
  );
});

// Update room
router.put('/:accommodation_id/:room_id', (req, res, next) => {
  const { accommodation_id, room_id } = req.params;
  const { room_type, price_per_day, capacity, description, is_available } = req.body;

  db.run(
    `UPDATE Rooms SET room_type = ?, price_per_day = ?, capacity = ?, 
     description = ?, is_available = ?
     WHERE accommodation_id = ? AND room_id = ?`,
    [room_type, price_per_day, capacity, description, is_available, accommodation_id, room_id],
    function (err) {
      if (err) return next(err);
      if (this.changes === 0) {
        return responseHelper.error(res, 'Room not found', 404);
      }
      return responseHelper.success(res, null, 'Room updated successfully');
    }
  );
});

// Delete room
router.delete('/:accommodation_id/:room_id', (req, res, next) => {
  const { accommodation_id, room_id } = req.params;

  db.run('DELETE FROM Rooms WHERE accommodation_id = ? AND room_id = ?', 
    [accommodation_id, room_id], function (err) {
    if (err) return next(err);
    if (this.changes === 0) {
      return responseHelper.error(res, 'Room not found', 404);
    }
    return responseHelper.success(res, null, 'Room deleted successfully');
  });
});

// Get available rooms for date range
router.post('/available', (req, res, next) => {
  const { accommodation_id, check_in_date, check_out_date } = req.body;

  if (!accommodation_id || !check_in_date || !check_out_date) {
    return responseHelper.validationError(res, 'Accommodation ID, check-in date, and check-out date are required');
  }

  const query = `
    SELECT r.* FROM Rooms r
    WHERE r.accommodation_id = ? AND r.is_available = 1
    AND r.room_id NOT IN (
      SELECT DISTINCT b.room_id FROM Bookings b
      WHERE b.accommodation_id = ? AND b.status != 'cancelled'
      AND (
        (b.check_in_date <= ? AND b.check_out_date > ?) OR
        (b.check_in_date < ? AND b.check_out_date >= ?) OR
        (b.check_in_date >= ? AND b.check_out_date <= ?)
      )
    )`;

  db.all(query, 
    [accommodation_id, accommodation_id, check_in_date, check_in_date, 
     check_out_date, check_out_date, check_in_date, check_out_date],
    (err, rows) => {
      if (err) return next(err);
      return responseHelper.success(res, rows, 'Available rooms retrieved successfully');
    }
  );
});

// Toggle room availability
router.patch('/:accommodation_id/:room_id/toggle-availability', (req, res, next) => {
  const { accommodation_id, room_id } = req.params;

  db.run(
    'UPDATE Rooms SET is_available = NOT is_available WHERE accommodation_id = ? AND room_id = ?',
    [accommodation_id, room_id],
    function (err) {
      if (err) return next(err);
      if (this.changes === 0) {
        return responseHelper.error(res, 'Room not found', 404);
      }
      return responseHelper.success(res, null, 'Room availability toggled successfully');
    }
  );
});

module.exports = router;
