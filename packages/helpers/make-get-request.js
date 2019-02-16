const request = require('request-promise');
const { TESCO_API_KEY } = process.env;

module.exports = async (path, qs) => {
  return request({
    method: 'GET',
    uri: `https://dev.tescolabs.com${path}`,
    qs: Object.assign({}, qs, {
      limit: 1000
    }),
    headers: {
      'Ocp-Apim-Subscription-Key': TESCO_API_KEY
    }
  });
};
