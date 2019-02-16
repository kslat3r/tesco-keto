require('dotenv').config();
const { assert } = require('chai');
const getProducts = require('./helpers/get-products');

module.exports = (req, res) => {
  try {
    assert(req.query.query !== undefined, '"name" query parameter is required');
    assert(req.query.offset !== undefined, '"offset" query parameter is required');
  } catch (err) {
    res.status(400)
      .send(err);

    return;
  }

  getProducts({ query: req.query.query, offset: req.query.offset })
    .then((products) => {
      res.status(200)
        .send(products);
    })
    .catch((err) => {
      res.status(500)
        .send(err);
    });
};
