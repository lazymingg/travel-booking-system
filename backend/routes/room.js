const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite3.Database('./db/db.db');

// get all rooms in an accomodation
router.get('/room', (req, res, next) => {
  db.all('SELECT * FROM Rooms', [], (err, rows) => {
    if (err) {
      return next(err);
    }
    res.json(rows);
  });
});

// get room by id
router.get('/room/:id', (req, res, next) => {
    const { id } = req.params.id;
    db.get('SELECT * FROM Rooms WHERE room_id = ?', [id], (err, row) => {
      if (err) {
        return next(err);
      }

      if (!row) {
        return res.status(404).json({error: 'Room not found'});
      }

      res.json(rows);
    });
});


// create a new room
router.post('/room', (req, res, next) => {
  const { accommodation_id, room_type, price_per_night, capacity, description, is_available } = req.body;
  const created_at = new Date().toISOString();
  const updated_at = created_at;

  db.run(
    `INSERT INTO Rooms (accommodation_id, room_type, price_per_night, capacity, description, is_available, created_at, updated_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [accommodation_id, room_type, price_per_night, capacity, description, is_available, created_at, updated_at],
    function (err) {
      if (err) {
        return next(err);
      }

      res.status(201).json({message: 'Room created', room_id: this.lastID});
    }
  );
});

//update room
router.put('/room', (req, res, next) => {
  const { id } = req.params;
  const { accommodation_id, room_type, price_per_night, capacity, description, is_available } = res.body;
  const updated_at = new Date().toISOString();

  db.run(
    `UPDATE Rooms SET accommodation_id = ?, room_type = ?, price_per_night = ?, capacity = ?, description = ?, is_available = ?, updated_at = ?
    WHERE room_id = ?`,
    [accommodation_id, room_type, price_per_night, capacity, description, is_available, updated_at, id],
    function (err) {
      if (err) {
        return next(err);
      }

      if (this.changes == 0) {
        return res.status(404).json({ error: "Room not found" });
      }

      res.json({ message: 'Room updated successfully'})
    }
  );
});

// delete room
router.delete('/room/:id', (req, res, next) => {
  const { id } = req.params

  db.run(
    `DELETE FROM Rooms WHERE room_id = ?`, [id], (err) => {
      if (err) {
        return next(err);
      }

      if (this.changes == 0) {
        return res.status(404).json({ error: 'Room not found'});
      }

      res.json({ message: 'Room deleted successfully' });
    }
  );
});

module.exports = router;