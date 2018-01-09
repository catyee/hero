require('../../scss/report.scss');
import { UI } from '../common/ui';
import { Common } from '../common/common'
import { reportModel } from './report-model'

let app = {
	options: {},//表格的配置项

	init: {},
	bind: {},
	search: {},
	initDateRange: {},
	render: {},   //渲染
	getClassify: {},	//获取位置分类

	handleTypeChange: {},  //处理报表类型改变的事件

};

$(function () {

	app.init();

});

//初始化

app.init = function () {

	reportModel.prId = Common.getParameter("prid");

	this.setHeight();
	this.options.id = 'report-table';
	this.reportTable = new UI.FlexTable(this.options);

	this.classifySelector = new UI.Selector('classify');
	this.dispatchCheckbox = new UI.CheckBox({ id: 'dispatchMum', colums: 3 });

	this.bind();
	this.initDateRange();
	this.initClassify();
	app.initChart();

};

//计算表格的高度

app.setHeight = function () {

	let tableHeight = $(window).height() - $('.header-empty').height() - $('.height30').height();
	$('#report-table').css('height', tableHeight);
	$('.table-container').css('height', tableHeight);
	$('#report-charts').css('height', tableHeight);

};

//事件绑定

app.bind = function () {

	// 切换表格/图表
	$("#toggleCharts").change(function () {

		let isChecked = $(this).is(":checked");

		if (isChecked) {
			$("#report-table").hide();
			$("#report-charts").show();
		} else {
			$("#report-table").show();
			$("#report-charts").hide();
		}

	});

	//点击查询按钮

	$('#query').on('click', function () {

		reportModel.page = 1;
		app.search();

	});

	//位置选择器发生变化

	this.classifySelector.change(function () {

		app.getDispatchMum();

	});

	this.dispatchCheckbox.change(function () {

		reportModel.dispatchMum = this.checked.join(',');

	});

	$('#export-table').on('click', function () {
		UI.showProgress();
		reportModel.exportReport().subscribe(function (res) {
			UI.hideProgress();
			if (res) {
				var a = document.createElement("a");
				var report = reportModel.report;
				a.href = report.prefix + report.url;
				var dateRange = $("#date-range").val().replace('至', '-');
				var name = '统计报表(' + dateRange + ').xls';
				a.setAttribute("download", name);
				$("body").append(a);
				$('#query').click();
				a.click();
				a.remove();
			}
		})
	})

};

//初始化时间选择器

app.initDateRange = function () {

	let dateUtils = new DateUtils();

	let endDateStr = dateUtils.getFomattedDate('yyyy-MM-dd');

	reportModel.endDate = dateUtils.getMillisecondOfDateEnd();

	dateUtils.subDays(6);

	let startDateStr = dateUtils.getFomattedDate('yyyy-MM-dd');
	reportModel.startDate = dateUtils.getMillisecondOfDate();

	let defaultRange = startDateStr + ' 至 ' + endDateStr;

	$('#date-range').val(defaultRange);

	//绑定日期选择器

	let layDate = laydate.render({
		elem: '#date-range',
		type: 'date',
		theme: '#e9be2b',
		format: 'yyyy-MM-dd',
		range: '至',
		max: endDateStr,
		value: defaultRange,
		done: function (value, date) {

			var values = value.split('至');

			let startDate = $.trim(values[0]) ? $.trim(values[0]) : null;

			let endDate = $.trim(values[1]) ? $.trim(values[1]) : null;

			reportModel.startDate = (new DateUtils(startDate)).getMillisecondOfDate();

			reportModel.endDate = (new DateUtils(endDate)).getMillisecondOfDateEnd();

			app.day = (new Date(reportModel.endDate).getTime() - new Date(reportModel.startDate).getTime()) / 1000 / 3600 / 24;

			if (app.day > 31) {

				layDate.hint('为了方便您的体验，日期可选范围限定在31天内，请重新选择');

			}
		},

	});

}

/*获取位置分类*/
app.initClassify = function () {

	Common.getPrPositionClassify(reportModel.prId, true).subscribe(function (data) {
		if (data.code == '0') {

			if (data.list.length > 0) {
				app.classifySelector.update(data.list, data.list[0].value);
				app.getDispatchMum();
			}

		}

	})

}

/*获取调度号列表*/

app.getDispatchMum = function () {

	let ct = this.classifySelector.selected;

	reportModel.getDispatchMum(reportModel.prId, ct).subscribe(function (res) {
		if (res) {
			app.renderDispatchMum();
		}
	})
};

//渲染调度号列表

app.renderDispatchMum = function () {

	let dispatchMumList = reportModel.dispatchMum;
	let length = dispatchMumList.length;

	let list = [];

	for (let i = 0; i < length; i++) {

		list.push({
			value: dispatchMumList[i].ddN,
			content: dispatchMumList[i].ddN + dispatchMumList[i].dN
		});

	}

	this.dispatchCheckbox.update({

		data: list,
		defaultChecked: 20

	});

	this.search();
};

