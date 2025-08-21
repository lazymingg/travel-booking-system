const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const responseHelper = require('../utils/responseHelper');
const router = express.Router();

const db = new sqlite3.Database('./db/db.db');

// Get all accommodations with optional filtering
router.get('/', (req, res, next) => {
  const { city, country, type, status } = req.query;
  let query = 'SELECT * FROM Accommodations WHERE 1=1';
  let params = [];

  if (city) {
    query += ' AND city = ?';
    params.push(city);
  }
  if (country) {
    query += ' AND country = ?';
    params.push(country);
  }
  if (type) {
    query += ' AND accommodation_type = ?';
    params.push(type);
  }
  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }

  db.all(query, params, (err, rows) => {
    if (err) return responseHelper.error(res, 'Error retrieving accommodations', 500, err.message);
    return responseHelper.success(res, rows, 'Accommodations retrieved successfully');
  });
});

// Get accommodation by ID with rooms
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  
  // Get accommodation details
  db.get('SELECT * FROM Accommodations WHERE accommodation_id = ?', [id], (err, accommodation) => {
    if (err) return responseHelper.error(res, 'Error retrieving accommodation', 500, err.message);
    if (!accommodation) {
      return responseHelper.error(res, 'Accommodation not found', 404);
    }

    // Get rooms for this accommodation
    db.all('SELECT * FROM Rooms WHERE accommodation_id = ?', [id], (err, rooms) => {
      if (err) return responseHelper.error(res, 'Error retrieving rooms', 500, err.message);
      
      accommodation.rooms = rooms;
      return responseHelper.success(res, accommodation, 'Accommodation retrieved successfully');
    });
  });
});

// Create new accommodation
router.post('/', (req, res, next) => {
  const { owner_id, name, address, city, country, description, accommodation_type } = req.body;
  
  if (!owner_id || !name || !address || !city || !country || !accommodation_type) {
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

// Delete accommodation
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  db.run('DELETE FROM Accommodations WHERE accommodation_id = ?', [id], function (err) {
    if (err) return responseHelper.error(res, 'Error deleting accommodation', 500, err.message);
    if (this.changes === 0) {
      return responseHelper.error(res, 'Accommodation not found', 404);
    }
    return responseHelper.success(res, null, 'Accommodation deleted successfully');
  });
});

// Search accommodations
router.get('/search/:term', (req, res, next) => {
  const { term } = req.params;
  const searchTerm = `%${term}%`;

  db.all(
    `SELECT * FROM Accommodations 
  WHERE (name LIKE ? OR address LIKE ? OR city LIKE ? OR description LIKE ?)
  AND status = 'approved'`,
    [searchTerm, searchTerm, searchTerm, searchTerm],
    (err, rows) => {
      if (err) return responseHelper.error(res, 'Error searching accommodations', 500, err.message);
      return responseHelper.success(res, rows, 'Search results retrieved successfully');
    }
  );
});

module.exports = router;
