// Simple authentication routes
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite3.Database('./db/db.db');

// Simple login
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  
  db.get('SELECT * FROM Users WHERE email = ?', [email], (err, user) => {
    if (err) return next(err);
    
    if (!user || user.password_hash !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Store user in session
    req.session.user = {
      user_id: user.user_id,
      full_name: user.full_name,
      email: user.email,
      role: user.role
    };
    
    res.json({
      message: 'Login successful',
      user: req.session.user
    });
  });
});

// Simple register
router.post('/register', (req, res, next) => {
  const { full_name, email, password } = req.body;
  
  if (!full_name || !email || !password) {
    return res.status(400).json({ error: 'Full name, email, and password required' });
  }
  
  const created_at = new Date().toISOString();
  
  db.run(
    `INSERT INTO Users (full_name, email, password_hash, role, created_at, updated_at)
     VALUES (?, ?, ?, 'customer', ?, ?)`,
    [full_name, email, password, created_at, created_at],
    function (err) {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
          return res.status(409).json({ error: 'Email already exists' });
        }
        return next(err);
      }
      
      res.status(201).json({ 
        message: 'Registration successful',
        user_id: this.lastID 
      });
    }
  );
});

// Get current user
router.get('/me', (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ error: 'Not logged in' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logout successful' });
  });
});
module.exports = router;
