var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var appName=require('./package').name;

var src='/demo';

module.exports = {

  entry: {
    app: [__dirname + src + '/index']
  },
  output: {
    path: path.resolve(__dirname, '_dist'),
    filename: '[name]_[hash:8].js',
  },
  resolve: {
    root: [
      __dirname + src,
      __dirname + '/node_modules',
      __dirname,
    ],
    extensions: ['', '.js', '.jsx','.ts','.tsx'],
  },
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loaders: ['babel','ts'],
      exclude: /node_modules/,
    }, {
      test: /\.jsx?$/,
      loaders: ['babel'],
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      loaders: ['style', 'css'],
      include: /components/,
    }, {
      test: /\.less$/,
      loaders: ['style', 'css', 'less'],
      include: /components/,
    }, {
      test: /\.(jpe?g|png|gif|svg|ico)/i,
      loader: 'file?name=img_[hash:8].[ext]',
    }, {
      test: /\.(ttf|eot|svg|woff|woff2)/,
      loader: 'file',
    }, {
      test: /\.(pdf)/,
      loader: 'file',
    }, {
      test: /\.(swf|xap)/,
      loader: 'file',
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title:appName,
      template: __dirname + src + '/index.html',
      favicon: __dirname + src + '/favicon.ico',
      inject: false,
      minify: {
        html5: true,
        collapseWhitespace: true,
        // conservativeCollapse: true,
        removeComments: true,
        removeTagWhitespace: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
      }
    })
  ],
};
