var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var argv = require('yargs').argv;
var fs = require('fs');
var path = require('path');
var webpackConfig = require('../webpack.config');
var devConfig = null;

console.log('Starting server...\n');

if (process.argv && process.argv[2]) {
    const entry = path.resolve(__dirname, '../examples', process.argv[2], './src/index.js');
    if (fs.existsSync(entry)) {
        devConfig = webpackConfig.devConfig(process.argv[2]);
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
    }
}


