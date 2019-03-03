require('dotenv').config({
  path: `${__dirname}/.env`
});

const { assert } = require('chai');
const searchProducts = require('./helpers/search-products');
const getProducts = require('./helpers/get-products');
const filterProducts = require('./helpers/filter-products');
const sortProducts = require('./helpers/sort-products');

module.exports = (req, res) => {
  try {
    assert(req.query.query !== undefined, '"query" query parameter is required');
    assert(req.query.sortBy !== undefined, '"sortBy" query parameter is required');
    assert(['carbohydrate', 'fat'].includes(req.query.sortBy), '"sortBy" query parameter must be either "carbohydrate" or "fat"');
    assert(req.query.direction !== undefined, '"direction" query parameter is required');
    assert(['ASC', 'DESC'].includes(req.query.direction), '"direction" query parameter must be either "ASC" or "DESC"');
  } catch (err) {
    res.status(400)
      .send({ error: err.message });

    return Promise.reject(err);
  }

  return searchProducts({ query: req.query.query, offset: 0, limit: 50 })
    .then((searchResults) => {
      searchResults = searchResults.uk.ghs.products.results;
      const tpnc = searchResults.map(result => result.id);

      return getProducts({ tpnc })
        .then((products) => {
          products = products.products;

          products.forEach((product) => {
            product.details = searchResults.find((searchResult) => {
              return parseInt(searchResult.id, 10) === parseInt(product.tpnc, 10);
            });
          });

          products = filterProducts(products);
          products = sortProducts(products, req.query.sortBy, req.query.direction);

          res.status(200)
            .send(products);

          return products;
        });
    })
    .catch((err) => {
      res.status(500)
        .send({ error: 'Internal server error' });

      throw err;
    });
};
