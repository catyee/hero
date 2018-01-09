let fs = require('fs');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackLayoutPlugin = require('html-webpack-layout-plugin');

//------------------------------
// 读取src/js下的页面入口目录
// 除了common和lib外都是各个页面对应的目录
// 构建HtmlWebpackPlugin对象以创建页面
// 其中页面filename为{{目录名称}}.html
// 页面模板为src/view/{{目录名称}}.html
// 页面的chunks只有一个，就是[{{目录名称}}]
//------------------------------

let files = fs.readdirSync('./src/js');

let plugins = [];

// 使用fancybox-layout的页面
const fancyboxLayoutPages = [
    'inspection-bug',
    'repair-log',
    'work-ticket',
    'operation-ticket'
]


files.forEach((file) => {

    if (file === 'common' || file === 'lib') {
        return;
    }

    let filename = process.env.NODE_ENV === 'production' ? ('html/' + file + '.html') : (file + '.html')

    let opts = {
        inject: true,
        filename: filename,
        template: ('./src/view/' + file + '.html'),
        chunksSortMode: 'manual',
        chunks: [file]
    }

    if(fancyboxLayoutPages.indexOf(file) > -1){
        opts.layout = ('./src/view/common/fancybox-layout.html')
    }else{
        opts.layout = ('./src/view/common/layout.html')
    }

    plugins.push(new HtmlWebpackPlugin(opts));

})

plugins.push(new HtmlWebpackLayoutPlugin());

module.exports = plugins;