require('../../scss/common/common.scss');
require('../../scss/compare-energy.scss');

import {model} from './model';
import {Common} from '../common/common';
import {UI} from '../common/ui';

let app = {
    chart: null,
    chartOption: null,
    datePicker: null,
    invalid: {},//判断日期选择器选择日期是否合法
    init: {},
    bind: {},
    search: {},
    initChart: {},
    initDateRange: {},
    render: {},
    renderChart: {},   //渲染图表
    renderTable: {},   //渲染表格

    handleTypeChange: {},  //处理报表类型改变的事件
    handleDateChange: {},  //处理时间被选中的事件設置
    renderCabinets: {},    //渲染调度号/柜子

};

$(function () {

    app.init();

});

//初始化

app.init = function () {

    model.prId = Common.getParameter("prid");
    app.renderCabinets();
    app.bind();
    app.initChart();
    app.initDateRange();

};

//事件绑定

app.bind = function () {
    var _this = this;

    //修改数据类型
    $(".data-type").click(function () {

        let type = $(this).val();
        app.handleTypeChange(type);

    });

    //点击classify

    $("#menu").delegate('.classify', 'click', function () {

        let _this = $(this);
        _this.toggleClass('active');
        _this.find('.node-list').toggle(500);

    });

    //点击回路树
    $('#menu').delegate(".node", "click", function (e) {

        //去掉所有node的selected类

        $(".node").removeClass('selected');

        let node = $(this);

        //为本node添加selected类

        node.addClass('selected');

        let number = node.data('number');

        model.number = number;

        let text = node.find('span').text();

        model.text = text;

        app.search();

        e.stopPropagation()


    });

    //点击查询按钮

    $("#search").click(function () {
        //点击查询按钮，首先检测所选择日期范围是不是过大
        if (_this.invalid.day || _this.invalid.month || _this.invalid.hour) {
            _this.alert("日期选择范围过大，请重新选择");
            return;
        }

        app.search();

    })
};

//日期弹出提示
app.alert = function (content) {
    UI.alert({
        'content': content,
        'btn': '知道了',
        'callback': function () {

        }
    })
    return false;
}

//初始化图表

app.initChart = function () {

    app.chart = echarts.init(document.getElementById('chart'));
    app.chartOption = {
        title: {
            show: true,
            text: "",
            left: "3%",
            top: "3%",
            textStyle: {
                fontSize: 16,
                fontWeight: 'normal'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            show: true,
            data: [],
            top: "3%",
            right: "4%"
        },
        color: ["#dfdfdf", "#ffd35e", "#00ccff"],
        grid: {
            left: '3%',
            right: '4%',
            bottom: '0%',
            top: '15%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: [],
                axisLine: {
                    lineStyle: {
                        color: "#03b679",
                        width: 2
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: "#03b679",
                        width: 2
                    }
                },
                axisTick: {
                    show: false
                }
            }
        ],
        barGap: '-35%',
        barCategoryGap: '10%',
        barMaxWidth: '35',
        series: []
    };

    app.chart.setOption(app.chartOption);
};

//渲染调度号/柜子列表

app.renderCabinets = function () {

    model.getCabinets().subscribe(function (res) {

        if (res) {

            let list = model.cabinets;

            let marked = false; //默认选中的标记

            let tree = list.map(function (type) {

                let nodes = type.list.map(function (node) {

                    if (!marked) {

                        marked = true;

                        model.number = node.ddN;

                        model.text = node.dN + '/' + node.ddN;

                        app.search();

                        return '<li class="selected node" data-number="' + node.ddN + '" title="' + node.ddN + '"><span>' + node.dN + '/' + node.ddN + '</span></li>';

                    }

                    return '<li class="node" data-number="' + node.ddN + '" title="' + node.ddN + '"><span>' + node.dN + '/' + node.ddN + '</span></li>';

                });

                return '<div class="classify"><span class="class-name">' + type.name + ' </span> <ul class="node-list">' + nodes.join('') + '</ul></div>'
            });

            tree = tree.join('');

            $("#menu").html(tree);

            //默认打开第一个分类

            $(".classify").eq(0).addClass('active').find('.node-list').show();

        }
    })

};

//搜索
app.search = function () {

   UI.showProgress();
    model.getData().subscribe(function (res) {
        if (res) {
            app.render();

        } else {

            UI.hideProgress();

        }
    });
};

