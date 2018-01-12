require('../../scss/work-order-list.scss');
import { model } from './model';
import { commonModel } from '../common/common-model';
import { moni } from '../common/common';
require('../common/common-controller');
require('../common/system-warning-service.js');

let app = {
	init : {},		//初始化
	bind : {}, 		//事件绑定

	getPrList	 		: {},	//获取配电室列表
	renderPrList		: {},	//渲染配电室列表

	getOrderList 		: {}, 	//获取工作票列表
	renderOrderList		: {},	//渲染工作票列表
	getOrderDOM			: {},	//获取工作票DOM

	getOrderTplList		: {},	//获取工作票模板列表
};

$(function(){
	app.init();
});

app.init = function(){
	app.bind();
	app.getPrList();
	app.getOrderList();
};

//事件绑定

app.bind = function(){

	//新增工作票

	$('#add-new-order').click(function(){
		app.getOrderTplList();
		$('#add-order-setting-modal').modal();
	});

	//点击新增对话框的“下一步”按钮

	$('#modal-towork-detail-btn').click(function(){
		let prId = $('#modal-add-order-power-room').val();
		let type = $('#modal-order-type').val();
		window.location.href = 'work-order-detail.html?prid='+prId+'&type='+type;
	});

	/*翻页*/

	$('#pagination').delegate('li','click',function(){
		let page = $(this).attr('page');
		model.page = page;
		app.getOrderList();
		return false;
	});

	/*查看详情*/

	$('#work-order-con').delegate('.order-item', 'click', function(){
		let id = $(this).attr('order-id');
		window.location.href = 'work-order-detail.html?d='+id;
	});

	/*选择配电室*/

	$('#power-room-list').change(function(){
		let prId = $(this).val();
		model.prId = (prId!='-1')?prId:null;
		model.page = 1;
		app.getOrderList();
	});

	/*点击搜索按钮*/

	$('#search-btn').click(function(){
		model.keyWord = $.trim($('#order-number').val());
		model.page = 1;
		app.getOrderList();
	});

	/*选择状态*/

	$('.ticket-status').click(function(){
		$(this).siblings().removeClass('btn-success');
		$(this).addClass('btn-success');
		model.status = $(this).attr('status');
		model.page = 1;
		app.getOrderList();
	});
};

//获取配电室列表

app.getPrList = function(){
	commonModel.getAllPowerRoom().subscribe(function (res) {
		if(res.code == '0'){
			model.prList = res.list;
			app.renderPrList();
		}
	});
};

//渲染配电室列表

app.renderPrList = function () {
	let prList = model.prList;
	let length = prList.length;

	let tpl = '<option value="{{id}}">{{content}}</option>';
	$('#power-room-list>option:gt(0)').remove();
	for(let i = 0; i < length; i++){
		$('#power-room-list').append(
			tpl.replace('{{id}}', prList[i].id)
				.replace('{{content}}', prList[i].prName)
		);
		$('#modal-add-order-power-room').append(
			tpl.replace('{{id}}', prList[i].id)
				.replace('{{content}}', prList[i].prName)
		);
	}
};

//获取工作票列表

app.getOrderList = function(){
	model.getOrderList().subscribe(function (res) {
		if(!res || model.orderNumber == 0){
			$('#work-order-con').html('');
			moni.emptyTips('搜索不到工作票', 'notickets');
			$('#notickets').css('display', 'block');
		}else{
			app.renderOrderList();
			$('#notickets').css('display', 'none');
		}
	});
};

//渲染工作票列表

app.renderOrderList = function () {
	let orderList = model.orderList;
	let length = orderList.length;
	$('#work-order-con tr:gt(0)').remove();
	for(let i = 0; i < length; i++){
		$('#work-order-con').append(app.getOrderDOM(orderList[i]));
	}
	moni.disPages('pagination', model.totalPage, model.page);
};

//获取工作票DOM

app.getOrderDOM = function (item) {

	let orderTpl  = '<tr class="order-item" order-id={orderId}>'+
		'<td class="piao-body-body-1">{powerRoom}</td>'+
		'<td class="piao-body-body-1">{orderNumber}</td>'+
		'<td class="piao-body-body-2">{createTime}</td>'+
		'<td class="piao-body-body-2">{status}</td>'+
		'<td class="piao-body-body-3">{isComplete}</td>'+
		'</tr>';

	return orderTpl.replace(/{orderId}/g,item.id)
		.replace(/{powerRoom}/g, item.pr.prName)
		.replace(/{orderNumber}/g,item.gzpNum)
		.replace(/{createTime}/g,item.createTime)
		.replace(/{status}/g,item.checkStatus)
		.replace(/{isComplete}/g, item.completeStatus);
};

//获取工作票模板列表

app.getOrderTplList = function(){
	model.getOrderTplList().subscribe(function (res) {
		if(res.code == '0'){
			for(let i in res.list){
				$('#modal-order-type').append('<option value="'+res.list[i].id+'">'+res.list[i].name+'</option>');
			}
		}
	});
};

