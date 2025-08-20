// Response helper để chuẩn hóa format response
const responseHelper = {
  success: (res, data = null, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      details: null
    });
  },

  error: (res, message = 'Internal Server Error', statusCode = 500, details = null) => {
    return res.status(statusCode).json({
      success: false,
      message,
      data: null,
      details
    });
  }
};

module.exports = responseHelper;
