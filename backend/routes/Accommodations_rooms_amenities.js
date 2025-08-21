const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const responseHelper = require('../utils/responseHelper');
const router = express.Router();

const db = new sqlite3.Database('./db/db.db');

// List amenities for a specific room
router.get('/:accommodation_id/:room_id/amenities', (req, res) => {
  const { accommodation_id, room_id } = req.params;
  const query = `
    SELECT a.* FROM rooms_amenities ra
    JOIN Amenities a ON ra.amenity_id = a.amenity_id
    WHERE ra.accommodation_id = ? AND ra.room_id = ?
    ORDER BY a.name ASC`;
  db.all(query, [accommodation_id, room_id], (err, rows) => {
    if (err) return responseHelper.error(res, 'Error retrieving room amenities', 500, err.message);
    return responseHelper.success(res, rows, 'Room amenities retrieved successfully');
  });
});

// Attach amenities to a room (amenity_ids can be array or single value)
router.post('/:accommodation_id/:room_id/amenities', (req, res) => {
  const { accommodation_id, room_id } = req.params;
  let { amenity_ids } = req.body;
  if (!amenity_ids) {
    return responseHelper.validationError(res, 'amenity_ids is required', [{ field: 'amenity_ids', message: 'amenity_ids is required' }]);
  }
  if (!Array.isArray(amenity_ids)) amenity_ids = [amenity_ids];

  db.serialize(() => {
    const stmt = db.prepare('INSERT OR IGNORE INTO rooms_amenities (accommodation_id, room_id, amenity_id, created_at) VALUES (?, ?, ?, ?)');
    const created_at = new Date().toISOString();
    amenity_ids.forEach(id => {
      stmt.run(accommodation_id, room_id, id, created_at);
    });
    stmt.finalize(err => {
      if (err) return responseHelper.error(res, 'Error attaching amenities', 500, err.message);
      return responseHelper.success(res, { attached: amenity_ids.length }, 'Amenities attached successfully');
    });
  });
});

// Remove an amenity from a room
router.delete('/:accommodation_id/:room_id/amenities/:amenity_id', (req, res) => {
  const { accommodation_id, room_id, amenity_id } = req.params;
  db.run('DELETE FROM rooms_amenities WHERE accommodation_id = ? AND room_id = ? AND amenity_id = ?',
    [accommodation_id, room_id, amenity_id], function (err) {
      if (err) return responseHelper.error(res, 'Error removing amenity from room', 500, err.message);
      if (this.changes === 0) return responseHelper.error(res, 'Amenity not found on room', 404);
      return responseHelper.success(res, null, 'Amenity removed from room successfully');
    }
  );
});

module.exports = router;
