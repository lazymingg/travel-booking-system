const responseHelper = require('../utils/responseHelper');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite3.Database('./db/db.db');

// get all payments
router.get('/', (req, res, next) => {
    db.all('SELECT * FROM Payments', [], (err, rows) => {
        if (err) return next(err);
        responseHelper.success(res, rows);
    });
});

// get payment by id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    db.get('SELECT * FROM Payments WHERE payment_id = ?', [id], (err, row) => {
        if (err) return next(err);
        if (!row) {
            return responseHelper.error(res, 'Payment not found' );
        }
        responseHelper.success(res, row);
    });
});
// create payment
router.post('/', (req, res, next) => {
    const { payment_id, booking_id, amount, host_amount, payment_method, payment_status, payment_date } = req.body;

    db.run(
        'INSERT INTO Payments(payment_id, booking_id, amount, host_amount, payment_method, payment_status, payment_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [payment_id, booking_id, amount, host_amount, payment_method, payment_status, payment_date],
        function (err) {
            if (err) return next(err);
            responseHelper.success(res, { message: 'Payment created successfully', id: this.lastID });
        }
    );
});

// update payment
router.put('/:id', (req, res, next) => {
    const payment_id = req.params.id;
    const { booking_id, amount, host_amount, payment_method, payment_status, payment_date } = req.body;

    db.run(
        'UPDATE Payments SET booking_id = ?, amount = ?, host_amount = ?, payment_method = ?, payment_status = ?, payment_date = ? WHERE payment_id = ?',
        [booking_id, amount, host_amount, payment_method, payment_status, payment_date, payment_id],
        function (err) {
            if (err) return next(err);
            if (this.changes === 0) {
                return responseHelper.error(res, 'Payment not found' );
            }
            responseHelper.success(res, { message: 'Payment updated successfully' });
        }
    );
});

// delete payment
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;

    db.run('DELETE FROM Payments WHERE payment_id = ?', [id], function (err) {
        if (err) return next(err);
        if (this.changes === 0) {
            return responseHelper.error(res, 'Payment not found' );
        }
        responseHelper.success(res, { message: 'Payment deleted successfully' });
    });
});

module.exports = router;
