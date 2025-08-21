const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const responseHelper = require('../utils/responseHelper');
const { requireAuth , requireOwner} = require('../middleware/auth');
const router = express.Router();

const db = new sqlite3.Database('./db/db.db');

//create new room of an accommodation of owner check is that accommodation belong to that owner 
// This route is protected by requireOwner middleware
// CREATE TABLE Rooms (
//     accommodation_id INTEGER NOT NULL,
//     room_id INTEGER PRIMARY KEY AUTOINCREMENT,
//     number_guest INTEGER NOT NULL CHECK(number_guest > 0),
//     price_per_day REAL NOT NULL CHECK(price_per_day > 0),
//     number_bed INTEGER NOT NULL CHECK(number_bed > 0),
//     description TEXT,
//     is_available INTEGER DEFAULT 1 CHECK(is_available IN (0, 1)),
//     FOREIGN KEY (accommodation_id) REFERENCES Accommodations(accommodation_id) ON DELETE CASCADE
// );

router.post('/:accommodationId/rooms', requireOwner, (req, res, next) => {
  
  const { accommodationId } = req.params;
  //check if accommodation belongs to owner
  db.get('SELECT * FROM Accommodations WHERE accommodation_id = ? AND owner_id = ?', [accommodationId, req.session.user.owner_id], (err, accommodation) => {
    if (err) return responseHelper.error(res, 'Error checking accommodation', 500, err.message);
    if (!accommodation) {
      return responseHelper.error(res, 'Accommodation not found or does not belong to you', 404);
    }

    const { number_guest, price_per_day, number_bed, description } = req.body;
    if (!number_guest || !price_per_day || !number_bed) {
      return responseHelper.validationError(res, 'Number of guests, price per day, and number of beds are required');
    }
    
    db.run(
      `INSERT INTO Rooms (accommodation_id, number_guest, price_per_day, number_bed, description)
       VALUES (?, ?, ?, ?, ?)`,
      [accommodationId, number_guest, price_per_day, number_bed, description || ''],
      function (err) {
        if (err) {
          return responseHelper.error(res, 'Error creating room', 500, err.message);
        }
        return responseHelper.success(res, { room_id: this.lastID }, 'Room created successfully', 201);
      }
    );
  });
});

// Get room in accommodation
// Available in date range
// Meet the constraint about number of guests
router.get('/:accommodationId/available', (req, res, next) => {
  console.log(req.query)

  const { accommodation_id } = req.params;
  const { check_in_date, check_out_date, number_guest } = req.query;
  
  if (!check_in_date || !check_out_date || !number_guest) {
    const e = new Error('Check-in date, check-out date and capacity are required');
      e.status = 400;
      throw e;
  }

  const query = `
    SELECT r.* FROM Rooms r
    WHERE 
      r.accommodation_id = ? AND r.is_available = 1
      
      -- Check capacity
      AND r.number_guest >= ?
      
      -- Except booked rooms
      AND NOT EXISTS (
        SELECT b.room_id FROM Bookings b
        WHERE b.accommodation_id = ?
          AND b.status != 'cancelled'
          AND b.check_in_date <= ?
          AND b.check_out_date >= ?
      )`;

  db.all(query, 
    [
      accommodation_id,
      number_guest,
      accommodation_id,
      check_in_date, check_out_date
    ],
    (err, rows) => {
      if (err) {
        console.error("SQL: ", err.message)
        return next(err)
      }

      return responseHelper.success(res, rows, 'Available rooms retrieved successfully');
    }
  );
});

module.exports = router;
