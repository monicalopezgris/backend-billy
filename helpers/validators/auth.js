const { query, check, validationResult } = require('express-validator/check');

module.exports = {
  validationResult,
  signUpValidator: [
    check('username')
      .isLength({ min: 3 })
      .withMessage('Username must be 4 digits long'),
    check('password')
      .isString()
      .withMessage('Insert a valid password'),
  ],
  logInValidator: [
    check('username')
      .isLength({ min: 4 })
      .withMessage('Username must be 4 digits long'),
    check('password')
      .isString()
      .withMessage('Insert a valid password'),
  ]
};
