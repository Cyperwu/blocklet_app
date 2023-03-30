const errors = require('../errors');
const logger = require('../libs/logger');

// eslint-disable-next-line
module.exports = (err, req, res, next) => {
  if (err instanceof errors.BaseError) {
    logger.info(`[INFO]: Error return from API call: [${err.constructor.name}]: ${err.message}`);
    res.status(err.code).json({ message: err.message });
  } else {
    logger.error(`[ERROR]: Uncaught error return from API call: ${err}`);
    logger.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