//搜索

app.search = function () {

	UI.showProgress();
	reportModel.getData().subscribe(function (res) {
		if (res) {
			app.render();
			app.renderChart();
			UI.hideProgress();
		}
	})

};

//渲染统计报表

app.render = function () {

	var timeList = reportModel.timeList;

	//渲染表格内容

	var records = reportModel.records;
	$("#toggleCharts").removeAttr('checked');

	if (timeList == null || !timeList.length) {

		if ($("#empty-tip")) {
			$("#empty-tip").remove();
		}
		$("#report-table").css("display", "none");
		$('#export-table').css("display", "none");

		Common.emptyTips("con", "没有数据");
		$("#toggleCharts").attr('disabled', true);

	} else {
		$("#toggleCharts").removeAttr('disabled');
		$("#empty-tip").css("display", "none");
		$("#report-table").css("display", "table");
		$('#export-table').css("display", "block");

		//构造title

		this.options.title = ['监测点'];

		//构造表头

		let headers = ['总电量'].concat(timeList);
		this.options.header = [];

		for (let i in headers) {
			var obj = {
				content: headers[i]
			}
			this.options.header.push(obj);
		}


		//构造表格第一列 表格内数据

		this.options.data = [];
		let firstColumns = [];
		if (records.length) {
			for (var i = 0; i < records.length; i++) {

				//表格第一列

				var total = 0;
				var data = [];//用来存储每一行的value

				firstColumns.push(records[i].deviceName);

				//表格内数据

				let values = records[i].values;

				for (var j = 0; j < values.length; j++) {

					var value = values[j];

					if (value == null || isNaN(value)) {
						value = '-';
					} else {

						if (value < 0) {

							value = 0;

						}

						value = value.toFixed(2);

					}
					if (value == '-') {

						total += 0;

					} else {

						total += parseFloat(value);

					}

					data.push(value);
				}
				total = total.toFixed(2);

				data.unshift(total);

				this.options.data.push(data);

			}
			this.options.firstColumns = firstColumns;
		}

		this.reportTable.update(this.options);
	}
};

//初始化图表

app.initChart = function () {
	var hours = [];
	var days = [];

	var data = [];


	app.chart = echarts.init(document.getElementById('report-charts'));
	app.chartOption = {
		tooltip: {
			formatter: function (param) {
				let content = "位置: " + app.chartOption.xAxis3D.data[param.data[0]] + "<br>";

				content += "时间:" + app.chartOption.yAxis3D.data[param.data[1]] + "<br>";
				content += "能耗:" + param.data[2];
				return content;
			}
		},
		visualMap: {
			max: 10000,
			inRange: {
				color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
			}
		},
		xAxis3D: {
			type: 'category',
			data: hours
		},
		yAxis3D: {
			type: 'category',
			data: days
		},
		zAxis3D: {
			type: 'value'
		},
		grid3D: {
			boxWidth: 200,
			boxDepth: 80,
			light: {
				main: {
					intensity: 1.2
				},
				ambient: {
					intensity: 0.3
				}
			}
		},
		series: [{
			type: 'bar3D',
			data: data.map(function (item) {
				return {
					value: [item[1], item[0], item[2]]
				}
			}),
			shading: 'color',
			label: {
				show: false,
				textStyle: {
					fontSize: 16,
					borderWidth: 1,
					color:'#e9be2b'
				}
			},

			itemStyle: {
				opacity: 0.8
			},

			emphasis: {
				label: {
					textStyle: {
						fontSize: 20,
						color: '#03b679'
					}
				},
				itemStyle: {
					color: '#e9be2b'
				}
			}
		}]
	};

	app.chart.setOption(app.chartOption);

	$("#report-charts").hide();
};

// 渲染图标

app.renderChart = function () {

	let X = [];
	let Y = [];
	let Z = [];

	Y = reportModel.timeList;

	// 最大值
	let max = 0;

	//渲染表格内容

	var records = reportModel.records;

	//构造表格第一列 表格内数据

	if (records.length) {
		for (var i = 0; i < records.length; i++) {


			X.push(records[i].deviceName);

			//表格内数据

			let values = records[i].values;

			for (var j = 0; j < values.length; j++) {

				var value = values[j];

				if (value == null || isNaN(value)) {
					value = '-';
				} else {

					if (value < 0) {

						value = 0;

					}
					value = parseFloat(value);
					if (value > max) {
						max = value;
					}

					value = value.toFixed(2);
					

					console.log(value, max)
					
				}

				Z.push([i, j, value])


			}

		}

	}

	app.chartOption.series[0].data = Z;
	app.chartOption.xAxis3D.data = X;
	app.chartOption.yAxis3D.data = Y;
	app.chartOption.visualMap.max = max;
	app.chart.setOption(app.chartOption);

}
