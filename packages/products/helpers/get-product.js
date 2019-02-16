const makeGetRequest = require('../../helpers/make-get-request');

module.exports = (id, qs) => makeGetRequest(`/product?catid=${id}`, qs);
