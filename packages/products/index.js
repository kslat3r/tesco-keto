const { assert } = require('chai');
const searchProducts = require('./helpers/search-products');
const getProducts = require('./helpers/get-products');
const filterProducts = require('./helpers/filter-products');
const sortProducts = require('./helpers/sort-products');

module.exports = (opts) => {
  try {
    assert(opts.query !== undefined, '"query" opts parameter is required');
    assert(opts.sortBy !== undefined, '"sortBy" opts parameter is required');
    assert(['carbohydrate', 'fat'].includes(opts.sortBy), '"sortBy" opts parameter must be either "carbohydrate" or "fat"');
    assert(opts.direction !== undefined, '"direction" opts parameter is required');
    assert(['ASC', 'DESC'].includes(opts.direction), '"direction" opts parameter must be either "ASC" or "DESC"');
  } catch (e) {
    return Promise.reject(e);
  }

  return searchProducts({ query: opts.query, offset: 0, limit: 50 })
    .then((result) => {
      const results = result.uk.ghs.products.results;
      const tpnc = results.map(result => result.id);

      return getProducts({ tpnc })
        .then((result) => {
          let products = result.products;

          products = filterProducts(products);
          products = sortProducts(products, opts.sortBy, opts.direction);

          return products;
        });
    });
};
