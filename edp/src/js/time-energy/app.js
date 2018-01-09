require('../../scss/time.energy.scss');

import {Common} from '../common/common'

import {model} from './model';
import {UI} from '../common/ui';


let app = {
    datePicker: null,

    topChart: null,
    topChartOption: null,

    leftChart: null,
    leftChartOption: null,

    rightChart: null,
    rightChartOption: null,

    invalid: {},//判断日期选择器选择日期是否合法

    init: {},
    bind: {},
    search: {},
    initChart: {},
    initDateRange: {},

    handleTypeChange: {},  //处理报表类型改变的事件
    handleDateChange: {},  //处理时间被选中的事件
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
    let _this = this;

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
    app.topChart = echarts.init(document.getElementById('top-chart'));
    app.topChartOption = {
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
        color: ["#f44336", "#ffc107", "#2196f3", "#4caf50"],
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
        series: [{
            name: "尖电量",
            type: "bar",
            data: [],
        }, {
            name: "峰电量",
            type: "bar",
            data: [],
        }, {
            name: "平电量",
            type: "bar",
            data: [],
        }, {
            name: "谷电量",
            type: "bar",
            data: [],
        }]
    };
    app.topChart.setOption(app.topChartOption);

    app.leftChart = echarts.init(document.getElementById('left-chart'));
    app.leftChartOption = {
        title: {
            show: true,
            text: "对比分析",
            top: "5%",
            left: "3%",
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
            data: ['去年同期', '上月同期', '本期'],
            bottom: "5%"
        },
        color: ["#dfdfdf", "#ffd35e", "#00ccff"],
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            top: "15%",
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['尖占比', '峰占比', '平占比', '谷占比'],
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
        series: [{
            name: "去年同期",
            type: "bar",
            data: [],
        }, {
            name: "上月同期",
            type: "bar",
            data: [],
        }, {
            name: "本期",
            type: "bar",
            data: [],
        }]
    };
    app.leftChart.setOption(app.leftChartOption);

    app.rightChart = echarts.init(document.getElementById('right-chart'));
    app.rightChartOption = {
        title: {
            show: true,
            text: "用电结构",
            top: "5%",
            left: "3%",
            textStyle: {
                fontSize: 16,
                fontWeight: 'normal'
            }
        },
        color: ["#f44336", "#ffc107", "#2196f3", "#4caf50"],
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            data: ['尖电量', '峰电量', '平电量', '谷电量'],
            bottom: "3%",
            right: "3%"
        },
        series: [
            {
                name: '用电结构',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['45%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '10',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {value: 0, name: '尖电量'},
                    {value: 0, name: '峰电量'},
                    {value: 0, name: '平电量'},
                    {value: 0, name: '谷电量'},
                ]
            }
        ]
    };
    app.leftChart.setOption(app.leftChartOption);

}


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

    if (!model.number) {
        return false;
    }
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

    UI.hideProgress();
    app.renderChart();


};

//渲染图表

app.renderChart = function () {

    if (model.text) {

        app.topChartOption.title.text = model.text + '用电量(kWh)';

    }
    app.topChartOption["xAxis"][0].data = model.xAxises;

    app.topChartOption.series = [];
    app.topChartOption.legend.data = [];
    app.topChartOption.legend.data.push(
        {name: '尖电量'},
        {name: '峰电量'},
        {name: '平电量'},
        {name: '谷电量'},
    );

    app.topChartOption.series.push(
        {
            name: '尖电量',
            type: 'bar',
            data: model.JIAN
        },
        {
            name: '峰电量',
            type: 'bar',
            data: model.FENG
        },
        {
            name: '平电量',
            type: 'bar',
            data: model.PING
        },
        {
            name: '谷电量',
            type: 'bar',
            data: model.GU
        }
    );
    app.topChart.setOption(app.topChartOption, true);

    app.rightChartOption.series[0].data[0].value = model.total_JIAN;
    app.rightChartOption.series[0].data[1].value = model.total_FENG;
    app.rightChartOption.series[0].data[2].value = model.total_PING;
    app.rightChartOption.series[0].data[3].value = model.total_GU;

    app.rightChart.setOption(app.rightChartOption, true);

    app.leftChartOption.series = [];
    app.leftChartOption.legend.data = [];
    if (model.type == model.TYPES.DAY) {
        app.leftChartOption.legend.data.push(
            {name: "去年同期"},
            {name: "上月同期"},
            {name: "本期"},
        )
        app.leftChartOption.series.push(
            {
                name: '去年同期',
                type: 'bar',
                data: model.compareLastYear
            },
            {
                name : "上月同期",
                type : "bar",
                data: model.compareLastMonth
            },
            {
                name : "本期",
                type : "bar",
                data: model.compareCurrent
            },
        );
    }


    if (model.type == model.TYPES.MONTH) {
        app.leftChartOption.legend.data.push(
            {name: "去年同期"},
            {name: "本期"},
        )
        app.leftChartOption.series.push(
            {
                name: '去年同期',
                type: 'bar',
                data: model.compareLastYear
            },

            {
                name : "本期",
                type : "bar",
                data: model.compareCurrent
            },
        );
    }
    if (model.type == model.TYPES.YEAR) {
        app.leftChartOption.legend.data.push(

            {name: "本期"},
        )
        app.leftChartOption.series.push(

            {
                name : "本期",
                type : "bar",
                data: model.compareCurrent
            },
        );
    }


    app.leftChart.setOption(app.leftChartOption, true);

};

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
    let dateForYearInput = $("#date-for-year");

    dateForDayInput.hide();
    dateForMonthInput.hide();
    dateForYearInput.hide();
    switch (type) {

        case model.TYPES.DAY :						//日数据
            dateForDayInput.show();
            this.initDateForDay();
            break;
        case model.TYPES.MONTH :				    //月数据
            dateForMonthInput.show();
            this.initDateForMonth();
            break;

        case model.TYPES.YEAR :				    //年数据
            dateForYearInput.show();
            this.initDateForYear();
            break;

    }

};


//处理选中日期的事件

app.handleDateChange = function (startLine, endLine) {

    model.date[model.type] = {
        startDate: startLine,
        endDate: endLine
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
            console.log(endLine)
            _this.handleDateChange(startLine,endLine);

        }

    });

};


