const { pathsToModuleNameMapper } = require('ts-jest/utils');
const tsconfig = require('./tsconfig.paths');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  webpack: (config, env) => {
    config.resolve.plugins = [new TsconfigPathsPlugin({ configFile: './tsconfig.paths.json' })];
    return config;
  },
  jest: (config) => {
    config.moduleNameMapper = {
      ...config.moduleNameMapper,
      ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths),
    };
    return config;
  },
};
