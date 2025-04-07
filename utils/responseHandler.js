const sendResponse = (res, code, message, data = {}, errors = {}) => {
    return res.status(code).json({
      code,
      message,
      data,
      errors
    });
  };
  
  module.exports = sendResponse;