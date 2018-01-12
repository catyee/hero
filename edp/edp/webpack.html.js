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
    'order-detail',
    'repair-log',
    'inspection-bug',
    // 'work-ticket',
    // 'operation-ticket'
]

// 使用datetimepicker-layout的页面
const datetimepickerLayoutPages = [
    'inspection-arrange',
    'repair-order-list',
    'inspection-log-list',
    'operation-order-list',
    'work-order-list',

]

// 操作票和工作票详情 包含 wangEditor jqueryConfirm  fancybox html2canvas ajaxupload
const ticketDetailLayoutPages = [
    'operation-order-detail',
    'work-order-detail',

]

// 配电室基本信息
const prBaseInfoLayoutPages = [
    'pr-metarial',
    'pr-repair-log',
    'pr-inspection-log',
    'pr-check-list'
]

files.forEach((file) => {

    if (file === 'common' || file === 'lib' || file == 'jkviewer') {
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
    if (file == 'login' || file == 'map') {

        opts.layout = '';

    } else {
        if (fancyboxLayoutPages.indexOf(file) > -1) {

            opts.layout = ('./src/view/common/fancybox-layout.html');

        } else if (datetimepickerLayoutPages.indexOf(file) > -1) {

            opts.layout = ('./src/view/common/datetimepicker-layout.html');

        } else if (ticketDetailLayoutPages.indexOf(file) > -1) {

            opts.layout = ('./src/view/common/ticketDetail-layout.html');

        } else if (prBaseInfoLayoutPages.indexOf(file) > -1) {

            opts.layout = ('./src/view/common/prBaseInfo-layout.html');

        } else {
            opts.layout = ('./src/view/common/layout.html')

        }


    }
    plugins.push(new HtmlWebpackPlugin(opts));
})

plugins.push(new HtmlWebpackLayoutPlugin());

module.exports = plugins;