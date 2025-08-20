// Simple authentication middleware
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/db.db');
const responseHelper = require('../utils/responseHelper');

const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ 
      error: 'Please login first' 
    });
  }
  next();
};

// Check if user is admin
const requireAdmin = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Please login first' });
  }
  
  if (req.session.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  
  next();
};

const requireOwner = (req, res, next) =>
{
  if (!req.session.user) {
    return res.status(401).json({ error: 'Please login first' });
  }
  
  db.all('SELECT * FROM Owners WHERE user_id = ?', [req.session.user.user_id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    if (rows.length === 0) {
      return res.status(403).json({ error: 'Owner access required' });
    }
    req.session.user.owner_id = rows[0].owner_id;
  next();
  })
}

module.exports = {
  requireAuth,
  requireAdmin,
  requireOwner
};
