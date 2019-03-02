require('dotenv').config();
const products = require('./');

module.exports = (req, res) => products({ query: req.query.query, sortBy: req.query.sortBy, direction: req.query.direction })
  .then(products => res.status(200).send(products))
  .catch(err => res.status(500).send(err));
