const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const responseHelper = require('../utils/responseHelper');
const { requireAuth, requireAdmin, requireOwner } = require('../middleware/auth');
const router = express.Router();

const db = new sqlite3.Database('./db/db.db');

// Helper function to validate date format (YYYY-MM-DD)
const isValidDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

//create new accommodation
router.post('/', requireOwner, (req, res, next) => {
  const { name, address, city, description, accommodation_type } = req.body;
  const country = 'Vietnam';
  const owner_id = req.session.user.owner_id;

  if (!owner_id || !name || !address || !city || !accommodation_type) {
    return responseHelper.validationError(res, 'Owner ID, name, address, city, country, and accommodation type are required');
  }

  const created_at = new Date().toISOString();

  db.run(
    `INSERT INTO Accommodations (owner_id, name, address, city, country, description, accommodation_type, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [owner_id, name, address, city, country, description, accommodation_type, created_at],
    function (err) {
      if (err) return responseHelper.error(res, 'Error creating accommodation', 500, err.message);
      return responseHelper.success(res, { accommodation_id: this.lastID }, 'Accommodation created successfully', 201);
    }
  );
});

// Update accommodation
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, address, city, country, description, accommodation_type, status } = req.body;

  db.run(
    `UPDATE Accommodations SET name = ?, address = ?, city = ?, country = ?, 
     description = ?, accommodation_type = ?, status = ?
     WHERE accommodation_id = ?`,
    [name, address, city, country, description, accommodation_type, status, id],
    function (err) {
      if (err) return responseHelper.error(res, 'Error updating accommodation', 500, err.message);
      if (this.changes === 0) {
        return responseHelper.error(res, 'Accommodation not found', 404);
      }
      return responseHelper.success(res, null, 'Accommodation updated successfully');
    }
  );
});

// Get single accommodation by ID with details
router.get('/:id(\\d+)', (req, res, next) => {
  const { id } = req.params;
  
  // Get accommodation details
  db.get(
    `SELECT 
      a.*,
      (SELECT AVG(rating) FROM Reviews WHERE accommodation_id = a.accommodation_id) as avg_rating,
      (SELECT COUNT(*) FROM Reviews WHERE accommodation_id = a.accommodation_id) as review_count,
      (SELECT COUNT(*) FROM Rooms WHERE accommodation_id = a.accommodation_id) as room_count,
      (SELECT MIN(price_per_day) FROM Rooms WHERE accommodation_id = a.accommodation_id) as min_price,
      (SELECT MAX(price_per_day) FROM Rooms WHERE accommodation_id = a.accommodation_id) as max_price
    FROM Accommodations a
    WHERE a.accommodation_id = ?`, 
    [id], 
    (err, accommodation) => {
      if (err) return responseHelper.error(res, 'Error retrieving accommodation', 500, err.message);
      if (!accommodation) {
        return responseHelper.error(res, 'Accommodation not found', 404);
      }
      
      // Get images
      db.all('SELECT image_url FROM Accommodation_Images WHERE accommodation_id = ?', [id], (err, images) => {
        if (err) return responseHelper.error(res, 'Error retrieving images', 500, err.message);
        accommodation.images = images.map(img => img.image_url);
        
        // Get amenities if available
        db.all(`
          SELECT am.amenity_id, am.name, am.description
          FROM accommodations_amenities aa
          JOIN Amenities am ON aa.amenity_id = am.amenity_id
          WHERE aa.accommodation_id = ?`, 
          [id], 
          (err, amenities) => {
            if (!err) {
              accommodation.amenities = amenities;
            } else {
              accommodation.amenities = [];
            }
            
            // Get reviews
            db.all(`
              SELECT r.*, u.full_name as reviewer_name
              FROM Reviews r
              LEFT JOIN Users u ON r.user_id = u.user_id
              WHERE r.accommodation_id = ?
              ORDER BY r.created_at DESC
              LIMIT 5`, 
              [id], 
              (err, reviews) => {
                if (!err) {
                  accommodation.reviews = reviews;
                } else {
                  accommodation.reviews = [];
                }
                
                return responseHelper.success(res, accommodation, 'Accommodation retrieved successfully');
              }
            );
          }
        );
      });
    }
  );
});

// Get all accommodations for a specific owner
// router.get('/owner', requireOwner, (req, res, next) => {
//   const owner_id = req.session.user.owner_id;

//   if (!owner_id) {
//     return responseHelper.validationError(res, 'Owner ID is required');
//   }

//   db.all(
//     `SELECT 
//       a.name,
//       a.address,
//       a.city,
//       a.country,
//       a.description,
//       a.accommodation_type,
//       a.status,
//       (SELECT AVG(rating) FROM Reviews WHERE accommodation_id = a.accommodation_id) as avg_rating,
//       (SELECT COUNT(*) FROM Reviews WHERE accommodation_id = a.accommodation_id) as review_count,
//       (SELECT COUNT(*) FROM Rooms WHERE accommodation_id = a.accommodation_id) as room_count,
//       (SELECT MIN(price_per_day) FROM Rooms WHERE accommodation_id = a.accommodation_id) as min_price,
//       (SELECT MAX(price_per_day) FROM Rooms WHERE accommodation_id = a.accommodation_id) as max_price
//     FROM Accommodations a
//     WHERE a.owner_id = ?
//     ORDER BY a.created_at DESC`,
//     [owner_id],
//     (err, accommodations) => {
//       if (err) {
//         console.error('Get owner accommodations error:', err);
//         return responseHelper.error(res, 'Error retrieving accommodations for owner', 500, err.message);
//       }

//       // If no accommodations are found, return an empty array
//       if (!accommodations || accommodations.length === 0) {
//         return responseHelper.success(res, [], 'No accommodations found for this owner');
//       }

//       // Get images for each accommodation
//       const promises = accommodations.map(acc => {
//         return new Promise((resolve) => {
//           db.all(
//             'SELECT image_url FROM Accommodation_Images WHERE accommodation_id = ? LIMIT 1', // Only get one image for thumbnail
//             [acc.accommodation_id],
//             (err, images) => {
//               if (!err && images) {
//                 acc.thumbnail_image = images.length > 0 ? images[0].image_url : null;
//               } else {
//                 acc.thumbnail_image = null;
//               }
//               resolve(acc);
//             }
//           );
//         });
//       });

//       Promise.all(promises)
//         .then(results => {
//           return responseHelper.success(
//             res, 
//             results, 
//             `Found ${results.length} accommodations for owner`
//           );
//         })
//         .catch(error => {
//           console.error('Error fetching thumbnail images for owner accommodations:', error);
//           // Even if image fetching fails, return the accommodations data
//           return responseHelper.success(res, accommodations, `Found ${accommodations.length} accommodations for owner (image fetching error)`);
//         });
//     }
//   );
// });

// Search accommodations with various filters
/**
 * Search endpoint that supports filtering by:
 * - Location (city, address, country)
 * - Date range availability (check_in_date, check_out_date)
 * - Room criteria (min_price, max_price, min_beds, min_guests)
 * - Amenities (comma-separated amenity IDs)
 * - Minimum rating (min_rating)
 * - Accommodation type (hotel, apartment, house, room)
 * 
 * All parameters are optional, providing more will narrow results.
 * Returns approved accommodations with calculated average rating,
 * room count, price range, max beds/guests, and thumbnail images.
 */
router.get('/search', (req, res, next) => {
  console.log('Search query:', req.query);
  const {
    city,
    address,
    country = 'Vietnam',
    accommodation_type,
    check_in_date,
    check_out_date,
    min_price,
    max_price,
    min_beds,
    min_guests,
    amenities,
    min_rating
  } = req.query;

  // Validate date range if provided
  if ((check_in_date && !isValidDate(check_in_date)) || (check_out_date && !isValidDate(check_out_date))) {
    return responseHelper.validationError(res, 'Invalid date format. Use YYYY-MM-DD');
  }

  if (check_in_date && check_out_date && new Date(check_in_date) >= new Date(check_out_date)) {
    return responseHelper.validationError(res, 'Check-out date must be after check-in date');
  }

  //build the base query with joins
  let query = `
    SELECT DISTINCT
      a.accommodation_id,
      a.name,
      a.address,
      a.city,
      a.country,
      a.description,
      a.accommodation_type,
      a.status,
      a.created_at,
      o.owner_id,
      (SELECT AVG(rating) FROM Reviews WHERE accommodation_id = a.accommodation_id) as avg_rating,
      (SELECT COUNT(*) FROM Rooms WHERE accommodation_id = a.accommodation_id) as room_count,
      (SELECT MIN(price_per_day) FROM Rooms WHERE accommodation_id = a.accommodation_id) as min_room_price,
      (SELECT MAX(price_per_day) FROM Rooms WHERE accommodation_id = a.accommodation_id) as max_room_price,
      (SELECT MAX(number_bed) FROM Rooms WHERE accommodation_id = a.accommodation_id) as max_beds,
      (SELECT MAX(number_guest) FROM Rooms WHERE accommodation_id = a.accommodation_id) as max_guests
    FROM Accommodations a
    JOIN Owners o ON a.owner_id = o.owner_id
    WHERE a.status = 'approved'
  `;

  const params = [];

  // Add location filters
  if (city) {
    query += ` AND a.city LIKE ?`;
    params.push(`%${city}%`);
  }
  
  if (address) {
    query += ` AND a.address LIKE ?`;
    params.push(`%${address}%`);
  }
  
  if (country) {
    query += ` AND a.country LIKE ?`;
    params.push(`%${country}%`);
  }
  
  if (accommodation_type) {
    query += ` AND a.accommodation_type = ?`;
    params.push(accommodation_type);
  }
  
  // Add rating filter
  if (min_rating) {
    query += ` AND (SELECT AVG(rating) FROM Reviews WHERE accommodation_id = a.accommodation_id) >= ?`;
    params.push(parseFloat(min_rating));
  }
  
  // Add room filters
  if (min_beds) {
    query += ` AND EXISTS (SELECT 1 FROM Rooms WHERE accommodation_id = a.accommodation_id AND number_bed >= ?)`;
    params.push(parseInt(min_beds));
  }
  
  if (min_guests) {
    query += ` AND EXISTS (SELECT 1 FROM Rooms WHERE accommodation_id = a.accommodation_id AND number_guest >= ?)`;
    params.push(parseInt(min_guests));
  }
  
  if (min_price) {
    query += ` AND EXISTS (SELECT 1 FROM Rooms WHERE accommodation_id = a.accommodation_id AND price_per_day >= ?)`;
    params.push(parseFloat(min_price));
  }
  
  if (max_price) {
    query += ` AND EXISTS (SELECT 1 FROM Rooms WHERE accommodation_id = a.accommodation_id AND price_per_day <= ?)`;
    params.push(parseFloat(max_price));
  }
  
  // Add date range availability filter
  if (check_in_date && check_out_date) {
    // This complex subquery checks if there's at least one room available during the date range
    query += `
      AND EXISTS (
        SELECT 1 FROM Rooms r 
        WHERE r.accommodation_id = a.accommodation_id 
        AND r.is_available = 1
        AND NOT EXISTS (
          SELECT 1 FROM Bookings b
          WHERE b.accommodation_id = r.accommodation_id
          AND b.room_id = r.room_id
          AND b.status IN ('confirmed', 'pending')
          AND (
            (b.check_in_date <= ? AND b.check_out_date > ?) OR
            (b.check_in_date < ? AND b.check_out_date >= ?) OR
            (b.check_in_date >= ? AND b.check_out_date <= ?)
          )
        )
      )
    `;
    params.push(
      check_out_date, check_in_date,
      check_out_date, check_in_date,
      check_in_date, check_out_date
    );
  }
  
  //add amenities filter (if the accommodations_amenities table exists)
  if (amenities) {
    const amenityIds = amenities.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
    if (amenityIds.length > 0) {
      const placeholders = amenityIds.map(() => '?').join(',');
      query += `
        AND a.accommodation_id IN (
          SELECT accommodation_id 
          FROM accommodations_amenities 
          WHERE amenity_id IN (${placeholders})
          GROUP BY accommodation_id 
          HAVING COUNT(DISTINCT amenity_id) = ${amenityIds.length}
        )
      `;
      params.push(...amenityIds);
    }
  }
  
  //finalize query with ordering
  query += ` ORDER BY avg_rating DESC, a.created_at DESC`;
  
  // Execute query
  db.all(query, params, (err, accommodations) => {
    if (err) {
      console.error('Search error:', err);
      return responseHelper.error(res, 'Error searching accommodations', 500, err.message);
    }
    
    // Get images for each accommodation
    const promises = accommodations.map(acc => {
      return new Promise((resolve) => {
        db.all(
          'SELECT image_url FROM Accommodation_Images WHERE accommodation_id = ? LIMIT 5',
          [acc.accommodation_id],
          (err, images) => {
            if (!err && images) {
              acc.images = images.map(img => img.image_url);
            } else {
              acc.images = [];
            }
            resolve(acc);
          }
        );
      });
    });
    
    Promise.all(promises)
      .then(results => {
        return responseHelper.success(
          res, 
          results, 
          `Found ${results.length} accommodations matching your search criteria`
        );
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        return responseHelper.success(res, accommodations, `Found ${accommodations.length} accommodations`);
      });
  });
});

module.exports = router;
