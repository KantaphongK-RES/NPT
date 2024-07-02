const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  if (err.code === 11000) {
    const message = `Duplicate resource with name of note ${req.body.notename} existed`;
    error = new ErrorResponse(message, 400);
  }
  console.log(err.stack.red);
  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "server error" });
};

module.exports = errorHandler;
