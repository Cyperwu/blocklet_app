const libEtherScan = require('../libs/etherscan');
const helper = require('../libs/helper');

const listTransactionsByAddress = async (req, res, next) => {
  const address = req.query.a;
  let result;

  try {
    const { page, perpage, sort } = helper.pagingCheck(req.query);
    result = await libEtherScan.listTransactionsByAddress(address, page, perpage, sort);
  } catch (e) {
    return next(e);
  }

  return res.json(result);
};

module.exports = {
  listTransactionsByAddress,
};
