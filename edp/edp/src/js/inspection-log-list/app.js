require('../../scss/inspection-log-list.scss');

import { moni} from '../common/common';
import { commonModel } from '../common/common-model';
import { commonCtrl } from '../common/common-controller';
import { insLogListModel  } from './inspection-log-list-model';

require('../common/system-warning-service.js');

var insLogListCtrl = {
	init : {},
	bind : {},
	getInsLogList : {},     //获取巡检日志列表
	renderInsLogList : {},  //渲染巡检日志列表
	getInsLogDom : {},      //获取巡检日志DOM

	getAllCusList : {},     //获取客户列表
	renderCusList : {},     //渲染客户列表
	getCusAllPrList : {},   //获取客户的配电室
	renderPrList  : {},      //渲染配电室列表

};

$(function () {
	insLogListCtrl.init();
});

insLogListCtrl.init = function () {
	insLogListCtrl.bind();
	insLogListCtrl.getInsLogList();
	insLogListCtrl.getAllCusList();
	insLogListCtrl.getCusAllPrList();
};

//事件绑定

insLogListCtrl.bind = function () {

	/***
         * 选择客户下拉框发生改变
         */

	$('#inspection-log-customer-select').change(function(){
		$('#inspection-log-power-room-select>option:gt(0)').remove();
		var customId = $(this).val();
		insLogListModel.cusPRList = [];
		insLogListModel.prId = null;
		insLogListModel.cusId = (customId=='-1'?null:customId);
		insLogListModel.page = 1;

		insLogListCtrl.getCusAllPrList();
		insLogListCtrl.getInsLogList();
	});

	/***
         * 配电室下拉框发生改变
         */

	$('#inspection-log-power-room-select').change(function(){
		insLogListModel.prId = $(this).val();
		insLogListModel.page = 1;
		insLogListCtrl.getInsLogList();
	});


	/***
         * 日期发生了改变
         */

	$('#inspection-log-date').datetimepicker({
		format: 'yyyy-mm-dd',
		autoclose: true,
		todayBtn: true,
		startView: 2,
		minView: 2,
		language:'ch',
	}).on('changeDate',function(e){
		insLogListModel.date =  $('#inspection-log-date').val();
		insLogListModel.page = 1;
		insLogListCtrl.getInsLogList();
	});


	/***
         * 清空日期
         */

	$('#clear-inspection-select-date').click(function(){
		$('#inspection-log-date').val('');
		insLogListModel.date =  null;
		insLogListModel.page = 1;
		insLogListCtrl.getInsLogList();
	});

	/*翻页*/

	$('#pagination').delegate('li','click',function(e){
		var page = $(this).attr('page');
		insLogListModel.page = page;
		insLogListCtrl.getInsLogList();
	});
};

//获取巡检日志列表

insLogListCtrl.getInsLogList = function () {
	insLogListModel.getInsLogList().subscribe(function(res){
		if(res){
			insLogListCtrl.renderInsLogList();
		}else{

			//获取失败

		}
	});
};

//渲染巡检日志列表

insLogListCtrl.renderInsLogList = function () {

	var logList = insLogListModel.logList;
	var length = logList.length;

	$('#inspection-logs-con').empty();
	if(insLogListModel.logNumber == 0){
		moni.emptyTips('搜索不到巡检日志','inspection-logs-con');
		$('#result-count').parent().css('display','none');
	}else {
		for (var i = 0; i < length; i++) {
			$('#inspection-logs-con').append(insLogListCtrl.getInsLogDom(logList[i]));
		}
		$('#result-count').parent().css('display', 'block');
		$('#result-count').text(insLogListModel.logNumber);
		moni.disPages('pagination', insLogListModel.totalPage, insLogListModel.page);
	}
};

//获取巡检日志DOM

insLogListCtrl.getInsLogDom = function (item) {
	var dom = '';

	dom += '<div class="log">';
	dom += '<div class="left color-gray-b ">';
	dom += '<div class="top"></div>';
	dom += '<div class="content">';
	dom += '<span class="font18">巡检日期：'+item.xjDate+'</span><br/>';
	dom += '<span class="font18">巡检组长：'+item.xjzz.realName+'</span><br/>';
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
	dom += '<div class="font18 color-gray-e" style="height:30px;overflow:hidden;text-overflow:ellipsis;">';
	dom += '<a href="pr-metarial.html?prid='+item.prId+'" class="color-green-e">'+item.pr.prName+'</a>';
	dom += '</div>';
	dom += '<div class="font18" style="height:30px;">';
	dom += '客户：'+item.pr.customer.cusName;
	dom += '</div>';
	dom += '<div class="font18" style="height:30px;display:flex;justify-content:space-between">';
	dom += '<div>电话：'+item.pr.customer.lxr1Mobile+'</div>';
	dom += '<div><a href="inspection-log.html?d='+item.id+'&prid='+item.prId+'" class="font16 color-green-e">详情 <i class="iconfont font18">&#xe605;</i></a></div>';
	dom += '</div>';
	dom += '</div>';
	dom += '</div>';

	return dom;

};

/*显示巡检日志列表*/

