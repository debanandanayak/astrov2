const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();
app.use(express.json());

exports.login = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please include a valid email'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),


  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      next();
    }
  }
];

exports.signup = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please include a valid email'),

  body('first_name')
    .notEmpty().withMessage('First name is required'),

  body('last_name')
    .notEmpty().withMessage('Last name is required'),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone Number is required')
    .isMobilePhone().withMessage('Please include a valid Phone number')
    .isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 digits long'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  body('gender')
    .notEmpty().withMessage('Gender is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      next();
    }
  }
];
