const { validationResult } = require('express-validator');

/**
 * Catch any validation errors that have been brought up by express-validator
 * @param {import("express").Request} req Request from client
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next Next Function
 * @returns {void}
 */
function validate(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  return next();
}

/**
 * @typedef {object} ValidationError
 * @property {string} location location of error (typically 'body')
 * @property {string} msg the error message
 * @property {string} param the field that failed validation
 */

/**
 * @typedef {object} ValidationErrorResponse
 * @property {array<ValidationError>} errors array of errors
 */

module.exports = validate;
