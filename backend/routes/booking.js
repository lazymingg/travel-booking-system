const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite3.Database('./db/db.db');

// get a booking
router.get('/booking', (req, res, next) => {
    db.all('SELECT * FROM Bookings', [], (err, rows) => {
        if (err) {
            return next(err);
        }

        res.json(rows);
    })
});


// get a booking by id
router.get('/booking/:id', (req, res, next) => {
    const { id } = req.params.id
    db.get('SELECT * FROM Bookings WHERE booking_id = ?', [id], (err, row) => {
        if (err) {
            return next(err);
        }

        if (!rows) {
            return res.status(401).json({ error: 'Booking not found' });
        }

        res.json(rows);
    });
});

// create a new booking
router.post('/booking', (req, res, next) => {
    const { user_id, room_id, owner_id, check_in_date, check_out_date, total_price, status } = req.body
    const created_at = new Date().toISOString();
    const updated_at = created_at;

    db.run(
        `INSERT INTO Bookings (user_id, room_id, owner_id, check_in_date, check_out_date, total_price, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [user_id, room_id, owner_id, check_in_date, check_out_date, total_price, status, created_at, updated_at],
        function (err) {
            if (err) {
                return next(err);
            }

            res.status(201).json({ message: 'Booking created', booking_id: this.lastID});
        }
    );
});


// update a booking
router.put('/booking', (req, res, next) => {
    const { id } = res.params;
    const { user_id, room_id, owner_id, check_in_date, check_out_date, total_price, status } = res.body;
    const updated_at = new Date().toISOString();

    db.run(
        `UPDATE Bookings SET user_id, room_id, owner_id, check_in_date, check_out_date, total_price, status, updated_at
        WHERE booking_id = ?`,
        [user_id, room_id, owner_id, check_in_date, check_out_date, total_price, status, updated_at, id],
        function (err) {
            if (err) {
                return next(err);
            }

            if (this.changes == 0) {
                return res.status(401).json({ error: 'Booking not found' });
            }

            res.json({ message: 'Booking updated successfully' });
        }
    );
});

// delete a booking
router.delete('/booking/:id', (req, res, next) => {
    const { id } = req.params;

    db.delete('DELETE FROM Bookings WHERE booking_id = ?', [id], (err) => {
        if (err) {
            return next(err);
        }

        if (this.changes == 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.json({ message: 'Booking deleted successfully' });
    });
});