const makeGetRequest = require('../../helpers/make-get-request');

module.exports = (qs) => makeGetRequest(`/product`, qs);
