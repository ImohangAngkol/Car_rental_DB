const express = require('express');
const router = express.Router();
const connection = require('../db');

// Create Rental
router.post('/', (req, res) => {
  const { customer_id, vehicle_id, start_date, end_date, total_price } = req.body;
  const query = 'INSERT INTO rentals (customer_id, vehicle_id, start_date, end_date, total_price) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [customer_id, vehicle_id, start_date, end_date, total_price], (err, result) => {
    if (err) {
      console.error('Error inserting rental:', err);
      return res.status(500).json({ error: 'Failed to create rental' });
    }
    res.status(201).json({ message: 'Rental created successfully', rental_id: result.insertId });
  });
});

// Get all rentals
router.get('/', (req, res) => {
  const query = 'SELECT * FROM rentals';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching rentals:', err);
      return res.status(500).json({ error: 'Failed to fetch rentals' });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
