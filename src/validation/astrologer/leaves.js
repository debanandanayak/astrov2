const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();
app.use(express.json());


function isDateValidISO8601(dateString) {
          return !isNaN(Date.parse(dateString));
}


exports.leaves = [
          body('from_date')
                    .notEmpty().withMessage('From Date is required')
                    .custom(value => {
                              if (!isDateValidISO8601(value)) {
                                        throw new Error('Invalid date format. Please provide a valid ISO 8601 date (e.g., YYYY-MM-DD)');
                              }
                              return true;
                    }),

          body('to_date')
                    .notEmpty().withMessage('To Date is required')
                    .custom(value => {
                              if (!isDateValidISO8601(value)) {
                                        throw new Error('Invalid date format. Please provide a valid ISO 8601 date (e.g., YYYY-MM-DD)');
                              }
                              return true;
                    }),

          body('reason')
                    .notEmpty().withMessage('Reason is required'),

          (req, res, next) => {
                    const errors = validationResult(req);
                    if (!errors.isEmpty()) {
                              return res.status(422).json({ errors: errors.array() });
                    } else {
                              next();
                    }
          }
];