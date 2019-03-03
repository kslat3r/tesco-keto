const fetch = require('isomorphic-fetch');
const querystring = require('querystring');
const { TESCO_API_KEY } = process.env;

module.exports = (path, params) => {
  params = querystring.stringify(params);

  return fetch(`https://dev.tescolabs.com${path}?${params}`, {
    method: 'GET',
    headers: {
      'Ocp-Apim-Subscription-Key': TESCO_API_KEY
    }
  }).then(res => res.json())
    .then((res) => {
      if (res.message && res.statusCode) {
        throw new Error(res.message);
      }

      return res;
    });
};
