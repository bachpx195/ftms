/* eslint comma-dangle: ["error",
  {"functions": "never", "arrays": "only-multiline", "objects":
"only-multiline"} ] */

const webpack = require('webpack');
const path = require('path');

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

const config = {
  entry: [
    'es5-shim/es5-shim',
    'es5-shim/es5-sham',
    'babel-polyfill',
    './app/bundles/startup/registration',
  ],

  output: {
    filename: 'webpack-bundle.js',
    path: '../app/assets/webpack',
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      constants: path.join(process.cwd(), 'app', 'constants'),
      policy: path.join(process.cwd(), 'app', 'bundles', 'policies', 'components'),
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      shared: path.join(process.cwd(), 'app', 'bundles', 'components', 'shareds'),
      config: path.join(process.cwd(), 'app', 'config'),
      breadcrumb: path.join(process.cwd(),
        'app', 'bundles', 'components', 'shareds', 'bread_crumb'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: require.resolve('react'),
        loader: 'imports?shim=es5-shim/es5-shim&sham=es5-shim/es5-sham',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.css$/, loaders: ["style", "css"] },
    ],
  },
};

module.exports = config;

if (devBuild) {
  console.log('Webpack dev build for Rails'); // eslint-disable-line no-console
  module.exports.devtool = 'eval-source-map';
} else {
  config.plugins.push(
    new webpack.optimize.DedupePlugin()
  );
  console.log('Webpack production build for Rails'); // eslint-disable-line no-console
}
