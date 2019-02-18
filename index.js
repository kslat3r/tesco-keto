const express = require('express');
const homepage = require('./packages/homepage/.next/serverless/pages');
const products = require('./packages/products');

const wrap = (page) => (req, res) => {
  page.prepare()
    .then(() => {
      const app = express();
      const handle = app.getRequestHandler();

      app.get('*', (req, res) => {
        return handle(req, res);
      });
    });
};

module.exports.homepage = wrap(homepage);
module.exports.products = products;
