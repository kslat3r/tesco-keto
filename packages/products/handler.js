const cors = require('cors');
const webapp = require('./');

module.exports = (req, res) => {
  const corsHandler = cors({ origin: true });

  return corsHandler(req, res, () => webapp(req, res));
};
