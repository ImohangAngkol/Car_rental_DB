const express = require('express');
const router = express.Router();
const connection = require('../db');
const { body, validationResult } = require('express-validator');

// Create Customer with Validation
router.post('/', [
  body('first_name').not().isEmpty().withMessage('First name is required'),
  body('last_name').not().isEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Must be a valid email'),
  body('phone').not().isEmpty().withMessage('Phone number is required'),
  body('address').not().isEmpty().withMessage('Address is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { first_name, last_name, email, phone, address } = req.body;
  const query = 'INSERT INTO customers (first_name, last_name, email, phone, address) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [first_name, last_name, email, phone, address], (err, result) => {
    if (err) {
      console.error('Error inserting customer:', err);
      return res.status(500).json({ error: 'Failed to add customer' });
    }
    res.status(201).json({ message: 'Customer added successfully', customer_id: result.insertId });
  });
});

// Get all customers
router.get('/', (req, res) => {
  const query = 'SELECT * FROM customers';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching customers:', err);
      return res.status(500).json({ error: 'Failed to fetch customers' });
    }
    res.status(200).json(results);
  });
});

module.exports = router;

