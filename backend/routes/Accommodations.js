const express = require('express');
const sqlite3 = require('sqlite3').verbose();
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
    if (err) return next(err);
    res.json(rows);
  });
});

// Get accommodation by ID with rooms
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  
  // Get accommodation details
  db.get('SELECT * FROM Accommodations WHERE accommodation_id = ?', [id], (err, accommodation) => {
    if (err) return next(err);
    if (!accommodation) {
      return res.status(404).json({ error: 'Accommodation not found' });
    }

    // Get rooms for this accommodation
    db.all('SELECT * FROM Rooms WHERE accommodation_id = ?', [id], (err, rooms) => {
      if (err) return next(err);
      
      accommodation.rooms = rooms;
      res.json(accommodation);
    });
  });
});

// Create new accommodation
router.post('/', (req, res, next) => {
  const { owner_id, name, address, city, country, description, accommodation_type } = req.body;
  const created_at = new Date().toISOString();

  db.run(
    `INSERT INTO Accommodations (owner_id, name, address, city, country, description, accommodation_type, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [owner_id, name, address, city, country, description, accommodation_type, created_at],
    function (err) {
      if (err) return next(err);
      res.status(201).json({ 
        message: 'Accommodation created successfully',
        accommodation_id: this.lastID 
      });
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
      if (err) return next(err);
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Accommodation not found' });
      }
      res.json({ message: 'Accommodation updated successfully' });
    }
  );
});

// Delete accommodation
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  db.run('DELETE FROM Accommodations WHERE accommodation_id = ?', [id], function (err) {
    if (err) return next(err);
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Accommodation not found' });
    }
    res.json({ message: 'Accommodation deleted successfully' });
  });
});

// Search accommodations
router.get('/search/:term', (req, res, next) => {
  const { term } = req.params;
  const searchTerm = `%${term}%`;

  db.all(
    `SELECT * FROM Accommodations 
     WHERE name LIKE ? OR address LIKE ? OR city LIKE ? OR description LIKE ?
     AND status = 'approved'`,
    [searchTerm, searchTerm, searchTerm, searchTerm],
    (err, rows) => {
      if (err) return next(err);
      res.json(rows);
    }
  );
});

module.exports = router;
