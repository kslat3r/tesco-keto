const { expect } = require('chai');
const products = require('./');

describe('products', () => {
  const req = { query: 'bread', offset: 0, limit: 100 };
  const res = {
    status: () => ({
      send: () => {}
    })
  };

  it('gets results', () => {
    products(req, res)
      .then((result) => {
        expect(result.length > 0).to.be.true();
      });
  });
});
