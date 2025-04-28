const express = require('express');
const router = express.Router();
const connection = require('../db');

// Create a new booking
router.post('/', (req, res) => {
  const { customer_id, vehicle_id, start_date, end_date, total_price, status } = req.body;

  const query = 'INSERT INTO bookings (customer_id, vehicle_id, start_date, end_date, total_price, status) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [customer_id, vehicle_id, start_date, end_date, total_price, status], (err, result) => {
    if (err) {
      console.error('Error inserting booking:', err);
      return res.status(500).json({ error: 'Failed to add booking' });
    }
    res.status(201).json({ message: 'Booking added successfully', booking_id: result.insertId });
  });
});

module.exports = router;
