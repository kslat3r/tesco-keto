const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  const config = {
    ...defaultConfig
  };

  if (phase !== PHASE_DEVELOPMENT_SERVER) {
    config.assetPrefix = '/webapp';
  }

  return config;
};
