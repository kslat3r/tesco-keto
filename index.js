const homepage = require('./packages/homepage/.next/serverless/pages');
const products = require('./packages/products');

const wrap = (page) => (req, res) => {
  const http = require("http");
  const server = new http.Server((req, res) => page.render(req, res));

  server.listen(3000, () => console.log("Listening on http://localhost:3000"));
};

module.exports.homepage = wrap(homepage);
module.exports.products = products;
