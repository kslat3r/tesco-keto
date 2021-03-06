const sinon = require('sinon');
const { expect } = require('chai');
const nock = require('nock');
const index = require('./index');

describe('products', () => {
  let req;
  let res;
  let sendSpy;

  beforeEach(() => {
    req = {
      query: {
        query: 'bread',
        sortBy: 'carbohydrate',
        direction: 'ASC'
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

    index(req, res)
      .catch(() => {
        expect(sendSpy.calledOnce).to.equal(true);
        expect(sendSpy.lastCall.args[0]).to.deep.equal({ error: '"query" query parameter is required' });

        done();
      });
  });

  it('sends error if sortBy parameter is missing', (done) => {
    delete req.query.sortBy;

    index(req, res)
      .catch(() => {
        expect(sendSpy.calledOnce).to.equal(true);
        expect(sendSpy.lastCall.args[0]).to.deep.equal({ error: '"sortBy" query parameter is required' });

        done();
      });
  });

  it('sends error if sortBy parameter is not acceptable', (done) => {
    req.query.sortBy = 'sugar';

    index(req, res)
      .catch(() => {
        expect(sendSpy.calledOnce).to.equal(true);
        expect(sendSpy.lastCall.args[0]).to.deep.equal({ error: '"sortBy" query parameter must be either "carbohydrate" or "fat"' });

        done();
      });
  });

  it('sends error if direction parameter is missing', (done) => {
    delete req.query.direction;

    index(req, res)
      .catch(() => {
        expect(sendSpy.calledOnce).to.equal(true);
        expect(sendSpy.lastCall.args[0]).to.deep.equal({ error: '"direction" query parameter is required' });

        done();
      });
  });

  it('sends error if direction parameter is not acceptable', (done) => {
    req.query.direction = 'sugar';

    index(req, res)
      .catch(() => {
        expect(sendSpy.calledOnce).to.equal(true);
        expect(sendSpy.lastCall.args[0]).to.deep.equal({ error: '"direction" query parameter must be either "ASC" or "DESC"' });

        done();
      });
  });

  it('sends error if there is an error downstream', (done) => {
    nock('https://dev.tescolabs.com')
      .get('/grocery/products')
      .reply(500);

    index(req, res)
      .catch(() => {
        expect(sendSpy.calledOnce).to.equal(true);
        expect(sendSpy.lastCall.args[0]).to.deep.equal({ error: 'Internal server error' });

        nock.restore();
        done();
      });
  });

  it('sends results', (done) => {
    index(req, res)
      .then(() => {
        expect(sendSpy.calledOnce).to.equal(true);

        done();
      })
      .catch((err) => done(err));
  }).timeout(10000);
});
