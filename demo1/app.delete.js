var config = require("./webpack.dev.conf.gg1.js");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
// const client = require()

// config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");
// config.entry.app.unshift("webpack-hot-middleware/client?path=http://localhost:8080/&timeout=2000&overlay=false");
// config.entry.app.unshift(['../build/dev-client'])
// Object.keys(config.entry).forEach(function (name) {
//     config.entry[name] = ['./build/dev-client.js'].concat(config.entry[name])
// })

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    contentBase:'demo1/',
    publicPath: config.output.publicPath
    // historyApiFallback: true,
    // hot: true,
    // inline: true,
    // noInfo: true,    
    // progress: true,
    // host: 'localhost'
});

server.listen(8080);
