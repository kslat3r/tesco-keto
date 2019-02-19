const makeGetRequest = require('./make-get-request');

module.exports = (qs) => makeGetRequest(`/product`, qs);
