require('dotenv').config();
const { assert } = require('chai');
const searchProducts = require('./helpers/search-products');
const getProducts = require('./helpers/get-products');

module.exports = (req, res) => {
  try {
    assert(req.query.query !== undefined, '"query" query parameter is required');
    assert(req.query.offset !== undefined, '"offset" query parameter is required');
    assert(req.query.limit !== undefined, '"limit" query parameter is required');
  } catch (err) {
    res.status(400)
      .send({ error: err.message });

    throw err;
  }

  return searchProducts({ query: req.query.query, offset: req.query.offset, limit: req.query.limit })
    .then((result) => {
      const results = result.uk.ghs.products.results;
      const tpnb = results.map(result => result.tpnb);

      return getProducts({ tpnb })
        .then((result) => {
          const products = result.products;

          res.status(200)
            .send(products);
        });
    })
    .catch((err) => {
      res.status(500)
        .send({ error: err.message });

      throw err;
    });
};
