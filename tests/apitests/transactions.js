const sinon = require('sinon');
const supertest = require('supertest');
const assert = require('assert');
const etherscanApi = require('etherscan-api');

const apiInstanceStub = {
  account: {
    txlist: sinon.stub().returns({ status: '1', result: [] }),
  },
  proxy: {
    eth_getTransactionCount: sinon.stub().returns({ status: '1', result: '0xb8' }),
  },
};
sinon.stub(etherscanApi, 'init').returns(apiInstanceStub);
const api = require('../../api');

describe('transactions', () => {
  describe('GET /api/txs', () => {
    describe('wrong paging params', () => {
      it('should fail with 400 on wrong address', () => {
        return supertest(api).get('/api/txs?a=123456').expect(400);
      });

      it('should fail with 400 on bad page', () => {
        return supertest(api).get('/api/txs?a=0xd7e1236c08731c3632519dcd1a581bfe6876a3b2&page=badpage').expect(400);
      });
      it('should fail with 400 on bad perpage', () => {
        return supertest(api)
          .get('/api/txs?a=0xd7e1236c08731c3632519dcd1a581bfe6876a3b2&perpage=badperpage')
          .expect(400);
      });
      it('should fail with 400 on bad sort', () => {
        return supertest(api).get('/api/txs?a=0xd7e1236c08731c3632519dcd1a581bfe6876a3b2&sort=badsort').expect(400);
      });
    });

    it('should success', async () => {
      await supertest(api)
        .get('/api/txs?a=0xd7e1236c08731c3632519dcd1a581bfe6876a3b2&page=1&perpage=20&sort=asc')
        .expect(200);

      assert.ok(apiInstanceStub.account.txlist.calledOnce);
      assert.ok(apiInstanceStub.proxy.eth_getTransactionCount.calledOnce);
    });
  });
});
