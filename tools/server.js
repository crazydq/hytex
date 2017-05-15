var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var argv = require('yargs').argv;
var fs = require('fs');
var path = require('path');
var webpackConfig = require('../webpack.config');
const rootdir = process.cwd();
var devConfig = webpackConfig.devConfig;

console.log('Starting server...\n');

var appName = null;
if (process.argv && process.argv[2]) {
    const entryPath = path.resolve(rootdir, './examples', process.argv[2], './src/index');
    if (fs.existsSync(entryPath)) {

    }
}

var server = new WebpackDevServer(webpack(devConfig), { // Start a server
    publicPath: devConfig.output.publicPath,
    hot: argv.disableHot ? false : true, // With hot reloading
    inline: false,
    historyApiFallback: true,
    quiet: true // Without logging
});

server.listen(3000, function (err, result) {
    if (err) {
        console.log(err, result);
    } else {
        console.log('Server started');
        console.log('Listening at localhost:' + 3000);
    }
});