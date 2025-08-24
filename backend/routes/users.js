const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const responseHelper = require('../utils/responseHelper');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');

const db = new sqlite3.Database('./db/db.db');

//get current user info
router.get('/', requireAuth, (req, res, next) => {
  const id = req.session.user.user_id;
  db.get(
    'SELECT user_id, full_name, email, role, created_at, updated_at, phone_number, address FROM Users WHERE user_id = ?',
    [id],
    (err, row) => {
      if (err) return next(err);
      if (!row) {
        return responseHelper.error(res, 'User not found', 404);
      }
      // console.log(row);
      return responseHelper.success(res, row, 'User info retrieved successfully');
    }
  );
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
      responseHelper.success(res, { user_id: this.lastID });
    }
  );
});

// put update user
router.put('/:id', requireAuth, (req, res, next) => {
  // Use session's user id to ensure users can only update their own profile
  const id = req.session.user && req.session.user.user_id;
  if (!id) return responseHelper.error(res, 'Not authenticated', 401);

  // Do not accept password updates through this endpoint
  const { full_name, email, phone_number, address, role } = req.body;
  const updated_at = new Date().toISOString();

  db.run(
    `UPDATE Users SET full_name = ?, email = ?, phone_number = ?, address = ?, role = ?, updated_at = ?
     WHERE user_id = ?`,
    [full_name, email, phone_number, address, role, updated_at, id],
    function (err) {
      if (err) {
        return next(err);
      }
      if (this.changes === 0) {
        return responseHelper.error(res, 'User not found', 404);
      }
      return responseHelper.success(res, null, 'User updated successfully');
    }
  );
});

// delete user
router.delete('/:id', requireAuth, (req, res, next) => {
  // Only allow deleting own account via session
  const id = req.session.user && req.session.user.user_id;
  if (!id) return responseHelper.error(res, 'Not authenticated', 401);

  db.run('DELETE FROM Users WHERE user_id = ?', [id], function (err) {
    if (err) {
      return next(err);
    }
    if (this.changes === 0) {
      return responseHelper.error(res, 'User not found', 404);
    }
    return responseHelper.success(res, null, 'User deleted successfully');
  });
});

//

module.exports = router;