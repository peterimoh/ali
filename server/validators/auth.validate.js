const { check } = require('express-validator');

exports.userSignupValidator = [
  check('username').not().isEmpty().withMessage('Username is required'),
  check('first_name').not().isEmpty().withMessage('First Name cannot be Empty'),
  check('last_name').not().isEmpty().withMessage('Last Name cannot be Empty'),
  check('email').isEmail().withMessage('Enter a valid E-mail address'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

exports.userSigninValidator = [
  check('email').isEmail().withMessage('Must be a valid email address'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];
