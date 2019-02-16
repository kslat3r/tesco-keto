const sinon = require('sinon');
const { assert } = require('chai');
const products = require('./');

describe('products', () => {
  let req;
  let res;
  let sendSpy;

  beforeEach(() => {
    req = {
      query: {
        query: 'bread',
        offset: 0,
        limit: 5
      }
    };

    sendSpy = sinon.spy();

    res = {
      status: () => ({
        send: sendSpy
      })
    };
  });

  it('gets results', (done) => {
    products(req, res)
      .then(() => {
        // assert(sendSpy.calledOnce, 'send() was not called once');

        done();
      })
      .catch((err) => done(err));
  });
});
