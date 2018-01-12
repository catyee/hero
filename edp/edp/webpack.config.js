
let path = require('path');
let entry = require('./webpack.entry.js');
let htmlPlugins = require('./webpack.html.js');
const webpack = require('webpack');

// 根据环境选择变量
let outputPath = process.env.NODE_ENV === 'production' ? path.resolve('Z:/cdn/ems/js/') : path.resolve('./dist/');
let publicPath = process.env.NODE_ENV === 'production' ? '//cdn.dianwutong.com/ems/js' : '';

module.exports = {
    context: __dirname,
    entry: entry,
    output: {
        path: outputPath,
        publicPath: publicPath, // 插入到html中的静态文件的路径前缀
        filename: '[name].[hash].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }

        }, {
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // 将 JS 字符串生成为 style 节点
            }, {
                loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
            }, {
                loader: "sass-loader" // 将 Sass 编译成 CSS
            }]
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            Promise: 'es6-promise-promise'
        })
    ].concat(htmlPlugins)

};
