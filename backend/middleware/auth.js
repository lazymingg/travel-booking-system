// Simple authentication middleware
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/db.db');
const responseHelper = require('../utils/responseHelper');

const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return responseHelper.error(res, 'Please login first', 401);
  }
  return next();
};

// Check if user is admin
const requireAdmin = (req, res, next) => {
  if (!req.session.user) {
    return responseHelper.error(res, 'Please login first', 401);
  }
  
  if (req.session.user.role !== 'admin') {
    return responseHelper.error(res, 'Admin access required', 403);
  }
  
  return next();
};

const requireOwner = (req, res, next) => {
  if (!req.session.user) {
    return responseHelper.error(res, 'Please login first', 401);
  }
  
  db.all('SELECT * FROM Owners WHERE user_id = ?', [req.session.user.user_id], (err, rows) => {
    if (err) {
      return responseHelper.error(res, 'Database error', 500, err.message);
    }
    if (rows.length === 0) {
      return responseHelper.error(res, 'Owner access required', 403);
    }
    req.session.user.owner_id = rows[0].owner_id;
    return next();
  });
};

module.exports = {
  requireAuth,
  requireAdmin,
  requireOwner
};
