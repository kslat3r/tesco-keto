const next = require('next');
const wrapWebApp = require('../helpers/wrap-web-app');

const app = next({ dir: './', dev: false });

module.exports = wrapWebApp(app);
