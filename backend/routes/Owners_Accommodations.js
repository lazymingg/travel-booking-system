const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const responseHelper = require('../utils/responseHelper');
const { requireAuth , requireOwner} = require('../middleware/auth');
const router = express.Router({ mergeParams: true });
const db = new sqlite3.Database('./db/db.db');


//list bookings for owner accommodations (optional status filter)

// Get all accommodations for a specific owner
router.get('/accommodations', requireOwner, (req, res, next) => {
  const owner_id = req.session.user.owner_id;

  if (!owner_id) {
    return responseHelper.validationError(res, 'Owner ID is required');
  }

  db.all(
    `SELECT 
        a.accommodation_id,
        a.name,
        a.address,
        a.city,
        a.country,
        a.description,
        a.accommodation_type,
        a.status,
        (SELECT AVG(rating) FROM Reviews WHERE accommodation_id = a.accommodation_id) as avg_rating,
        (SELECT COUNT(*) FROM Reviews WHERE accommodation_id = a.accommodation_id) as review_count,
        (SELECT COUNT(*) FROM Rooms WHERE accommodation_id = a.accommodation_id) as room_count,
        (SELECT MIN(price_per_day) FROM Rooms WHERE accommodation_id = a.accommodation_id) as min_price,
        (SELECT MAX(price_per_day) FROM Rooms WHERE accommodation_id = a.accommodation_id) as max_price
        FROM Accommodations a
        WHERE a.owner_id = ?
        ORDER BY a.created_at DESC`,
    [owner_id],
    (err, accommodations) => {
      if (err) {
        console.error('Get owner accommodations error:', err);
        return responseHelper.error(res, 'Error retrieving accommodations for owner', 500, err.message);
      }

      // If no accommodations are found1, return an empty array
      if (!accommodations || accommodations.length === 0) {
        return responseHelper.success(res, [], 'No accommodations found for this owner');
      }

      // Get images for each accommodation
      const promises = accommodations.map(acc => {
        return new Promise((resolve) => {
          db.all(
            'SELECT image_url FROM Accommodation_Images WHERE accommodation_id = ? LIMIT 1', // Only get one image for thumbnail
            [acc.accommodation_id],
            (err, images) => {
              if (!err && images) {
                acc.thumbnail_image = images.length > 0 ? images[0].image_url : null;
              } else {
                acc.thumbnail_image = null;
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
            `Found ${results.length} accommodations for owner`
          );
        })
        .catch(error => {
          console.error('Error fetching thumbnail images for owner accommodations:', error);
          // Even if image fetching fails, return the accommodations data
          return responseHelper.success(res, accommodations, `Found ${accommodations.length} accommodations for owner (image fetching error)`);
        });
    }
  );
});

module.exports = router;