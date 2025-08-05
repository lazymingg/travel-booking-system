const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite3.Database('./db/db.db');

// Get all rooms for an accommodation
router.get('/accommodation/:accommodation_id', (req, res, next) => {
  const { accommodation_id } = req.params;
  
  db.all('SELECT * FROM Rooms WHERE accommodation_id = ?', [accommodation_id], (err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
});

// Get specific room
router.get('/:accommodation_id/:room_id', (req, res, next) => {
  const { accommodation_id, room_id } = req.params;
  
  db.get('SELECT * FROM Rooms WHERE accommodation_id = ? AND room_id = ?', 
    [accommodation_id, room_id], (err, row) => {
    if (err) return next(err);
    if (!row) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json(row);
  });
});

// Create new room
router.post('/', (req, res, next) => {
  const { accommodation_id, room_id, room_type, price_per_night, capacity, description } = req.body;
  const created_at = new Date().toISOString();

  db.run(
    `INSERT INTO Rooms (accommodation_id, room_id, room_type, price_per_night, capacity, description, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [accommodation_id, room_id, room_type, price_per_night, capacity, description, created_at],
    function (err) {
      if (err) return next(err);
      res.status(201).json({ 
        message: 'Room created successfully',
        room: { accommodation_id, room_id }
      });
    }
  );
});

// Update room
router.put('/:accommodation_id/:room_id', (req, res, next) => {
  const { accommodation_id, room_id } = req.params;
  const { room_type, price_per_night, capacity, description, is_available } = req.body;

  db.run(
    `UPDATE Rooms SET room_type = ?, price_per_night = ?, capacity = ?, 
     description = ?, is_available = ?
     WHERE accommodation_id = ? AND room_id = ?`,
    [room_type, price_per_night, capacity, description, is_available, accommodation_id, room_id],
    function (err) {
      if (err) return next(err);
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Room not found' });
      }
      res.json({ message: 'Room updated successfully' });
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
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json({ message: 'Room deleted successfully' });
  });
});

// Get available rooms for date range
router.post('/available', (req, res, next) => {
  const { accommodation_id, check_in_date, check_out_date } = req.body;

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
      res.json(rows);
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
        return res.status(404).json({ error: 'Room not found' });
      }
      res.json({ message: 'Room availability toggled successfully' });
    }
  );
});

module.exports = router;
