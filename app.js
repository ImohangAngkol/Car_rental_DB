const express = require('express');
const app = express();
const port = 3000;

// Import route files
const customersRoutes = require('./routes/customers');
const vehiclesRoutes = require('./routes/vehicles');
const rentalsRoutes = require('./routes/rentals');
const authRoutes = require('./routes/auth');
const bookingsRoutes = require ('.routes/bookings');

// Middleware to parse JSON data
app.use(express.json());


// Use route files
app.use('/customers', customersRoutes);
app.use('/vehicles', vehiclesRoutes);
app.use('/rentals', rentalsRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

