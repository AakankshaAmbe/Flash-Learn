const sendResponse = (res, statusCode, success, message, data = null) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

const sendSuccess = (res, message, data = null, statusCode = 200) => {
  return sendResponse(res, statusCode, true, message, data);
};

const sendError = (res, message, statusCode = 400, error = null) => {
  const response = {
    success: false,
    message,
    timestamp: new Date().toISOString()
  };
  
  // Include error details in development
  if (process.env.NODE_ENV === 'development' && error) {
    response.error = error.message || error;
  }
  
  return res.status(statusCode).json(response);
};

module.exports = {
  sendResponse,
  sendSuccess,
  sendError
};