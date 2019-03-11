const next = require('next');
const app = next({ dir: __dirname, dev: false });

module.exports = (req, res) => {
  if (req.url === '') {
    req.url = '/';
  }

  const handle = app.getRequestHandler();

  return app.prepare()
    .then(() => handle(req, res))
    .catch(ex => {
      res.send(ex);
    });
};
