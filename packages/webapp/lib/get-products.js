const querystring = require('querystring');
const fetch = require('isomorphic-fetch');

module.exports = async (params) => {
  if (!params.query || !params.sortBy || !params.direction) {
    return [];
  }

  params = querystring.stringify(params);

  return fetch(`https://europe-west1-tesco-keto.cloudfunctions.net/products?${params}`)
    .then(res => res.json())
    .then((body) => {
      if (body.error) {
        return [];
      }

      return body;
    })
    .catch((err) => {
      console.log(err);

      return [];
    });
};
