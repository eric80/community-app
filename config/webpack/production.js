const webpackMerge = require('webpack-merge'); // eslint-disable-line import/no-extraneous-dependencies

const path = require('path');

const configFactory
  = require('topcoder-react-utils/config/webpack/app-production');

const defaultConfig = require('./default');

let publicPath = process.env.CDN_URL;
if (publicPath) publicPath += '/static-assets';
else publicPath = '/api/cdn/public/static-assets';

const standardDevelopmentConfig = configFactory({
  context: path.resolve(__dirname, '../..'),
  entry: {
    'loading-indicator-animation': './src/client/loading-indicator-animation',
    main: './src/client',
  },
  keepBuildInfo: Boolean(global.KEEP_BUILD_INFO),
  publicPath,
});

const jsxRule = standardDevelopmentConfig.module.rules.find(rule =>
  rule.loader === 'babel-loader');
jsxRule.exclude = [
  /node_modules[\\/](?!appirio-tech.*|topcoder|tc-)/,
  /src[\\/]assets[\\/]fonts/,
  /src[\\/]assets[\\/]images[\\/]dashboard/,
];

module.exports = webpackMerge.smart(standardDevelopmentConfig, defaultConfig);
