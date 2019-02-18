const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

module.exports = app.prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === '/') {
        app.render(req, res, '/', query);
      } else {
        handle(req, res, parsedUrl);
      }
    }).listen(port, err => {
      if (err) throw err;
    });
});
