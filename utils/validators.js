const { body } = require('express-validator');
const User = require('../models/user');

exports.registerValidators = [
  body('email')
    .isEmail().withMessage('Enter correct email')
    .custom(async value => {
      try {
        const user = await User.findOne({ email: value });

        if (user) {
          return Promise.reject('This email is busy');
        }
      } catch (err) {
        console.log(err)
      }
    })
    .normalizeEmail(),
  body('password', 'The password must be at least 6 characters long')
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    .trim(),
  body('confirm')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('The password must match')
      }

      return true;
    })
    .trim(),
  body('name')
    .isLength({ min: 3 })
    .withMessage('The name must be at least 3 characters long')
    .trim()
];

exports.signinValidators = [
  body('email')
  .isEmail().withMessage('Enter correct email')
  .custom(async value => {
    try {
      const user = await User.findOne({ email: value });

      if (!user) {
        return Promise.reject('This user does not exist');
      }
    } catch (err) {
      console.log(err)
    }
  })
  .normalizeEmail(),
  body('password', 'The password must be at least 6 characters long')
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    .trim(),
];