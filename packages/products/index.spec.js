const sinon = require('sinon');
const { expect } = require('chai');
const nock = require('nock');
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
        limit: 100
      }
    };

    sendSpy = sinon.spy();

    res = {
      status: () => ({
        send: sendSpy
      })
    };
  });

  it('sends error if query parameter is missing', (done) => {
    delete req.query.query;

    products(req, res)
      .catch(() => {
        expect(sendSpy.calledOnce).to.equal(true);
        expect(sendSpy.lastCall.args[0]).to.deep.equal({ error: '"query" query parameter is required' });

        done();
      });
  });

  it('sends error if offset parameter is missing', (done) => {
    delete req.query.offset;

    products(req, res)
      .catch(() => {
        expect(sendSpy.calledOnce).to.equal(true);
        expect(sendSpy.lastCall.args[0]).to.deep.equal({ error: '"offset" query parameter is required' });

        done();
      });
  });

  it('sends error if limit parameter is missing', (done) => {
    delete req.query.limit;

    products(req, res)
      .catch(() => {
        expect(sendSpy.calledOnce).to.equal(true);
        expect(sendSpy.lastCall.args[0]).to.deep.equal({ error: '"limit" query parameter is required' });

        done();
      });
  });

  it('sends error if limit parameter is more than 100', (done) => {
    req.query.limit = 101;

    products(req, res)
      .catch(() => {
        expect(sendSpy.calledOnce).to.equal(true);
        expect(sendSpy.lastCall.args[0]).to.deep.equal({ error: '"limit" query parameter must be less than 100' });

        done();
      });
  });

  it('sends error if there is an error downstream', (done) => {
    nock('https://dev.tescolabs.com')
      .get('/grocery/products')
      .reply(500);

    products(req, res)
      .catch(() => {
        expect(sendSpy.calledOnce).to.equal(true);
        expect(sendSpy.lastCall.args[0]).to.deep.equal({ error: 'Downstream error' });

        nock.restore();
        done();
      });
  });

  it('sends results', (done) => {
    products(req, res)
      .then(() => {
        expect(sendSpy.calledOnce).to.equal(true);

        done();
      })
      .catch((err) => done(err));
  }).timeout(10000);
});
