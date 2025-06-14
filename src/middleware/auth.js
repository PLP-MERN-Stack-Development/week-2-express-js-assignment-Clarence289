const config = require('../config/config');

/**
 * Authentication middleware that validates API key
 * Supports both header-based and query-based API key authentication
 */
const authenticate = (req, res, next) => {
  // Check for API key in different header formats
  const apiKey = req.headers['x-api-key'] || 
                req.headers['xapikey'] || 
                req.headers['apikey'] || 
                req.headers['api-key'];
  
  console.log('Received headers:', req.headers);
  console.log('Found API key:', apiKey);
  
  if (!apiKey) {
    return res.status(401).json({
      error: 'AuthenticationError',
      message: 'API key is required'
    });
  }

  if (apiKey !== 'test-api-key-12345678') {
    return res.status(401).json({
      error: 'AuthenticationError',
      message: 'Invalid API key'
    });
  }

  next();
};

module.exports = authenticate; 