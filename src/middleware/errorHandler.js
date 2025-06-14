const { ValidationError, NotFoundError, AuthenticationError } = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof ValidationError) {
    return res.status(err.status).json({
      error: err.name,
      message: err.message
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(err.status).json({
      error: err.name,
      message: err.message
    });
  }

  if (err instanceof AuthenticationError) {
    return res.status(err.status).json({
      error: err.name,
      message: err.message
    });
  }

  // Handle other types of errors
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong!'
  });
};

module.exports = errorHandler; 