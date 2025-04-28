const express = require('express');
const router = express.Router();
const connection = require('../db');

// Get vehicles with filtering options
router.get('/', (req, res) => {
  const { make, model } = req.query;

  let query = 'SELECT * FROM vehicles WHERE 1=1';
  let params = [];

  if (make) {
    query += ' AND make = ?';
    params.push(make);
  }
  if (model) {
    query += ' AND model = ?';
    params.push(model);
  }

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Error fetching vehicles:', err);
      return res.status(500).json({ error: 'Failed to fetch vehicles' });
    }
    res.status(200).json(results);
  });
});

module.exports = router;

