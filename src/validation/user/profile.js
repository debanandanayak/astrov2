const { body } = require("express-validator")
const { datePattern } = require("../../constants")

function sanitizeTimeStamp(fieldName){
  return [
    body(fieldName)
    .optional()
    .trim()
    .matches(datePattern)
    .toDate()
    .withMessage("dob should be a valid time stamp")
  ]
}

module.exports = {
  sanitizeTimeStamp,
}