//渲染

app.render = function () {

    app.renderChart();
    app.renderTable();
    UI.hideProgress();

};

//渲染图表

app.renderChart = function () {

    if (model.text) {
        app.chartOption.title.text = model.text + '用电量(kWh)';
    }

    app.chartOption.xAxis[0].data = model.when;
    app.chartOption.series = [];
    app.chartOption.legend.data = [];
    //如果是时数据
    if (model.type == model.TYPES.HOUR) {
        var lengendData = [
            {
                name: "本期"
            },

            {
                name: "昨日同期"
            },
            {
                name: "上月同期"
            }];
        app.chartOption.legend.data = lengendData;
        app.chartOption.series.push(
            {
                name: '本期',
                type: 'bar',
                data: model.current,
            },
            {
                name: '昨日同期',
                type: 'bar',
                data: model.yesterday,
            },
            {
                name: '上月同期',
                type: 'bar',
                data: model.lastMonth,
            }
        )


    }
    //如果是日数据
    if (model.type == model.TYPES.DAY) {
        lengendData = [
            {name: "本期"},
            {name: "上月同期"},
            {name: '去年同期'}


        ];
        app.chartOption.legend.data = lengendData;
        app.chartOption.series.push(
            {
                name: '本期',
                type: 'bar',
                data: model.current,
            },

            {
                name: '上月同期',
                type: 'bar',
                data: model.lastMonth,
            },
            {
                name: '去年同期',
                type: 'bar',
                data: model.lastYear,
            }
        );
    }
    //如果是月数据
    if (model.type == model.TYPES.MONTH) {
        lengendData = [
            {name: "本期"},
            {name: "去年同期"}

        ]
        app.chartOption.legend.data = lengendData;
        app.chartOption.series.push(
            {
                name: '本期',
                type: 'bar',
                data: model.current,
            },
            {
                name: '去年同期',
                type: 'bar',
                data: model.lastYear,
            },
        )
    }
    //如果是年数据
    if (model.type == model.TYPES.YEAR) {

        app.chartOption.legend.data.push("本期");
        app.chartOption.series.push(
            {
                name: '本期',
                type: 'bar',
                data: model.current,
            },
        )

    }

    app.chart.setOption(app.chartOption, true);
}

//渲染表格

app.renderTable = function () {

    let table = '';
    table += '<tr>';
    table += `<th class="text-align-c">日期</th>
                  <th class="text-align-c">本期电量(kWh)</th>
            `
    if (model.type == model.TYPES.HOUR) {
        table += `
                  <th class="text-align-c">昨日同期电量(kWh)</th>
                  <th class="text-align-c">上月同期电量(kWh)</th>
                  <th class="text-align-c">环比(%)</th>
        `
    }
    if (model.type == model.TYPES.DAY) {
        table += `
                  <th class="text-align-c">上月同期电量(kWh)</th>
                  <th class="text-align-c">去年同期电量(kWh)</th>
                  <th class="text-align-c">环比(%)</th>
                  <th class="text-align-c">同比(%)</th>
        `
    }
    if (model.type == model.TYPES.MONTH) {
        table += `
                  <th class="text-align-c">去年同期电量(kWh)</th>
                  <th class="text-align-c">同比(%)</th>
        `
    }
    if (model.type == model.TYPES.YEAR) {

    }
    table += '</tr>';

    let length = model.when.length;

    for (let i = 0; i < length; i++) {
        let current = model.current[i];
        let lastMonth = model.lastMonth[i];
        let lastYear = model.lastYear[i];
        let yesterday = model.yesterday[i];
        let Mon = model.Mon[i];
        let An = model.An[i];
        if (current == null || isNaN(current)) {
            current = '-';
        }
        if (lastMonth == null || isNaN(lastMonth)) {
            lastMonth = '-';
        }
        if (lastYear == null || isNaN(lastYear)) {
            lastYear = '-';
        }
        if (yesterday == null || isNaN(yesterday)) {
            yesterday = '-';
        }
        if (Mon == null || isNaN(Mon)) {
            Mon = '-';
        }
        if (An == null || isNaN(An)) {
            An = '-';
        }
        table += '<tr>';
        table += '<td>' + model.when[i] + '</td>';
        table += '<td>' + current + '</td>';


        if (model.type == model.TYPES.HOUR) {
            table += `
                  <td >${yesterday}</td>
                  <td >${lastMonth}</td>
                  <td >${Mon}</td>
        `
        }

        if (model.type == model.TYPES.DAY) {
            table += `
                  <td >${lastMonth}</td>
                  <td >${lastYear}</td>
                  <td >${Mon}</td>
                  <td >${An}</td>
        `
        }
        if (model.type == model.TYPES.MONTH) {
            table += `
                  <td>${lastYear}</td>
                  <td>${An}</td>
        `
        }
        if (model.type == model.TYPES.YEAR) {

        }



        table += '</tr>';
    }

    $("#table").html(table);
}

