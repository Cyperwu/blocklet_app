const BaseError = require('./base-error');

class ValidationError extends BaseError {
  constructor(message, code = 400) {
    super(message, code);
  }
}

module.exports = ValidationError;
