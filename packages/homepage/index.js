const next = require('next');
const wrapWebApp = require('../helpers/wrap-web-app');

const app = next({ dev: false });

module.exports = wrapWebApp(app);
