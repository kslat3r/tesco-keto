const cors = require('cors');
const handler = require('./handler');

module.exports = (req, res) => {
  const corsHandler = cors({ origin: true });

  return corsHandler(req, res, () => handler(req, res));
};
