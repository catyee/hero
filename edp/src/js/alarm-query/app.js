require('../../scss/alarm-query.scss');

import { UI } from '../common/ui';
import { Common } from '../common/common';

import { model } from './model';

import { POSITIONCLASSIFY } from '../common/common.enum';

let app = {
	init: {},     //初始化页面
	bind: {},     //事件绑定
	query: {},     //报警查询
	renderAlarms: {},	    //渲染报警
	getAlarmDom: {},     //构造报警
	queryClick: {},     //点击查询
	exportAlarms: {},   //导出报表
};

$(function () {
	model.prId = Common.getParameter('prid');
	app.init();
});


/*初始化页面*/

app.init = function () {

	//全部位置

	this.alarmPositionSelector = new UI.Selector('alarm-position');


	let classify = POSITIONCLASSIFY;
	classify[0] = { value: 0, content: '全部位置' };
	app.alarmPositionSelector.update(classify, classify[0].value);

	//全部时效

	this.alarmStatusSelector = new UI.Selector('alarm-status');

	//全部事件

	this.alarmTypeSelector = new UI.Selector('alarm-type');

	//全部状态

	this.alarmFlagSelector = new UI.Selector('alarm-flag');

	//分页

	this.alarmPagination = new UI.Pagination('pagination');

	this.initState();

	this.bind();

	//获取登录角色 如果Common.roleId != Common.ROLES.KH 则为非客户

	let cusFlag = Common.roleId != Common.ROLES.KH ? null : 1;

	model.cusFlag = cusFlag;

	//如果为客户 全部状态选择框不显示已忽略

	if (cusFlag) {
		const option = [
			{ 'value': -1, 'content': '全部状态' },
			{ 'value': 0, 'content': '未处理' },
			{ 'value': 1, 'content': '处理中' },
			{ 'value': 2, 'content': '已完成' }
		];
		this.alarmFlagSelector.update(option, -1);
	}


	UI.showProgress({});
	setTimeout(function () {

		UI.hideProgress();

	}, 3000);


	this.query();

};


//初始化状态

app.initState = function () {

	let state = Common.popState();
	if (state.page) {
		model.page = state.page;
	}

	if (state.startDate && state.endDate) {
		model.startDate = state.startDate;
		model.endDate = state.endDate;

		$('#date-range').val(state.startDate + ' 至 ' + state.endDate);
	}


	state.position && this.alarmPositionSelector.set(state.position);

	state.status && this.alarmStatusSelector.set(state.status);

	state.type && this.alarmTypeSelector.set(state.type);

	state.flag && this.alarmFlagSelector.set(state.flag);


};

//存储状态

app.setState = function () {
	let state = {
		page: model.page
	};

	if (model.startDate) {
		state.startDate = model.startDate;
	}

	if (model.endDate) {

		state.endDate = model.endDate;

	}

	if (this.alarmPositionSelector.selected) {

		state.position = this.alarmPositionSelector.selected;

	}

	if (this.alarmStatusSelector.selected) {

		state.status = this.alarmStatusSelector.selected;

	}

	if (this.alarmTypeSelector.selected) {

		state.type = this.alarmTypeSelector.selected;

	}

	if (this.alarmFlagSelector.selected) {

		state.flag = this.alarmFlagSelector.selected;

	}

	Common.pushState(state);
};


/*事件绑定*/

app.bind = function () {
	let _this = this;

	//全部位置

	_this.alarmPositionSelector.change(function () {
		if (_this.alarmPositionSelector.selected == 0) {
			_this.alarmPositionSelector.selected = null;
		}
		model.catalogType = _this.alarmPositionSelector.selected;


	});

	//全部时效

	_this.alarmStatusSelector.change(function () {
		if (_this.alarmStatusSelector.selected == 0) {
			_this.alarmStatusSelector.selected = null;
		}
		model.alarmStatus = _this.alarmStatusSelector.selected;
	});


	//全部事件

	_this.alarmTypeSelector.change(function () {
		if (_this.alarmTypeSelector.selected == 0) {
			_this.alarmTypeSelector.selected = null;
		}
		model.alarmClasses = _this.alarmTypeSelector.selected;
	});

	//全部状态

	_this.alarmFlagSelector.change(function () {
		if (_this.alarmFlagSelector.selected == -1) {
			_this.alarmFlagSelector.selected = null;
		}
		model.alarmFlag = _this.alarmFlagSelector.selected;
	});


	//绑定时间选择器

	laydate.render({
		elem: '#date-range',
		range: '至',
		theme: '#e9be2b',
		done: function (value, date) {
			var dates = value ? value.split('至') : [null, null];
			model.startDate = $.trim(dates[0]) ? $.trim(dates[0]) : null;
			model.endDate = $.trim(dates[1]) ? $.trim(dates[1]) : null;
		}
	});

	/*鼠标悬浮*/

	$('#alarm-con').delegate('.alarm-item', 'mouseover', function () {

		if ($(this).hasClass('baojing')) {
			$(this).removeClass('baojing');
			$(this).addClass('baojing-hover');
		} else {
			$(this).removeClass('yujing');
			$(this).addClass('yujing-hover');
		}

	});

	//翻页

	this.alarmPagination.change(function (value) {
		model.page = value;
		app.query();
	});

	//查看详情

	$('#alarm-con').delegate('.alarm-item', 'click', function () {

		var alarmId = $(this).attr('alarm-id');
		app.setState();
		location.href = 'alarm-detail.html?id=' + alarmId;

	});

	// 查询

	$('#query').click(function () {
		app.query();
	});

	// 导出报表

	$('#export').click(function () {
		app.exportAlarms();
	});

};

