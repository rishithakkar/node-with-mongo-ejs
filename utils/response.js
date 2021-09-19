// Common response function
exports.response = (res, message, data, statusCode = 200) => {
  res.status(statusCode).json({ message, data });
};
