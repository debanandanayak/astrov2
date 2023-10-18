const express = require("express")
const { body, validationResult } = require("express-validator")
const app = express()
app.use(express.json())

exports.login = [
  body("phone_number")
    .trim()
    .notEmpty()
    .withMessage("Phone Number is required")
    .isMobilePhone()
    .withMessage("Please include a valid Phone number")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 digits long"),
]

exports.verifyUser = [
  //----------------------------------------------------------------MOBILE NUMBER-----------------------------------------------------------//
  body("phone_number")
    .trim()
    .notEmpty()
    .withMessage("Phone Number is required")
    .isMobilePhone()
    .withMessage("Please include a valid Phone number")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 digits long"),

  //-------------------------------------------------------------------OTP---------------------------------------------------------------------//
  body("otp")
    .trim()
    .notEmpty()
    .withMessage("OTP is required")
    .isNumeric()
    .withMessage("OTP should only contain numbers")
    .isLength({ min: 4, max: 4 })
    .withMessage("OTP must be 4 digits long"),

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    } else next()
  },
]
