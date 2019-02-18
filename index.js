const express = require('express');
const homepage = require('./packages/homepage/.next/serverless/pages');
const products = require('./packages/products');

const wrap = (page) => {
  page.prepare()
    .then(() => {
      const app = express();
      const handle = app.getRequestHandler();

      app.get('/', (req, res) => {
        return app.render(req, res);
      });

      app.get('*', (req, res) => {
        return handle(req, res);
      });

      app.listen(3000, err => {
        if (err) throw err;
      });
    });
};

module.exports.homepage = wrap(homepage);
module.exports.products = products;
