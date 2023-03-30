const etherscan = require('etherscan-api');
const NodeCache = require('node-cache');
const env = require('./env');
const logger = require('./logger');
const errors = require('../errors');
const helper = require('./helper');

const transactionsCache = new NodeCache({
  stdTTL: 5 * 60,
  useClones: false,
});

const etherscanApi = etherscan.init(env.etherscanApiKey);

const listTransactionsByAddress = async (address, page = 1, perpage = 100, sort = 'asc') => {
  if (!helper.isAddress(address)) {
    throw new errors.ValidationError('Bad address format');
  }

  const cachedResult = await transactionsCache.get(address);
  if (cachedResult) {
    logger.info(`get transactions by address ${address} from cache`);
    return cachedResult;
  }

  logger.info(`getting transactions by ${address}`);
  const listResult = await etherscanApi.account.txlist(address, 0, 'latest', page, perpage, sort);
  if (!listResult || listResult.status !== '1') {
    logger.error(`get transactions by ${address} failed, received: ${JSON.stringify(listResult)}`);
    throw new errors.InternalError('Failed to retrieve transactions');
  }

  const countResult = await etherscanApi.proxy.eth_getTransactionCount(address);
  let count;
  if (countResult && Number(countResult.result)) {
    count = Number(countResult.result);
  } else {
    throw new errors.InternalError('Failed to count transactions');
  }

  logger.info(`get transactions by address ${address} succeeded`);
  const result = {
    count,
    data: listResult.result,
  };
  await transactionsCache.set(address, result);

  return result;
};

module.exports = {
  listTransactionsByAddress,
};
