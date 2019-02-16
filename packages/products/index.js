require('dotenv').config();
const { assert } = require('chai');
const searchProducts = require('./helpers/search-products');
const getProducts = require('./helpers/get-products');
const filterProducts = require('./helpers/filter-products');

module.exports = (req, res) => {
  try {
    assert(req.query.query !== undefined, '"query" query parameter is required');
    assert(req.query.offset !== undefined, '"offset" query parameter is required');
    assert(req.query.limit !== undefined, '"limit" query parameter is required');
    assert(parseInt(req.query.limit, 10) <= 100, '"limit" query parameter must be less than or equal to 100');
  } catch (err) {
    res.status(400)
      .send({ error: err.message });

    return Promise.reject(err);
  }

  return searchProducts({ query: req.query.query, offset: req.query.offset, limit: req.query.limit })
    .then((result) => {
      const results = result.uk.ghs.products.results;
      const tpnc = results.map(result => result.id);

      return getProducts({ tpnc })
        .then((result) => {
          let products = result.products;

          products = filterProducts(products);

          res.status(200)
            .send(products);
        });
    })
    .catch((err) => {
      res.status(500)
        .send({ error: 'Downstream error' });

      throw err;
    });
};
