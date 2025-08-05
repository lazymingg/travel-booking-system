const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();
const { requireAuth } = require('../middleware/auth');

const db = new sqlite3.Database('./db/db.db');

// Get all bookings
router.get('/', (req, res, next) => {
  const { user_id, status } = req.query;
  let query = `SELECT b.*, u.full_name as user_name, a.name as accommodation_name, a.address
               FROM Bookings b
               LEFT JOIN Users u ON b.user_id = u.user_id
               LEFT JOIN Accommodations a ON b.accommodation_id = a.accommodation_id
               WHERE 1=1`;
  let params = [];

  if (user_id) {
    query += ' AND b.user_id = ?';
    params.push(user_id);
  }
  if (status) {
    query += ' AND b.status = ?';
    params.push(status);
  }

  db.all(query, params, (err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
});

// Get booking by ID
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  
  const query = `SELECT b.*, u.full_name as user_name, u.email, u.phone_number,
                        a.name as accommodation_name, a.address, a.city, a.country,
                        r.room_type, r.price_per_night
                 FROM Bookings b
                 LEFT JOIN Users u ON b.user_id = u.user_id
                 LEFT JOIN Accommodations a ON b.accommodation_id = a.accommodation_id
                 LEFT JOIN Rooms r ON b.accommodation_id = r.accommodation_id AND b.room_id = r.room_id
                 WHERE b.booking_id = ?`;

  db.get(query, [id], (err, row) => {
    if (err) return next(err);
    if (!row) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(row);
  });
});

// Simple booking creation
router.post('/', requireAuth, (req, res, next) => {
  const { accommodation_id, room_id, check_in_date, check_out_date, total_price } = req.body;
  const user_id = req.session.user.user_id;
  const created_at = new Date().toISOString();

  if (!accommodation_id || !room_id || !check_in_date || !check_out_date || !total_price) {
    return res.status(400).json({ error: 'Missing required booking information' });
  }

  db.run(
    `INSERT INTO Bookings (user_id, accommodation_id, room_id, check_in_date, check_out_date, total_price, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [user_id, accommodation_id, room_id, check_in_date, check_out_date, total_price, created_at],
    function (err) {
      if (err) return next(err);
      res.status(201).json({ 
        message: 'Booking created',
        booking_id: this.lastID 
      });
    }
  );
});

// Update booking status
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  db.run(
    'UPDATE Bookings SET status = ? WHERE booking_id = ?',
    [status, id],
    function (err) {
      if (err) return next(err);
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.json({ message: 'Booking status updated successfully' });
    }
  );
});

// Cancel booking
router.patch('/:id/cancel', (req, res, next) => {
  const { id } = req.params;

  db.run(
    'UPDATE Bookings SET status = ? WHERE booking_id = ?',
    ['cancelled', id],
    function (err) {
      if (err) return next(err);
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.json({ message: 'Booking cancelled successfully' });
    }
  );
});

// Get user's bookings (requires authentication)
router.get('/my-bookings', requireAuth, (req, res, next) => {
  const user_id = req.session.user.user_id;
  
  const query = `SELECT b.*, a.name as accommodation_name, a.address, a.city,
                        r.room_type, r.price_per_night
                 FROM Bookings b
                 LEFT JOIN Accommodations a ON b.accommodation_id = a.accommodation_id
                 LEFT JOIN Rooms r ON b.accommodation_id = r.accommodation_id AND b.room_id = r.room_id
                 WHERE b.user_id = ?
                 ORDER BY b.created_at DESC`;

  db.all(query, [user_id], (err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
});

// Get user's bookings (alternative route with user_id param)
router.get('/user/:user_id', (req, res, next) => {
  const { user_id } = req.params;
  
  const query = `SELECT b.*, a.name as accommodation_name, a.address, a.city,
                        r.room_type, r.price_per_night
                 FROM Bookings b
                 LEFT JOIN Accommodations a ON b.accommodation_id = a.accommodation_id
                 LEFT JOIN Rooms r ON b.accommodation_id = r.accommodation_id AND b.room_id = r.room_id
                 WHERE b.user_id = ?
                 ORDER BY b.created_at DESC`;

  db.all(query, [user_id], (err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
});

// Check room availability
router.post('/check-availability', (req, res, next) => {
  const { accommodation_id, room_id, check_in_date, check_out_date } = req.body;

  const query = `
    SELECT COUNT(*) as count FROM Bookings 
    WHERE accommodation_id = ? AND room_id = ? 
    AND status != 'cancelled'
    AND (
      (check_in_date <= ? AND check_out_date > ?) OR
      (check_in_date < ? AND check_out_date >= ?) OR
      (check_in_date >= ? AND check_out_date <= ?)
    )`;

  db.get(query, 
    [accommodation_id, room_id, check_in_date, check_in_date, check_out_date, check_out_date, check_in_date, check_out_date],
    (err, result) => {
      if (err) return next(err);
      res.json({ 
        available: result.count === 0,
        message: result.count === 0 ? 'Room is available' : 'Room is not available for the selected dates'
      });
    }
  );
});

module.exports = router;
