const BaseError = require('./base-error');

class InternalError extends BaseError {
  constructor(message, code = 500) {
    super(message, code);
  }
}

module.exports = InternalError;