/*点击查询*/

app.queryClick = function () {

	model.page = 1;
	app.query();

};

/*报警查询*/

app.query = function () {
	UI.showProgress({});
	model.search().subscribe(function (res) {
		if (res) {
			app.renderAlarms();
		}
	});

};

//渲染报警

app.renderAlarms = function () {

	/*重新渲染分页组件*/

	this.alarmPagination.update(model.totalPage, model.page);
	var list = model.alarmList;
	$('#alarm-con').empty();
	setTimeout(function () {

		UI.hideProgress();

	}, 300);
	if (list.length == 0) {
		Common.emptyTips('alarm-con', '搜索不到报警记录');
	} else {

		for (var i in list) {
			$('#alarm-con').append(app.getAlarmDom(list[i]));
		}
	}
};

/*构造报警信息*/

app.getAlarmDom = function (item) {

	item.alarmDesc = item.alarmDesc ? item.alarmDesc : '';

	//替换掉体验账户报警描述中的配电室名字

	if (Common.isExperience && item.alarmDesc) {
		let replaceStr = Common.replaceStr;
		for (let i = 0; i < replaceStr.length; i++) {
			item.alarmDesc = item.alarmDesc.replace(RegExp(replaceStr[i], 'g'), Common.realName);
		}
	}


	var dom = '';
	var solveStatus = ['未处理', '处理中', '处理完', '已忽略'];
	var type = ['', '预警', '报警', '故障'];
	var status = '';

	if (item.isIgnore == '1') {

		status = '<span>已忽略</span>';

	} else {

		status = '<span>' + solveStatus[item.alarmFlag] + '</span>';

	}

	dom += '';

	if (item.alarmType.toString() == '1') {

		dom += '<div class="warning alarm-item item" alarm-id="' + item.id + '">';

	} else {

		dom += '<div class="alarm alarm-item item" alarm-id="' + item.id + '">';

	}

	dom += '<div class="item-left">';
	dom += '<div class="item-left-top">';
	dom += '<div>' + type[item.alarmType] + '</div>';
	dom += '<div>' + status + '</div>';
	dom += '</div>';
	dom += '<div class="item-left-bottom">';
	dom += item.alarmTime ? item.alarmTime.slice(0, 19) : '';
	dom += '</div>';
	dom += '</div>';
	dom += '<div class="item-right">';
	dom += '<div>调度号: ' + (item.ddN ? item.ddN : '') + '</div>';
	dom += '<div class="height3"></div>';
	dom += '<div class="noSpill " title="' + (item.cn ? ' ' + item.cn + ' ' : ' ') + item.alarmDesc + '">描述：' + (item.cn ? ' ' + item.cn + ' ' : ' ') + item.alarmDesc + '</div> ';
	dom += '<div class="height3"></div>';

	if (item.varType == 'AI') {

		//AI点显示报警值

		dom += '<div>报警值:' + item.alarmValue + (item.unit ? item.unit : '') + '</div>';

	} else {

		//DI点根据显示方式来决定是否显示报警值

		if (item.showValue) {
			dom += '<div>报警值:' + item.valueDefine + '</div>';
		}

	}

	dom += '<div class="height3"></div>';
	dom += '<div style="width:100%" class="right">';
	dom += '<span>' + (Common.isExperience ? Common.experiencePrName : item.pr.prName) + '</span>';
	dom += '</div>';

	dom += '</div>';
	dom += '</div>';

	return dom;
};

// 导出报表

app.exportAlarms = function () {
	if (!model.startDate && !model.endDate) {
		UI.alert({
			'content': '请选择日期区间',
			'btn': '知道了',
			'callback': function () {

				//alert("haha")

			}
		});
		return false;
	}

	model.getExcelPath().subscribe(function (res) {

		if (res.code == '0') {
			var a = $('<a>');
			var url = res.prefix + res.url;
			a.attr('download', '报警记录' + model.startDate + '至' + model.endDate + '.xls');
			a.attr('href', url);
			$('body').append(a[0]);
			a[0].click();
			a[0].remove();
		} else if (res.code == '469') {
			UI.alert({
				'content': '该时段内没有报警',
				'btn': '知道了',
				'callback': function () {

					//alert("haha")

				}
			});
		}


	});
};