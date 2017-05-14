var path = require('path');
var webpack = require('webpack');
var _ = require('underscore');
const rootdir = process.cwd();

function makeWebpackConfig (options) {

  return _.extend({
    output: {
      path: path.resolve(rootdir, './lib'),
      filename: '[name].js',
      chunkFilename: "[name].js"
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: path.resolve(rootdir, './node_modules'),
        loader: 'babel'
      }]
    },
    target: 'web', // Make web variables accessible to webpack, e.g. window
    stats: false, // Don't show stats in the console
    progress: true
  }, options);
}


exports.default = makeWebpackConfig({
  entry: {
    index: path.resolve(rootdir, './src/index.js')
  },
  plugins: [ // Plugins for Webpack
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ // Optimize the JavaScript...
      compress: {
        warnings: false // ...but do not show warnings in the console (there is a lot of them)
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
});
