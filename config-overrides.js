// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = function override(config, _env) {
  config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));
  return config;
};
