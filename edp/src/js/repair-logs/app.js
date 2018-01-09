require('../../scss/logs.scss');

import { UI } from '../common/ui';
import { repairLogsModel } from './helper';
import { Common } from '../common/common';

let app = {
	init: {},
	bind: {},
	search : {},
	renderLogs  : {},       //渲染日志列表
	getLogDom   : {},       //获取日志DOM
};

$(function () {
	app.init();
});

//初始化

app.init = function () {
	repairLogsModel.prId = Common.getParameter('prid');
	this.repairPagination = new UI.Pagination('pagination');
	this.initState();
	this.bind();
	this.search();
};

//初始化状态

app.initState = function () {
	var state = Common.popState();
	if(state.page){
		repairLogsModel.page = state.page;
	}
	if(state.startDate && state.endDate){
		repairLogsModel.startDate = state.startDate ;
		repairLogsModel.endDate = state.endDate ;
		$('#date-range').val( state.startDate + ' 至 '+ state.endDate);
	}
};

//存储状态

app.setState = function () {
	var state = {
		page : repairLogsModel.page
	};

	if( repairLogsModel.startDate ) {
		state.startDate = repairLogsModel.startDate;
	}

	if( repairLogsModel.endDate ) {

		state.endDate = repairLogsModel.endDate;

	}


	Common.pushState( state );
};



//事件绑定

app.bind = function () {

	//翻页

	this.repairPagination.change(function (value) {
		repairLogsModel.page = value;
		app.search();
	});

	//时间选择器

	var today = new Date().getFullYear()
								+'-'+(new Date().getMonth()+1)
								+'-'+new Date().getDate();
	laydate.render({
		elem:'#date-range',
		theme: '#e9be3b',
		max: today,
		range : '至',
		done:function (value,date) {
			var values = value?value.split('至'):[null,null];
			repairLogsModel.startDate = $.trim(values[0]) ;
			repairLogsModel.endDate = $.trim(values[1]) ;
			repairLogsModel.page = 1;
			app.search();
		}

	});


	//跳转到详情

	$('#log-list').delegate('.log', 'click', function () {
		var id = $(this).data('id');
		app.setState();
		window.location.href = 'repair-log.html?d='+id+'&prid='+repairLogsModel.prId;
	});
};

//搜索日志

app.search = function () {
	repairLogsModel.search().subscribe(function (res) {
		if(res){
			app.renderLogs();
		}
	});
};

//渲染日志列表

app.renderLogs = function () {
	$('#log-list').empty();
	this.repairPagination.update(repairLogsModel.totalPage,repairLogsModel.page);
	if(repairLogsModel.totalPage == 0){
		Common.emptyTips('log-list', '搜索不到日志');
	}
	var logList = repairLogsModel.logList;
	var length = logList.length;
	for(var i=0; i<length; i++){
		$('#log-list').append(app.getLogDom(logList[i]));
	}
};

//获取日志DOM

app.getLogDom = function (item) {

	//体验账号替换掉配电室名字

    item.problemDesc = item.problemDesc? item.problemDesc:'';
	if( Common.isExperience ){
		item.pr.prName = Common.experiencePrName;
		let replaceStr = Common.replaceStr;
		for(let i = 0;i < replaceStr.length; i++){
			item.problemDesc = item.problemDesc.replace( RegExp(replaceStr[i],'g'), Common.realName);
		}
	}

	var tpl  = '<div class="log" data-id="{{id}}"> ';
	tpl += '<div class="head">';
	tpl += '<span>{{title}}</span>';
	tpl += '<span>{{date}}</span>';
	tpl += '</div>';

	tpl += '<div class="line"></div>';
	tpl += '<div class="body noSpill">';
	tpl += '<span>{{problem}}</span>';
	tpl += '</div>';
	tpl += '<div class="footer right">';
	tpl += '<span class="{{color}} font12">{{by}}</span>';
	tpl += '</div>';
	tpl += '</div>';

	return tpl.replace('{{title}}',item.pr.prName )
		.replace('{{problem}}',item.problemDesc)
		.replace('{{date}}',item.createTime.slice(0,-2))
		.replace('{{by}}', item.repairTask?'抢修组长：'+item.repairTask.qxPeople:'未安排抢修')
		.replace('{{color}}', item.repairTask?'':'color-red')
		.replace('{{id}}', item.id);
};

