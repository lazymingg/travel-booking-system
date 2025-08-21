const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const responseHelper = require('../utils/responseHelper');
const router = express.Router();

const db = new sqlite3.Database('./db/db.db');

// Get all amenities
router.get('/', (req, res) => {
  db.all('SELECT * FROM Amenities ORDER BY name ASC', [], (err, rows) => {
    if (err) return responseHelper.error(res, 'Error retrieving amenities', 500, err.message);
    return responseHelper.success(res, rows, 'Amenities retrieved successfully');
  });
});

// Create a new amenity
router.post('/', (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return responseHelper.validationError(res, 'Name is required', [{ field: 'name', message: 'Name is required' }]);
  }

  const created_at = new Date().toISOString();
  db.run('INSERT INTO Amenities (name, description, created_at) VALUES (?, ?, ?)',
    [name, description || null, created_at], function (err) {
      if (err) {
        // handle unique constraint or other DB errors
        return responseHelper.error(res, 'Error creating amenity', 500, err.message);
      }
      return responseHelper.success(res, { amenity_id: this.lastID }, 'Amenity created successfully', 201);
    }
  );
});

module.exports = router;
