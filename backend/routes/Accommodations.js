const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const responseHelper = require('../utils/responseHelper');
const { requireAuth, requireAdmin, requireOwner } = require('../middleware/auth');
const router = express.Router();

const db = new sqlite3.Database('./db/db.db');

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

module.exports = router;
