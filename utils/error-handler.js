module.exports = errorHandler;

function errorHandler(err, req, res, next) {
  if (typeof err === "string") {
    // custom application error
    return res.status(400).json({ message: err });
  }

  if (err.name === "Unauthorized" || err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ message: err.message, response: err.response });
  }

  if (err.name === "NotFound") {
    return res.status(404).json({ message: err.message, response: err.response });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message, response: err.response });
}
