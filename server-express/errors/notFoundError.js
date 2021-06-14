/**
 * @typedef {object} NotFoundErrorResponse
 * @property {string} message
 * @property {number} status
 * @property {string} name
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
