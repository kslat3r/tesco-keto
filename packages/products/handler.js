require('dotenv').config();
const { assert } = require('chai');
const products = require('./');

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

  return products({ query: req.query.query, sortBy: req.query.sortBy, direction: req.query.direction })
    .then(products => {
      return res.status(200)
        .send(products);
    })
    .catch((err) => {
      res.status(500)
        .send({ error: 'Internal server error' });

      throw err;
    });
};
