require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  apiKey: process.env.API_KEY || 'test-api-key-12345678',
  pagination: {
    defaultLimit: 10,
    maxLimit: 100
  }
}; 