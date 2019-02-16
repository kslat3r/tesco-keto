const request = require('request-promise');
const { TESCO_API_KEY } = process.env;

module.exports = (path, qs) => request({
  method: 'GET',
  uri: `https://dev.tescolabs.com${path}`,
  qs,
  useQuerystring: true,
  headers: {
    'Ocp-Apim-Subscription-Key': TESCO_API_KEY
  },
  json: true
});