insLogListCtrl.disInspectionlogList = function(){
	var page = $('#inspection-log-pagination').attr('page');
	var customerId = $('#inspection-log-customer-select').val();
	var powerRoomId = $('#inspection-log-power-room-select').val();
	var inspectionTeamId = $('#inspection-log-teamer-id').val();
	var inspectionDate = $('#inspection-log-date').val();

	if(customerId == '-1'){
		customerId = null;
	}

	if(powerRoomId == '-1'){
		powerRoomId = null;
	}

	if(inspectionTeamId == '-1'){
		inspectionTeamId = null;
	}

	if(inspectionDate.length == 0){
		inspectionDate = null;
	}

	indexModel.getInspectionLogs(page, customerId, powerRoomId, inspectionTeamId, inspectionDate, function(result){
		if(result.code == '0'){
			moni.disPages('inspection-log-pagination', result.pageTotal, result.currentPage);
			$('#inspection-logs-con').empty();

			if(result.logsCount == '0'){
				moni.emptyTips('搜索不到巡检日志','inspection-logs-con');
				$('#result-count').parent().css('display','none');
				return false;
			}
			$('#result-count').text(result.logsCount);
			$('#result-count').parent().css('display','block');
			var dom = '';
			for(var i=0; i<result.logsList.length; i++){

				dom = '';
				if(i==0){
					dom += '<div class="one">';
				}else{
					dom += '<div class="two">';
				}

				dom += '<div class="one-1 color-gray-b ">';
				dom += '<div class="one-1-1">';
				dom += '</div>';
				dom += '<div class="one-1-2">';
				dom += '<span class="font18">巡检日期：'+result.logsList[i].inspectDate+'</span><br/>';
				dom += '<span class="font18">巡检组长：'+result.logsList[i].groupLeader+'</span><br/>';
				dom += '</div>';
				dom += '</div>';
				dom += '<div class="one-2">';
				if(result.logsList.length == 1){
					dom += '<div class="one-2-1-3">';
					dom += '</div>';
					dom += '<div class="">';
					dom += '<div class="one-0 circle"></div>';
					dom += '</div>';
				}else if(i==0){
					dom += '<div class="one-2-1">';
					dom += '</div>';
					dom += '<div class="one-2-2">';
					dom += '<div class="one-0 circle"></div>';
					dom += '</div>';
				}else if(i == (result.logsList.length-1)){
					dom += '<div class="one-2-1-2">';
					dom += '</div>';
					dom += '<div class="one-2-2-1">';
					dom += '<div class="one-0 circle"></div>';
					dom += '</div>';
				}else{
					dom += '<div class="one-2-1-1">';
					dom += '</div>';
					dom += '<div class="one-2-2">';
					dom += '<div class="one-0 circle"></div>';
					dom += '</div>';
				}


				dom += '</div>';
				dom += '<div class="one-3 ">';
				dom += '<div class="one-3-1 box-shadow3 inspection-log-item">';
				dom += '<div class="font18 color-gray-e" style="height:30px;overflow:hidden;text-overflow:ellipsis;">';
				//dom += '<a href="pr-history-data.do?prid='+result.logsList[i].prId+'" class="color-green-e">'+result.logsList[i].prName+'</a>';
				dom += '</div>';
				dom += '<div class="font18" style="height:30px;">';
				dom += '客户：'+result.logsList[i].cusName;
				dom += '</div>';
				dom += '<div class="font18" style="height:30px;display:flex;justify-content:space-between">';
				dom += '<div>电话：'+result.logsList[i].cusMobile+'</div>';
				dom += '<div><a href="inspection-log.html?d='+result.logsList[i].routeId+'&prid='+result.logsList[i].prId+'" class="font16 color-green-e">详情 <i class="iconfont font18">&#xe605;</i></a></div>';
				dom += '</div>';
				dom += '</div>';
				dom += '</div>';
				dom += '</div>';

				$('#inspection-logs-con').append(dom);

			}
		}
	});
};

//获取客户列表

insLogListCtrl.getAllCusList = function(){
	commonModel.getAllCustomer().subscribe(function(res){
		insLogListModel.customerList = res.list;
		insLogListCtrl.renderCusList();
	});
};

//渲染客户列表

insLogListCtrl.renderCusList = function(){
	var cusList = insLogListModel.customerList;
	var length = cusList.length;
	var tpl = '<option value="{{id}}">{{content}}</option>';
	$('#inspection-log-customer-select>option:gt(0)').remove();
	for(var i = 0; i < length; i++){
		$('#inspection-log-customer-select').append(
			tpl.replace('{{id}}', cusList[i].id)
				.replace('{{content}}', cusList[i].cusName)

		);
	}
};

//获取配电室列表

insLogListCtrl.getCusAllPrList = function(){
	commonModel.getAllPROfCustomer(insLogListModel.cusId).subscribe(function(res){
		insLogListModel.cusPRList = res.list;
		insLogListCtrl.renderPrList();
	});
};

//渲染配电室列表

insLogListCtrl.renderPrList = function () {
	var prList = insLogListModel.cusPRList;
	var length = prList.length;
	var tpl = '<option value="{{id}}">{{content}}</option>';
	$('#inspection-log-power-room-select>option:gt(0)').remove();
	for(var i = 0; i < length; i++){
		$('#inspection-log-power-room-select').append(
			tpl.replace('{{id}}', prList[i].id)
				.replace('{{content}}', prList[i].prName)

		);
	}
};

