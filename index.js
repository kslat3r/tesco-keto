const homepage = require('./packages/homepage/.next/serverless/pages');
const products = require('./packages/products');

const wrap = (page) => (req, res) => {
  page.render(req, res);
};

module.exports.homepage = wrap(homepage);
module.exports.products = products;
