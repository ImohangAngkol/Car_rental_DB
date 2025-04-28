const express = require('express');
const router = express.Router();
const connection = require('../db');
const jwt = require('jsonwebtoken');

// Middleware to check JWT
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(403).send('Access Denied');

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  });
};

// Create Vehicle
router.post('/', authenticateToken, (req, res) => {
  const { make, model, year, price_per_day, availability } = req.body;
  const query = 'INSERT INTO vehicles (make, model, year, price_per_day, availability) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [make, model, year, price_per_day, availability], (err, result) => {
    if (err) {
      console.error('Error inserting vehicle:', err);
      return res.status(500).json({ error: 'Failed to add vehicle' });
    }
    res.status(201).json({ message: 'Vehicle added successfully', vehicle_id: result.insertId });
  });
});

// Get all vehicles
router.get('/', authenticateToken, (req, res) => {
  const query = 'SELECT * FROM vehicles';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching vehicles:', err);
      return res.status(500).json({ error: 'Failed to fetch vehicles' });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
