require('../../scss/operation-order-list.scss');

import { moni} from '../common/common';
import { commonModel } from '../common/common-model';
import { commonCtrl } from '../common/common-controller';
import { operOrderListModel } from './operation-order-list-model';

require('../common/system-warning-service.js');

let operOrderListCtrl = {
	init		   	: {},
	bind		   	: {},
	getOrderList 	: {},
	renderOrderList : {},	//渲染操作票列表
	getOrderDOM		: {},	//获取操作票DOM
	getPrList		: {},	//获取配电室列表
	renderPrList	: {},	//渲染配电室列表
};
$(function(){
	operOrderListCtrl.init();
});

//初始化页面

operOrderListCtrl.init = function () {
	operOrderListCtrl.bind();
	operOrderListCtrl.getPrList();
	operOrderListCtrl.getOrderList();
};

operOrderListCtrl.bind = function(){

	//选择日期  重新过滤

	$('#start-ticket-date').datetimepicker({
		format:'yyyy-mm-dd',
		autoclose:true,
		language:'ch',
		minView:2
	}).on('changeDate', function(ev){
		operOrderListModel.page = 1;
		operOrderListModel.date = $('#start-ticket-date').val();
		operOrderListCtrl.getOrderList();
	});

	//清空日期

	$('#clear-operation-select-date').click(function(){
		operOrderListModel.page = 1;
		operOrderListModel.date = null;
		$('#start-ticket-date').val('');
		operOrderListCtrl.getOrderList();
	});

	//选择操作票状态 重新过滤

	$('.ticket-status').click(function(){
		$('.ticket-status').removeClass('btn-success');
		$(this).addClass('btn-success');
		var status = $(this).attr('status');
		operOrderListModel.status =  status;
		operOrderListModel.page = 1;
		operOrderListCtrl.getOrderList();
	});

	/*翻页*/

	$('#pagination').delegate('li','click',function(e){
		var page = $(this).attr('page');
		operOrderListModel.page = page;
		operOrderListCtrl.getOrderList();
	});

	$('#power-room').change(function(){
		var prId = $(this).val();

		(prId == '-1') && (prId = null);

		operOrderListModel.page = 1;
		operOrderListModel.prId = prId;
		operOrderListCtrl.getOrderList();
	});

	/*跳转到详情*/

	$('#poeration-order-con').delegate('.order-item', 'click', function(){
		var id= $(this).attr('order-id');
		window.location.href= 'operation-order-detail.html?d='+id;
	});

	/*新增操作票*/

	$('#add-order-btn').click(function () {
		operOrderListCtrl.getOrderTplList();
		$('#add-order-setting-modal').modal();
	});

	//点击新增对话框的“下一步”按钮

	$('#modal-to-operation-detail-btn').click(function(){
		var prId = $('#modal-add-order-power-room').val();
		var type = $('#modal-order-type').val();
		window.location.href = 'operation-order-detail.html?prid='+prId+'&type='+type;
	});

};

//获取操作票列表

operOrderListCtrl.getOrderList = function () {
	operOrderListModel.getOrderList().subscribe(function (res) {
		if(res){
			operOrderListCtrl.renderOrderList();
		}else {
		}
	});
};

//渲染操作票列表

operOrderListCtrl.renderOrderList = function () {
	var orderList = operOrderListModel.orderList;
	var length = orderList.length;
	$('#poeration-order-con tr:gt(0)').remove();

	if(operOrderListModel.orderNumber == 0){
		$('#notickets').css('display','block');
		$('#tickets-con').css('display','none');
		$('#notickets').empty();
		moni.emptyTips('搜索不到操作票','notickets');
	}else {
		$('#notickets').css('display', 'none');
		$('#tickets-con').css('display', 'block');
		for(var i = 0; i < length; i++){
			$('#poeration-order-con').append(operOrderListCtrl.getOrderDOM(orderList[i]));
		}
	}
	moni.disPages('pagination', operOrderListModel.totalPage, operOrderListModel.page);
};

//获取操作票DOM

operOrderListCtrl.getOrderDOM = function (item) {
	var dom = '';
	dom += '<tr class="order-item" order-id="'+item.id+'">';
	dom += '<td>'+item.pr.prName+'</td>';
	dom += '<td>'+item.fileNum+'</td>';
	dom += '<td>'+(item.createTime?item.createTime.slice(0, -2):'')+'</td>';
	dom += '<td>'+item.checkStatus+'</td>';
	dom += '<td>'+item.completeStatus+'</td>';
	dom += '</tr>';
	return dom;
};

//获取配电室列表

operOrderListCtrl.getPrList = function () {
	commonModel.getAllPowerRoom().subscribe(function (res) {
		operOrderListModel.prList = res.list;
		operOrderListCtrl.renderPrList();
	});
};

//渲染配电室列表

operOrderListCtrl.renderPrList = function () {
	var prList = operOrderListModel.prList;
	var length = prList.length;

	var tpl = '<option value="{{id}}">{{content}}</option>';
	$('#power-room>option:gt(0)').remove();
	for(var i = 0; i < length; i++){
		var pr = tpl.replace('{{id}}', prList[i].id)
			.replace('{{content}}', prList[i].prName);
		$('#modal-add-order-power-room').append(pr);
		$('#power-room').append(pr);
	}
};

//获取操作票模板列表

operOrderListCtrl.getOrderTplList = function(){
	operOrderListModel.getOrderTplList().subscribe(function (res) {
		if(res.code == '0'){
			for(var i in res.list){
				$('#modal-order-type').append('<option value="'+res.list[i].id+'">'+res.list[i].name+'</option>');
			}
		}
	});
};



