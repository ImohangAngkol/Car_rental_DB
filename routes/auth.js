const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Login Route (for authentication)
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Dummy user for now (in a real app, check the database)
  const user = { email: email, role: 'customer' }; // Example user

  // Generate JWT token
  const token = jwt.sign(user, 'your-secret-key', { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
