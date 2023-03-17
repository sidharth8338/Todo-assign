const successResponse = (data, status, message = "OK") => ({
  code: status,
  success: true,
  message: message,
  error: null,
  results: data,
});

const errorResponse = (error, status, message = "Something Went Wrong") => ({
  code: status,
  success: false,
  message: message,
  error: error,
  results: null,
});

module.exports = {
  successResponse,
  errorResponse,
};
