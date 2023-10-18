const { body } = require("express-validator")
const datePattern = require('./../../constants').datePattern
module.exports.createKundali = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),
    body("date_of_birth")
    .trim()
    .notEmpty()
    .matches(datePattern)
    .toDate()
    .withMessage("Enter a valid date"),
    body("place_of_birth")
    .trim()
    .notEmpty()
    .withMessage("Place is required"),
    body("coordinate")
    .trim()
    .notEmpty()
    .withMessage("coordinate is required"),
    body("type")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("type is required")
    .isIn(['boy','girl'])
    .withMessage("type should be 'boy'or 'girl")
]