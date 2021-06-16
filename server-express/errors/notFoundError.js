/**
 * @typedef {object} NotFoundErrorResponse
 * @property {string} message Error message
 * @property {number} status HTTP status code
 * @property {string} name name of error
 */

class NotFoundError extends Error {
  constructor(message) {
    super();
    this.message = message || 'Not Found';
    this.status = 404;
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
