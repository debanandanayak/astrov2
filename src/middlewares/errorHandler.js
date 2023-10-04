const { removeUnusedMulterImageFilesOnError } = require("../helpers/helper")
const ApiError = require("../utils/ApiError")
function errorHandler(err, req, res, next) {
  let error = err

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error instanceof Error ? 400 : 500
    console.log(error);
    const message = error.message || "Something went wrong"
    error = new ApiError(statusCode, message, error?.errors || [], err.stack)
  }

  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  }
  removeUnusedMulterImageFilesOnError(req)
  return res.status(error.statusCode).json(response)
}
module.exports = errorHandler