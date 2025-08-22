const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const responseHelper = require('../utils/responseHelper');
const { requireAuth , requireOwner} = require('../middleware/auth');
const router = express.Router();

const db = new sqlite3.Database('./db/db.db');

// Helper function to validate date format (YYYY-MM-DD)
const isValidDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

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
/**
 * Find available rooms in an accommodation that:
 * 1. Are available (is_available = 1)
 * 2. Can accommodate the requested number of guests
 * 3. Are not already booked during the requested date range
 * 
 * Query parameters:
 * - check_in_date: ISO date string (YYYY-MM-DD)
 * - check_out_date: ISO date string (YYYY-MM-DD)
 * - number_guest: Minimum number of guests the room should accommodate
 * - price_min: (optional) Minimum price per day
 * - price_max: (optional) Maximum price per day
 * - min_beds: (optional) Minimum number of beds
 */
// router.get('/:accommodationId/available', (req, res, next) => {
//   console.log(req.query)

//   // param name in route is :accommodationId
//   const { accommodationId } = req.params;
//   const { 
//     check_in_date, 
//     check_out_date, 
//     number_guest,
//     price_min,
//     price_max,
//     min_beds
//   } = req.query;
  
//   if (!check_in_date || !check_out_date || !number_guest) {
//     return responseHelper.validationError(res, 'Check-in date, check-out date and number of guests are required');
//   }

//   // Validate date format and range
//   if (!isValidDate(check_in_date) || !isValidDate(check_out_date)) {
//     return responseHelper.validationError(res, 'Invalid date format. Use YYYY-MM-DD');
//   }

//   if (new Date(check_in_date) >= new Date(check_out_date)) {
//     return responseHelper.validationError(res, 'Check-out date must be after check-in date');
//   }

//   let query = `
//     SELECT 
//       r.*,
//       (SELECT COUNT(*) FROM Room_Images ri WHERE ri.accommodation_id = r.accommodation_id AND ri.room_id = r.room_id) as image_count
//     FROM Rooms r
//     WHERE 
//       r.accommodation_id = ? AND r.is_available = 1
      
//       -- Check capacity
//       AND r.number_guest >= ?
      
//       -- Except booked rooms
//       AND NOT EXISTS (
//         SELECT 1 FROM Bookings b
//         WHERE b.accommodation_id = r.accommodation_id
//           AND b.room_id = r.room_id
//           AND b.status NOT IN ('cancelled', 'completed')
//           AND (
//             (b.check_in_date <= ? AND b.check_out_date > ?) OR
//             (b.check_in_date < ? AND b.check_out_date >= ?) OR
//             (b.check_in_date >= ? AND b.check_out_date <= ?)
//           )
//       )`;

//   const params = [
//     accommodationId,
//     number_guest,
//     check_out_date, check_in_date,
//     check_out_date, check_in_date,
//     check_in_date, check_out_date
//   ];

//   // Add optional filters
//   if (price_min) {
//     query += ' AND r.price_per_day >= ?';
//     params.push(parseFloat(price_min));
//   }
  
//   if (price_max) {
//     query += ' AND r.price_per_day <= ?';
//     params.push(parseFloat(price_max));
//   }
  
//   if (min_beds) {
//     query += ' AND r.number_bed >= ?';
//     params.push(parseInt(min_beds));
//   }
  
//   query += ' ORDER BY r.price_per_day ASC';

//   db.all(query, params, (err, rooms) => {
//     if (err) {
//       console.error("SQL Error: ", err.message);
//       return responseHelper.error(res, 'Error retrieving available rooms', 500, err.message);
//     }

//     // Get images for each room
//     const promises = rooms.map(room => {
//       return new Promise((resolve) => {
//         db.all(
//           'SELECT image_url FROM Room_Images WHERE accommodation_id = ? AND room_id = ? LIMIT 5',
//           [room.accommodation_id, room.room_id],
//           (err, images) => {
//             if (!err && images) {
//               room.images = images.map(img => img.image_url);
//             } else {
//               room.images = [];
//             }
//             resolve(room);
//           }
//         );
//       });
//     });
    
//     Promise.all(promises)
//       .then(results => {
//         return responseHelper.success(
//           res, 
//           results, 
//           `Found ${results.length} available rooms matching your criteria`
//         );
//       })
//       .catch(error => {
//         console.error('Error fetching room images:', error);
//         return responseHelper.success(res, rooms, `Found ${rooms.length} available rooms`);
//       });
//   });
// });

/**
 * Get the count of available rooms for an accommodation
 * Useful for search results to display room availability counts
 * 
 * Query parameters:
 * - check_in_date: ISO date string (YYYY-MM-DD)
 * - check_out_date: ISO date string (YYYY-MM-DD)
 * - number_guest: Minimum number of guests
 */
// router.get('/:accommodationId/available/count', (req, res, next) => {
//   const { accommodationId } = req.params;
//   const { check_in_date, check_out_date, number_guest } = req.query;
  
//   if (!check_in_date || !check_out_date) {
//     return responseHelper.validationError(res, 'Check-in date and check-out date are required');
//   }

//   // Validate date format and range
//   if (!isValidDate(check_in_date) || !isValidDate(check_out_date)) {
//     return responseHelper.validationError(res, 'Invalid date format. Use YYYY-MM-DD');
//   }

//   if (new Date(check_in_date) >= new Date(check_out_date)) {
//     return responseHelper.validationError(res, 'Check-out date must be after check-in date');
//   }

//   let query = `
//     SELECT 
//       COUNT(*) as available_room_count,
//       MIN(price_per_day) as min_price,
//       MAX(price_per_day) as max_price,
//       SUM(CASE WHEN number_guest >= ? THEN 1 ELSE 0 END) as rooms_for_requested_guests
//     FROM Rooms r
//     WHERE 
//       r.accommodation_id = ? 
//       AND r.is_available = 1
//       AND NOT EXISTS (
//         SELECT 1 FROM Bookings b
//         WHERE b.accommodation_id = r.accommodation_id
//           AND b.room_id = r.room_id
//           AND b.status NOT IN ('cancelled', 'completed')
//           AND (
//             (b.check_in_date <= ? AND b.check_out_date > ?) OR
//             (b.check_in_date < ? AND b.check_out_date >= ?) OR
//             (b.check_in_date >= ? AND b.check_out_date <= ?)
//           )
//       )`;

//   const params = [
//     number_guest || 1,
//     accommodationId,
//     check_out_date, check_in_date,
//     check_out_date, check_in_date,
//     check_in_date, check_out_date
//   ];

//   db.get(query, params, (err, result) => {
//     if (err) {
//       console.error("SQL Error: ", err.message);
//       return responseHelper.error(res, 'Error retrieving room count', 500, err.message);
//     }

//     return responseHelper.success(res, result, 'Room availability count retrieved');
//   });
// });

// Get room in accommodation
// Available in date range
// Meet the constraint about number of guests
router.get('/:accommodationId/available', (req, res, next) => {
  console.log(req.query)

  // param name in route is :accommodationId
  const { accommodationId } = req.params;
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
      accommodationId,
      number_guest,
      accommodationId,
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
