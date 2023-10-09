const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();
app.use(express.json());


exports.shortcut = [
          body('astrologer_id')
            .notEmpty().withMessage('Astrologer ID is required'),
        
          body('shortcut')
            .notEmpty().withMessage('Shortcut is required'),
        
          body('message')
            .notEmpty().withMessage('Message is required'),
        
          (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(422).json({ errors: errors.array() });
            } else {
              next();
            }
          }
        ];
   
        
        
        