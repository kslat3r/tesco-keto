const makeGetRequest = require('./make-get-request');

module.exports = (qs) => makeGetRequest('/grocery/products', qs);
