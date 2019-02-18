const homepage = require('./packages/homepage/.next/serverless/pages');
const products = require('./packages/products');

const wrap = (page) => (req, res) => {
  const express = require("express");
  const next = require("next");

  const port = parseInt(process.env.PORT, 10) || 3000;
  console.log(port);
  const dev = process.env.NODE_ENV !== "production";
  const app = next({ dev });
  const handle = app.getRequestHandler();

  app
  .prepare()
  .then(() => {
    const server = express();

    server.get("/", (req, res) => {
      return app.render(req, res, "/", req.params);
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;

      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.log(ex);
    process.exit(1);
  });
};

module.exports.homepage = wrap(homepage);
module.exports.products = products;
