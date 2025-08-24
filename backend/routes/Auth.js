// Simple authentication routes
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const responseHelper = require('../utils/responseHelper');
const router = express.Router();

const db = new sqlite3.Database('./db/db.db');

//ssimple login
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return responseHelper.validationError(res, 'Email and password required');
  }
  
  db.get('SELECT * FROM Users WHERE email = ?', [email], (err, user) => {
    if (err) return responseHelper.error(res, 'Error checking user credentials', 500, err.message);
    
    if (!user || user.password_hash !== password) {
      return responseHelper.error(res, 'Invalid email or password', 401, 'May be email or password is incorrect');
    }
    db.get('SELECT owner_id FROM Owners WHERE user_id = ?', [user.user_id], (err2, ownerRow) => {
      if (err2) {
        console.error('Error checking Owners table for user:', err2.message);
        // fallback to stored role or default to 'customer'
        const fallbackRole = user.role || 'customer';
        req.session.user = {
          user_id: user.user_id,
          full_name: user.full_name,
          email: user.email,
          role: fallbackRole
        };
        return responseHelper.success(res, req.session.user, 'Login successful');
      }

      const assignedRole = ownerRow ? 'owner' : (user.role || 'customer');
      req.session.user = {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: assignedRole
      };

      return responseHelper.success(res, req.session.user, 'Login successful');
    });
  });
});

// Simple register
router.post('/register', (req, res, next) => {
  console.log(req.body);
  const { full_name, email, password } = req.body;
  
  if (!full_name || !email || !password) {
    return responseHelper.validationError(res, 'Full name, email, and password required');
  }
  
  const created_at = new Date().toISOString();
  
  db.run(
    `INSERT INTO Users (full_name, email, password_hash, role, created_at, updated_at)
     VALUES (?, ?, ?, 'customer', ?, ?)`,
    [full_name, email, password, created_at, created_at],
    function (err) {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
          console.log('Email already exists:', email);
          return responseHelper.error(res, 'Email already exists', 409);
        }
        console.log('Error creating user:', err.message);
        return responseHelper.error(res, 'Error creating user', 500, err.message);
      }
      
      return responseHelper.success(res, { user_id: this.lastID }, 'Registration successful', 201);
    }
  );
});

// Get current user
router.get('/me', (req, res) => {
  if (req.session.user) {
    // Trả về toàn bộ đối tượng user từ session, lồng trong key 'user'
    return responseHelper.success(res, { user: req.session.user }, 'User info retrieved successfully');
  } else {
    return responseHelper.error(res, 'Not logged in', 401);
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return responseHelper.error(res, 'Logout failed', 500);
    }
    return responseHelper.success(res, null, 'Logout successful');
  });
});

// log out 
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return responseHelper.error(res, 'Logout failed', 500);
    }
    return responseHelper.success(res, null, 'Logout successful');
  });
});

module.exports = router;
