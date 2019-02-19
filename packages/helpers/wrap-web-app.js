const { parse } = require('url');

const port = parseInt(process.env.PORT, 10) || 3000;

module.exports = (app) => (req, res) => {
  const handle = app.getRequestHandler();

  return app.prepare()
    .then(() => {
      console.log(req.path);
      console.log(req.originalUrl);

      if (req.path === '/') {
        app.render(req, res, '/', req.query);
      } else {
        handle(req, res, req.path);
      }
    }).listen(port, err => {
      if (err) throw err;
    });
};