//初始化日期区间

app.initDateRange = function () {

    this.handleTypeChange('DAY');

};

//处理报表类型改变事件

app.handleTypeChange = function (type) {

    type = model.TYPES[type];
    model.type = type;

    let dateForDayInput = $("#date-for-day");
    let dateForMonthInput = $("#date-for-month");
    let dateForHourInput = $("#date-for-hour");
    let dateForYearInput = $("#date-for-year");

    dateForDayInput.hide();
    dateForMonthInput.hide();
    dateForHourInput.hide();
    dateForYearInput.hide();

    switch (type) {

        case model.TYPES.DAY :                         //日数据
            dateForDayInput.show();
            this.initDateForDay();
            break;
        case model.TYPES.MONTH :					  // 月数据
            dateForMonthInput.show();
            this.initDateForMonth();
            break;
        case model.TYPES.HOUR :					  	 // 时数据
            dateForHourInput.show();
            this.initDateForHour();
            break;
        case model.TYPES.YEAR :					  	 // 年数据
            dateForYearInput.show();
            this.initDateForYear();
            break;

    }

};

//处理选中日期的事件

app.handleDateChange = function (startLine,endLine) {

    model.date[model.type] = {
        startDate : startLine,
        endDate   : endLine
    };
    app.search();
};

//初始化日期选择器 日数据时间选择器

app.initDateForDay = function () {
    let _this = this;
    _this.invalid["day"] = false;            //日期选择器选择范围是否合法标志

    if (_this.dateForDay) {

        return false;
    }

    //设置默认范围时七天之前 - 今天
    let dateUtils = new DateUtils();
    let endDate = dateUtils.getFomattedDate('yyyy-MM-dd');
    let endLine = dateUtils.getMillisecondOfDateEnd();
    dateUtils.subDays(7);
    let startDate = dateUtils.getFomattedDate('yyyy-MM-dd');
    let startLine = dateUtils.getMillisecondOfDate();
    let defaultRange = startDate + ' 至 ' + endDate;


    model.date[model.TYPES.DAY] = {
        startDate: startLine,
        endDate: endLine
    };

    _this.dateForDay = laydate.render({

        elem: '#date-for-day',
        type: 'date',
        value: defaultRange,
        format: 'yyyy-MM-dd',
        range: '至',
        theme: '#e9be2b',
        max: endDate,					//大于当前日期不可选
        trigger: 'click',
        done: function (value, date, endDate) {

            let startLine = (new Date(date.year,
                date.month - 1,
                date.date,
                0,
                0,
                0)).getTime();
            let endLine = (new Date(endDate.year,
                endDate.month - 1,
                endDate.date,
                23,
                59,
                59)).getTime();

            //检测不合法，给出提示并且阻止请求数据
            if (endLine - startLine > (31 * 24 * 60 * 60 * 1000)) {
                _this.invalid["day"] = true;
                _this.alert("建议时间区间不超过31天，请重新选择");
                return false;
            } else {
                _this.invalid["day"] = false;
                _this.handleDateChange(startLine,endLine);
            }


        },


    });

};

//初始化日期选择器 月数据时间选择器

