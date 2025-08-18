// Response helper để chuẩn hóa format response
const responseHelper = {
  success: (res, data = null, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      error: null
    });
  },

  error: (res, message = 'Internal Server Error', statusCode = 500, error = null) => {
    return res.status(statusCode).json({
      success: false,
      message,
      data: null,
      error
    });
  },

  validationError: (res, message = 'Validation Error', errors = []) => {
    return res.status(400).json({
      success: false,
      message,
      data: null,
      error: {
        type: 'validation',
        details: errors
      }
    });
  }
};

module.exports = responseHelper;
