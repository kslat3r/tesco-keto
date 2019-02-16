const makeGetRequest = require('../../helpers/make-get-request');

module.exports = (qs) => makeGetRequest('/grocery/products', Object.assign({}, qs, {
  limit: 1000
}));
