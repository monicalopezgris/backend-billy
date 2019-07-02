const { check, validationResult } = require('express-validator/check');

module.exports = {
  validationResult,
  clientValidator: [
    check('name')
      .isLength({ min: 3 })
      .withMessage('Article must have more than 3 characters')
      .isString()
      .withMessage('Article title must be AlfhaNumeric'),
    check('cif')
      .isString()
      .withMessage('Must be 8 digits long')
      .matches(/^[A-Z][0-9]*$/)
      .withMessage('Insert a valid spanish CIF , example: E0000000'),
    check('street')
      .isString()
      .withMessage('Must be a string'),
    check('streetNum')
      .isNumeric()
      .withMessage('Must be a number'),
    check('postalCode')
      .isNumeric()
      .withMessage('Must be a number')
      .withMessage('Must be 5 digits long'),
    check('country')
      .isString()
      .withMessage('Must be a string'),
  ],
};
