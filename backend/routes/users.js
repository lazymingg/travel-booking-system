const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite3.Database('./db/db.db');

//get all users
router.get('/', (req, res, next) => {
  db.all('SELECT * FROM Users', [], (err, rows) => {
    if (err) {
      return next(err);
    }
    res.json(rows);
  });
});

//get user by ID
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  db.get('SELECT * FROM Users WHERE user_id = ?', [id], (err, row) => {
    if (err) {
      return next(err);
    }
    if (!row) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(row);
  });
});

// Post create user
router.post('/', (req, res, next) => {
  const { full_name, email, password_hash, phone_number, address, role } = req.body;
  const created_at = new Date().toISOString();
  const updated_at = created_at;

  db.run(
    `INSERT INTO Users (full_name, email, password_hash, phone_number, address, role, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [full_name, email, password_hash, phone_number, address, role || 'customer', created_at, updated_at],
    function (err) {
      if (err) {
        return next(err);
      }
      res.status(201).json({ user_id: this.lastID });
    }
  );
});

// put update user
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { full_name, email, password_hash, phone_number, address, role } = req.body;
  const updated_at = new Date().toISOString();

  db.run(
    `UPDATE Users SET full_name = ?, email = ?, password_hash = ?, phone_number = ?, address = ?, role = ?, updated_at = ?
     WHERE user_id = ?`,
    [full_name, email, password_hash, phone_number, address, role, updated_at, id],
    function (err) {
      if (err) {
        return next(err);
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User updated successfully' });
    }
  );
});

// delete user
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  db.run('DELETE FROM Users WHERE user_id = ?', [id], function (err) {
    if (err) {
      return next(err);
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  });
});

module.exports = router;