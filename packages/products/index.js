require('dotenv').config();
const { assert } = require('chai');
const getProducts = require('./helpers/get-products');

module.exports = (req, res) => {
  try {
    assert(req.query.query !== undefined, '"query" query parameter is required');
    assert(req.query.offset !== undefined, '"offset" query parameter is required');
    assert(req.query.limit !== undefined, '"limit" query parameter is required');
  } catch (err) {
    res.status(400)
      .send({ error: err.message });

    return;
  }

  getProducts({ query: req.query.query, offset: req.query.offset, limit: req.query.limit })
    .then((result) => {
      const products = result.uk.ghs.products.results;
      const tpnbs = products.map(product => product.tpnb);

      res.status(200)
        .send(tpnbs);
    })
    .catch((err) => {
      res.status(500)
        .send({ error: err.message });
    });
};
