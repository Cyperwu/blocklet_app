const ethAddressChecker = require('ethereum-address');
const errors = require('../errors');

const pagingCheck = (pagingObject) => {
  let { page = 1, perpage = 20, sort = 'desc' } = pagingObject;

  page = parseInt(page, 10);

  perpage = parseInt(perpage, 10);

  sort = String(sort).toLowerCase();

  if (!page || page < 1 || !perpage || perpage < 1 || !['asc', 'desc'].includes(sort)) {
    throw new errors.ValidationError('Bad paging parameters');
  }

  if (perpage > 100) {
    throw new errors.ValidationError('Page size too large');
  }

  return { page, perpage, sort };
};

module.exports = {
  pagingCheck,
  isAddress: ethAddressChecker.isAddress,
};
