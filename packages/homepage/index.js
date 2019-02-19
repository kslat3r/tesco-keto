const next = require('next');
const wrapWebApp = require('../helpers/wrap-web-app');

const app = next({ dir: __dirname, dev: false });

module.exports = wrapWebApp(app);
