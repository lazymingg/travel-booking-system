const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite3.Database('./db/db.db');

//get all reviews
router.get('/', (req, res, next) => {
  db.all('SELECT * FROM Reviews', [], (err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
});

//get review by ID
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  db.get('SELECT * FROM Reviews WHERE review_id = ?', [id], (err, row) => {
    if (err) return next(err);
    if (!row) return res.status(404).json({ error: 'Review not found' });
    res.json(row);
  });
});

//create a review
router.post('/', (req, res, next) => {
  const { user_id, accommodation_id, rating, comment } = req.body;
  const created_at = new Date().toISOString();

  db.run(
    'INSERT INTO Reviews (user_id, accommodation_id, rating, comment, created_at) VALUES (?, ?, ?, ?, ?)',
    [user_id, accommodation_id, rating, comment, created_at],
    function (err) {
      if (err) return next(err);
      res.status(201).json({ message: 'Review created', review_id: this.lastID });
    }
  );
});

//update a review
router.put('/:id', (req, res, next) => {
  const review_id = req.params.id;
  const { rating, comment } = req.body;

  db.run(
    'UPDATE Reviews SET rating = ?, comment = ? WHERE review_id = ?',
    [rating, comment, review_id],
    function (err) {
      if (err) return next(err);
      if (this.changes === 0) return res.status(404).json({ error: 'Review not found' });
      res.json({ message: 'Review updated' });
    }
  );
});

//delete a review
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  db.run('DELETE FROM Reviews WHERE review_id = ?', [id], function (err) {
    if (err) return next(err);
    if (this.changes === 0) return res.status(404).json({ error: 'Review not found' });
    res.json({ message: 'Review deleted' });
  });
});

module.exports = router;
