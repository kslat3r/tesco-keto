const { createServer } = require('http');
const { parse } = require('url');

const port = parseInt(process.env.PORT, 10) || 3000;

module.exports = (app) => {
  const handle = app.getRequestHandler();

  return app.prepare()
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
};
