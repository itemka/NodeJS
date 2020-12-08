const { body } = require('express-validator/check');

exports.registerValidators = [
  body('email').isEmail().withMessage('Enter correct email'),
  body('password', 'The password must be at least 6 characters long').isLength({ min: 6, max: 56 }).isAlphanumeric(),
  body('confirm').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('The password must match')
    }

    return true;
  }),
  body('name').isLength({ min: 3 }).withMessage('The name must be at least 3 characters long')
]