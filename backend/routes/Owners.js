const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const responseHelper = require('../utils/responseHelper');
const { requireAdmin, requireAuth } = require('../middleware/auth');
const router = express.Router();

const db = new sqlite3.Database('./db/db.db');

// Get all owners
router.get('/',  (req, res, next) => {
  const { status } = req.query;
  let query = `SELECT o.*, u.full_name, u.email, u.phone_number 
               FROM Owners o 
               LEFT JOIN Users u ON o.user_id = u.user_id 
               WHERE 1=1`;
  let params = [];

  if (status) {
    query += ' AND o.host_status = ?';
    params.push(status);
  }

  db.all(query, params, (err, rows) => {
    if (err) return next(err);
    return responseHelper.success(res, rows, 'Owners retrieved successfully');
  });
});

// // Get owner by ID
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  
  const query = `SELECT o.*, u.full_name, u.email, u.phone_number, u.address
                 FROM Owners o 
                 LEFT JOIN Users u ON o.user_id = u.user_id 
                 WHERE o.owner_id = ?`;

  db.get(query, [id], (err, row) => {
    if (err) return next(err);
    if (!row) {
      return responseHelper.error(res, 'Owner not found' );
    }
    responseHelper.success(res, row);
  });
});

// // Get owner by user_id
router.get('/user/:user_id', (req, res, next) => {
  const { user_id } = req.params;
  
  const query = `SELECT o.*, u.full_name, u.email, u.phone_number, u.address
                 FROM Owners o 
                 LEFT JOIN Users u ON o.user_id = u.user_id 
                 WHERE o.user_id = ?`;

  db.get(query, [user_id], (err, row) => {
    if (err) return next(err);
    if (!row) {
      return responseHelper.error(res, 'Owner not found' );
    }
    responseHelper.success(res, row);
  });
});

// // Create new owner (register as host)
router.post('/', requireAuth, (req, res, next) => {
  const { bank_account, id_card, business_license } = req.body;
  const user_id = req.session.user.user_id; // Get user_id from session
  const created_at = new Date().toISOString();

  // Check if user already registered as owner
  db.get('SELECT * FROM Owners WHERE user_id = ?', [user_id], (err, existingOwner) => {
    if (err) return next(err);
    if (existingOwner) {
      return responseHelper.validationError(res, 'User is already registered as an owner' );
    }

    db.run(
      `INSERT INTO Owners (user_id, bank_account, id_card, business_license, created_at)
       VALUES (?, ?, ?, ?, ?)`,
      [user_id, bank_account, id_card, business_license, created_at],
      function (err) {
        if (err) return next(err);
        responseHelper.success(res, { 
          message: 'Owner registration submitted successfully',
          owner_id: this.lastID 
        });
      }
    );
  });
});

// // Update owner information
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { bank_account, id_card, business_license } = req.body;

  db.run(
    `UPDATE Owners SET bank_account = ?, id_card = ?, business_license = ?
     WHERE owner_id = ?`,
    [bank_account, id_card, business_license, id],
    function (err) {
      if (err) return next(err);
      if (this.changes === 0) {
        return responseHelper.error(res, 'Owner not found' );
      }
      responseHelper.success(res, { message: 'Owner information updated successfully' });
    }
  );
});

// // Update owner status (approve/reject)
router.patch('/:id/status', (req, res, next) => {
  const { id } = req.params;
  const { host_status } = req.body;

  if (!['pending', 'approved', 'rejected'].includes(host_status)) {
    return responseHelper.validationError(res, 'Invalid status' );
  }

  db.run(
    'UPDATE Owners SET host_status = ? WHERE owner_id = ?',
    [host_status, id],
    function (err) {
      if (err) return next(err);
      if (this.changes === 0) {
        return responseHelper.error(res, 'Owner not found' );
      }
      responseHelper.success(res, { message: `Owner status updated to ${host_status}` });
    }
  );
});

// // Get owner's accommodations
router.get('/:id/accommodations', (req, res, next) => {
  const { id } = req.params;
  
  db.all('SELECT * FROM Accommodations WHERE owner_id = ?', [id], (err, rows) => {
    if (err) return next(err);
    responseHelper.success(res, rows);
  });
});

// Get owner's bookings
router.get('/:id/bookings', (req, res, next) => {
  const { id } = req.params;
  
  const query = `SELECT b.*, u.full_name as guest_name, u.email as guest_email,
                        a.name as accommodation_name, r.room_type
                 FROM Bookings b
                 LEFT JOIN Users u ON b.user_id = u.user_id
                 LEFT JOIN Accommodations a ON b.accommodation_id = a.accommodation_id
                 LEFT JOIN Rooms r ON b.accommodation_id = r.accommodation_id AND b.room_id = r.room_id
                 WHERE b.owner_id = ?
                 ORDER BY b.created_at DESC`;

  db.all(query, [id], (err, rows) => {
    if (err) return next(err);
    responseHelper.success(res, rows);
  });
});

// // Get owner's revenue statistics
router.get('/:id/stats', (req, res, next) => {
  const { id } = req.params;
  
  const statsQuery = `
    SELECT 
      COUNT(b.booking_id) as total_bookings,
      COUNT(CASE WHEN b.status = 'confirmed' THEN 1 END) as confirmed_bookings,
      COUNT(CASE WHEN b.status = 'completed' THEN 1 END) as completed_bookings,
      SUM(CASE WHEN b.status = 'completed' THEN b.total_price ELSE 0 END) as total_revenue,
      COUNT(DISTINCT a.accommodation_id) as total_accommodations
    FROM Bookings b
    LEFT JOIN Accommodations a ON b.accommodation_id = a.accommodation_id
    WHERE b.owner_id = ?`;

  db.get(statsQuery, [id], (err, stats) => {
    if (err) return next(err);
    responseHelper.success(res, stats);
  });
});

module.exports = router;
