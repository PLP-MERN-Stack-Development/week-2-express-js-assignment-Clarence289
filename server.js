// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./src/config/config');
const logger = require('./src/middleware/logger');
const errorHandler = require('./src/middleware/errorHandler');
const productRoutes = require('./src/routes/productRoutes');

// Initialize Express app
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(logger);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

app.use('/api/products', productRoutes);

// Error handling
app.use(errorHandler);

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});

// Export the app for testing purposes
module.exports = app; 