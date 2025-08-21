const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const responseHelper = require('../utils/responseHelper');
const router = express.Router();

const db = new sqlite3.Database('./db/db.db');

// List amenities for an accommodation
router.get('/:accommodation_id/amenities', (req, res) => {
  const { accommodation_id } = req.params;
  const query = `
    SELECT a.* FROM accommodations_amenities aa
    JOIN Amenities a ON aa.amenity_id = a.amenity_id
    WHERE aa.accommodation_id = ?
    ORDER BY a.name ASC`;
  db.all(query, [accommodation_id], (err, rows) => {
    if (err) return responseHelper.error(res, 'Error retrieving accommodation amenities', 500, err.message);
    return responseHelper.success(res, rows, 'Accommodation amenities retrieved successfully');
  });
});

//attach amenities to an accommodation (amenity_ids can be array or single value)
router.post('/:accommodation_id/amenities', (req, res) => {
  const { accommodation_id } = req.params;
  let { amenity_ids } = req.body;
  if (!amenity_ids) {
    return responseHelper.validationError(res, 'amenity_ids is required', [{ field: 'amenity_ids', message: 'amenity_ids is required' }]);
  }
  if (!Array.isArray(amenity_ids)) amenity_ids = [amenity_ids];

  db.serialize(() => {
    const stmt = db.prepare('INSERT OR IGNORE INTO accommodations_amenities (accommodation_id, amenity_id, created_at) VALUES (?, ?, ?)');
    const created_at = new Date().toISOString();
    amenity_ids.forEach(id => {
      stmt.run(accommodation_id, id, created_at);
    });
    stmt.finalize(err => {
      if (err) return responseHelper.error(res, 'Error attaching amenities to accommodation', 500, err.message);
      return responseHelper.success(res, { attached: amenity_ids.length }, 'Amenities attached to accommodation successfully');
    });
  });
});

//remove an amenity from an accommodation
router.delete('/:accommodation_id/amenities/:amenity_id', (req, res) => {
  const { accommodation_id, amenity_id } = req.params;
  db.run('DELETE FROM accommodations_amenities WHERE accommodation_id = ? AND amenity_id = ?',
    [accommodation_id, amenity_id], function (err) {
      if (err) return responseHelper.error(res, 'Error removing amenity from accommodation', 500, err.message);
      if (this.changes === 0) return responseHelper.error(res, 'Amenity not found on accommodation', 404);
      return responseHelper.success(res, null, 'Amenity removed from accommodation successfully');
    }
  );
});

module.exports = router;
