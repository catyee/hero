require('../../scss/repair-order-list.scss');

import { moni} from '../common/common';
import { commonModel } from '../common/common-model';
import { commonCtrl } from '../common/common-controller';
import { repairLogListModel } from './repair-log-list-model';
require('../common/system-warning-service.js');

var repairLogListCtrl = {
	init : {},
	bind : {},
	render : {},
	getRepLogList : {}, //获取抢修日志列表
	getLogDom : {}, //获取抢修日志DOM

	getCustomerList : {},   //获取客户列表
	renderCusList   : {},   //渲染客户列表
	getCusPRList    : {},   //获取客户的配电室
	renderPRList    : {},   //渲染配电室列表


};

$(function(){
	repairLogListCtrl.init();
});

//初始化页面

repairLogListCtrl.init = function () {
	this.bind();
	this.getRepLogList();
	this.getCustomerList();
	this.getCusPRList();
};

//事件绑定

repairLogListCtrl.bind = function () {

	/***
         * 选择客户下拉框发生改变
         */

	$('#repair-log-customer-select').change(function () {
		var customerId = $(this).val();
		if (customerId != '-1') {
			repairLogListModel.customerId = customerId;
		}else{
			repairLogListModel.customerId = null;
		}

		$('#repair-log-power-room-select>option:gt(0)').remove();
		repairLogListCtrl.getCusPRList();
		repairLogListModel.prId = null;
		repairLogListModel.page = 1;
		repairLogListCtrl.getRepLogList();
	});

	/***
         * 配电室下拉框发生改变
         */

	$('#repair-log-power-room-select').change(function () {
		var prId = $(this).val();
		if(prId != '-1'){
			repairLogListModel.prId = prId;
		}else{
			repairLogListModel.prId = null;
		}
		repairLogListModel.page = 1;
		repairLogListCtrl.getRepLogList();

	});

	/***
         * 日期发生了改变
         */

	$('#repair-log-date-select').datetimepicker({
		format: 'yyyy-mm-dd',
		autoclose: true,
		todayBtn: true,
		startView: 2,
		minView: 2,
		language: 'ch',
	}).on('changeDate', function (e) {
		var date = $('#repair-log-date-select').val();
		repairLogListModel.date = date;
		repairLogListModel.page = 1;
		repairLogListCtrl.getRepLogList();
	});

	/***
         * 清空日期
         */

	$('#clear-repair-log-date').click(function () {
		repairLogListModel.date = null;
		$('#repair-log-date-select').val('');
		repairLogListModel.page = 1;
		repairLogListCtrl.getRepLogList();
	});

	/*翻页*/

	$('#pagination').delegate('li', 'click', function () {
		var page = $(this).attr('page');
		repairLogListModel.page = page;
		repairLogListCtrl.getRepLogList();
	});
};

//渲染页面

repairLogListCtrl.render = function () {
	var logList = repairLogListModel.logList;
	var length = logList.length;
	$('#repair-log-con').empty();
	if(length == 0){
		moni.emptyTips('搜索不到抢修日志', 'repair-log-con');
		$('#result-count').parent().css('display', 'none');
	}else{
		$('#result-count').parent().css('display', 'block');
		$('#result-count').text(repairLogListModel.logNumber);
		for(var i=0 ;i < length; i++){
			$('#repair-log-con').append(repairLogListCtrl.getLogDom(logList[i]));
		}
		moni.disPages('pagination', repairLogListModel.totalPage, repairLogListModel.page);
	}


};

//获取抢修日志DOM

repairLogListCtrl.getLogDom = function (item) {
	var dom = '';
	dom += '<div class="log">';
	dom += '<div class="left color-gray-b">';
	dom += '<div class="content">';
	dom += '<span>' + (item.createTime ? item.createTime.slice(0, 19) : '') + ' 产生报警</span><br/>';
	dom += '<span>客户:' + item.pr.customer.cusName + '</span><br/>';
	dom += '<span>电话:' + item.pr.customer.lxr1Mobile;
	+'</span>';
	dom += '</div>';
	dom += '</div>';
	dom += '<div class="middle">';
	dom += '<div class="top">';
	dom += '</div>';
	dom += '<div class="bottom">';
	dom += '<div class="circle"></div>';
	dom += '</div>';
	dom += '</div>';
	dom += '<div class="right">';
	dom += '<div class="question-desc">';
	dom += '<div class="font18 color-gray-e" style="height:70px;overflow:hidden;text-overflow:ellipsis;">';
	dom += item.problemDesc;
	dom += '</div>';
	dom += '<div class="font16 text-align-r">';
	dom += '<a href="pr-metarial.html?prid=' + item.pr.id + '" class="color-green">' + item.pr.prName + '</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="repair-log.html?d=' + item.id + '" class="color-green-e">详情  <i class="iconfont font18">&#xe605;</i></a>';
	dom += '</div>';
	dom += '</div>';
	dom += '</div>';
	dom += '</div>';

	return dom;
};

//获取抢修日志列表

repairLogListCtrl.getRepLogList = function () {
	repairLogListModel.getRepLogList().subscribe(function(res){
		if(res){
			repairLogListCtrl.render();
		}else{
			$('#repair-log-con').empty();
			moni.emptyTips('搜索不到抢修日志', 'repair-log-con');
			$('#result-count').parent().css('display', 'none');
		}
	});
};

//获取所有客户

repairLogListCtrl.getCustomerList = function () {
	commonModel.getAllCustomer().subscribe(function(res){
		if(res.code == 0){
			repairLogListModel.customerList = res.list;
			repairLogListCtrl.renderCusList();
		}
	});
};

//渲染客户列表

repairLogListCtrl.renderCusList = function () {
	var cusList = repairLogListModel.customerList;
	var length = cusList.length;
	var optionTpl = '<option value="{{cusId}}">{{cusName}}</option>';
	$('#repair-log-customer-select>option:gt(0)').remove();
	for(var i = 0; i < length; i++){
		$('#repair-log-customer-select').append(
			optionTpl.replace('{{cusId}}', cusList[i].id)
				.replace('{{cusName}}', cusList[i].cusName)
		);
	}

};
    
//获取客户的配电室

repairLogListCtrl.getCusPRList = function () {

	commonModel.getAllPROfCustomer(repairLogListModel.customerId).subscribe(function(res){
		if(res.code == 0){
			repairLogListModel.prList = res.list;
			repairLogListCtrl.renderPRList();
		}
	});

};

//渲染配电室列表

repairLogListCtrl.renderPRList = function () {
	var prList = repairLogListModel.prList;
	var length = prList.length;
	var optionTpl = '<option value="{{prId}}">{{prName}}</option>';
	$('#repair-log-power-room-select>option:gt(0)').remove();
	for(var i = 0; i < length; i++){
		$('#repair-log-power-room-select').append(
			optionTpl.replace('{{prId}}', prList[i].id)
				.replace('{{prName}}', prList[i].prName)
		);
	}
};


