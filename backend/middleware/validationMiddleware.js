const { body, validationResult } = require('express-validator');

const validateRegistration = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('school').trim().notEmpty().withMessage('School is required'),
  body('role').isIn(['scout_master', 'scout', 'lady_scout']).withMessage('Invalid role'),
  body('classroom').if(body('role').equals('lady_scout')).notEmpty().withMessage('Classroom required for lady scouts'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
]; 