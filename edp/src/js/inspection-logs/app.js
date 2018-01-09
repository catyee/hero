
require('../../scss/logs.scss');

import { UI } from '../common/ui';
import { Common } from '../common/common';
import  { model } from './model';

let app = {
	init: {},
	initState: {},
	bind: {},
	search: {},
	renderLogs: {},       //渲染日志列表
	getLogDom: {},       //获取日志DOM
};

$(function () {
	app.init();
});

//初始化

app.init = function () {
	model.prId = Common.getParameter('prid');
	this.inspectPagination = new UI.Pagination('pagination');
	this.initState();
	this.bind();
	this.search();
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

		$("#date-range").val(state.startDate + ' 至 ' + state.endDate);
	}
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


	Common.pushState(state);
};


//事件绑定
app.bind = function () {

	//翻页
	this.inspectPagination.change(function (value) {

		model.page = value;
		app.search();

	});

	//时间选择器
	let today = new Date().getFullYear()
		+ '-' + (new Date().getMonth() + 1)
		+ '-' + new Date().getDate();

	laydate.render({
		elem: '#date-range',
		theme: '#e9be3b',
		max: today,
		range: '至',
		done: function (value, date) {
			let values = value ? value.split('至') : [null, null];
			let startDate = $.trim(values[0]);
			let endDate = $.trim(values[1]);

			startDate || (startDate = null);
			endDate || (endDate = null);

			model.startDate = startDate;
			model.endDate = endDate;

			model.page = 1;

			app.search();
		}

	});

	//跳转到详情

	$("#log-list").delegate(".log", "click", function () {
		let id = $(this).data("id");
		app.setState();

		window.location.href = "inspection-log.html?d=" + id + "&prid=" + model.prId;
	})
}

//搜索日志
app.search = function () {
	model.search().subscribe(function (res) {
		if (res) {
			app.renderLogs();
		}
	})
}

//渲染日志列表
app.renderLogs = function () {
	$("#log-list").empty();
	this.inspectPagination.update(model.totalPage, model.page)
	if (model.totalPage == 0) {
		Common.emptyTips("log-list", "搜索不到日志");
	}

	let logList = model.logList;
	let length = logList.length;
	for (let i = 0; i < length; i++) {
		$("#log-list").append(app.getLogDom(logList[i]));
	}
}

//获取日志DOM
app.getLogDom = function (item) {
	let tpl = '<div class="log" data-id="{{id}}">'
	tpl += '<div class="head">';
	tpl += '<span>{{title}}</span><span>{{date}}</span>'
	tpl += '</div>';
	tpl += '<div class="line"></div>';
	tpl += '<div class="body">';
	tpl += '<div>'
	tpl += '<span>日检：{{dailyCount}}项</span>';
	tpl += '<span>周检：{{weekCount}}项</span>';
	tpl += '<span>月检：{{monthCount}}项</span>';
	tpl += '</div>';
	tpl += '<div>'
	tpl += '<div class="height5"></div>'
	tpl += '<span>复检：{{reviewCount}}项</span>';
	tpl += '<span>突发：{{burstCount}}项</span>';
	tpl += '<span>异常：{{ycCount}}项</span>';

	tpl += '</div>';
	tpl += '</div>';
	tpl += '<div class="footer right">';
	tpl += '<span class="font12">巡检组长：{{by}}</span>';
	tpl += '</div>';
	tpl += '</div>';

	return tpl.replace('{{title}}', (Common.isExperience ? Common.experiencePrName : item.pr.prName ) )
		.replace('{{date}}', item.xjDate)
		.replace('{{dailyCount}}', item.rjCount)
		.replace('{{weekCount}}', item.weekCount)
		.replace('{{monthCount}}', item.monthCount)
		.replace('{{reviewCount}}', item.fjCount)
		.replace('{{burstCount}}', item.tfCount)
		.replace('{{ycCount}}', item.ycCount)
		.replace('{{by}}', item.xjzz.realName)
		.replace('{{tel}}', item.xjzz.lxMobile)
		.replace('{{id}}', item.id)
}