app.initDateForMonth = function () {
    let _this = this;
    _this.invalid["month"] = false;            //日期选择器选择范围是否合法标志
    if (_this.dateForMonth) {

        return false;
    }
    //设置默认范围时30天
    let dateUtils = new DateUtils();
    let endDate = dateUtils.getFomattedDate('yyyy-MM');
    let endLine = dateUtils.getMillisecondOfLastDay();
    dateUtils.subDays(31);
    let startDate = dateUtils.getFomattedDate('yyyy-MM');
    let startLine = dateUtils.getMillisecondOfFirstDay();
    let dafaultRange = startDate + ' 至 ' + endDate;
    model.date[model.TYPES.MONTH] = {
        startDate: startLine,
        endDate: endLine
    }


    this.dateForMonth = laydate.render({

        elem: '#date-for-month',
        type: 'month',
        value: dafaultRange,
        format: 'yyyy-MM',
        theme: '#e9be2b',
        range: '至',
        max: endDate,
        trigger: 'click',
        done: function (value, date, endDate) {

            let startLine = (new Date(date.year,
                date.month - 1,
                1,
                0,
                0,
                0)).getTime();

            var endMonthDay = dateUtils.getMonthDays(endDate.month - 1,endDate.year);

            //选择的月份的最后一天
            let endLine = (new Date(endDate.year,
                endDate.month - 1,
                parseFloat(endMonthDay),
                23,
                59,
                59)).getTime();
            //检测不合法，给出提示并且阻止请求数据
            if (endLine - startLine > (24 * 30 * 24 * 60 * 60 * 1000)) {
                _this.invalid["month"] = true;
                _this.alert("建议时间区间不超过两年，请重新选择");
                return false;
            } else {
                _this.invalid["month"] = false;
                _this.handleDateChange(startLine,endLine);
            }


        }

    });

};

//初始化日期选择器 时数据时间选择器
app.initDateForHour = function () {
    let _this = this;
    _this.invalid["hour"] = false;            //日期选择器选择范围是否合法标志

    if (_this.dateForHour) {

        return false;
    }
    //设置默认范围时今天
    let dateUtils = new DateUtils();
    let endDate = dateUtils.getFomattedDate('yyyy-MM-dd hh时');
    let endLine = dateUtils.getMillisecondOfHourEnd();
    dateUtils.subDays(1);
    let startDate = dateUtils.getFomattedDate('yyyy-MM-dd hh时');
    let startLine = dateUtils.getMillisecondOfHour();
    let dafaultRange = startDate + ' 至 ' + endDate;
    model.date[model.TYPES.HOUR] = {
        startDate: startLine,
        endDate: endLine
    }


    this.dateForHour = laydate.render({

        elem: '#date-for-hour',
        type: 'datetime',
        value: dafaultRange,
        format: 'yyyy-MM-dd HH时',
        theme: '#e9be2b',
        range: '至',
        max: endDate,
        trigger: 'click',
        done: function (value, date, endDate) {
            let startLine = (new Date(date.year,
                date.month - 1,
                date.date,
                date.hours,
                0,
                0)).getTime();
            let endLine = (new Date(endDate.year,
                endDate.month - 1,
                endDate.date,
                endDate.hours,
                59,
                59)).getTime();
            //检测不合法，给出提示并且阻止请求数据
            if (endLine - startLine > (48 * 60 * 60 * 1000)) {
                _this.invalid["hour"] = true;
                _this.alert("建议时间区间不超过2天，请重新选择");
                return false;
            } else {
                _this.invalid["hour"] = false;
                _this.handleDateChange(startLine,endLine);
            }


        }

    });

};


//初始化日期选择器 年数据时间选择器

app.initDateForYear = function () {

    if (this.dateForYear) {

        return false;
    }

    let dateUtils = new DateUtils();
    let endDate = dateUtils.getFomattedDate('yyyy年');
    let endLine = dateUtils.getMillisecondOfLastMonth();
    dateUtils.subDays(365);
    let startDate = dateUtils.getFomattedDate('yyyy年');
    let startLine = dateUtils.getMillisecondOfFirstMonth();
    let dafaultRange = startDate + ' 至 ' + endDate;
    model.date[model.TYPES.YEAR] = {
        startDate: startLine,
        endDate: endLine
    }

    let _this = this;

    this.dateForYear = laydate.render({

        elem: '#date-for-year',
        type: 'year',
        value: dafaultRange,
        format: 'yyyy年',
        theme: '#e9be2b',
        range: '至',
        max: endDate,
        trigger: 'click',
        done: function (value, date, endDate) {
            let startLine = (new Date(date.year,
                0,
                1,
                0,
                0,
                0)).getTime();
            let endLine = (new Date(endDate.year,
                11,
                31,
                23,
                59,
                59)).getTime();
            _this.handleDateChange(startLine,endLine);

        }

    });

};