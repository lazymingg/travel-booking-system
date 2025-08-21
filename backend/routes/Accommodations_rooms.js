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


module.exports = router;
