var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./webpack.development');

var app = express();
var compiler = webpack(webpackConfig);

var PORT = 8080;

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    stats: {
        colors: true,
    },
}));

app.use(require('webpack-hot-middleware')(compiler));

app.set('port', process.env.PORT || PORT);

app.listen(app.get('port'), (err) => {
    if (err) {
        console.log(err);
    }
    console.log('监听端口:' + app.get('port') + ', 正在构建,请稍后...');
});
