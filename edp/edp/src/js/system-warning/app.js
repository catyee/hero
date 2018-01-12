
/*globals commonModel , BaseModel*/

require('../../scss/system-warning.scss');


import { commonModel } from '../common/common-model';
import { commonCtrl } from '../common/common-controller';
import { moni } from '../common/common';
import { BaseModel } from '../common/web-socket-base-model';

require('../common/system-warning-service.js');

(function(){
	'use strict';
	let ctrl = {
		init: {},			//初始化页面
		initModel: {},		//初始化socket
		bind: {},			//事件绑定
		render: {},   		//渲染页面
		createAlarmDom: {},			//创建报警DOM
		renderPrList: {},    		//渲染配电室下拉选框
		clearAlarms: {},    		//清空本地的报警

		handleChange: {},      		//处理数据变化的方法
		handleOpen: {},       		//处理链接成功的数据
		handleDataAdd: {},       	//处理新增数据
		handleDataUpdate: {},       //处理数据更新
		handleDataDelete: {},       //处理数据被删除
		searchPowerRoom: {},        //搜索配电室
		renderAlarmNumber: {},		//渲染报警数量

		selectedPrId	: null,		//被选中的配电室id 用作过滤报警
		selectedStatus	: '-1',		//被选中的状态 过滤条件
		willIgnoreAlarmId	: null,	//将被忽略的报警id
		model: null      			//数据model
	};

	$(function(){
		ctrl.init();
	});


	ctrl.init = function(){
		ctrl.bind();
		ctrl.initSocket();
	};

	//事件绑定

	ctrl.bind = function(){

		//切换过滤报警状态的按钮

		$('.alarm-status').click( function(){

			var _this = $(this);
			var status = _this.attr( 'status' );
			ctrl.selectedStatus = status;

			$('.alarm-status').removeClass( 'btn-success' );
			_this.addClass( 'btn-success' );

			ctrl.reRenderAlarmList();

		});


		//搜索配电室 过滤被选中配电室的报警
		//search-select 的input被选中
		//取消被选中的prId

		$('#power-room-search-key').focus(function(){

			ctrl.selectedPrId = null;
			commonModel.getAllPowerRoom('').subscribe(function(res){
				if(res.code == '0'){
					ctrl.renderPrList(res.list);
				}
			});

		});

		//监听搜索框键盘弹起事件 然后搜索配电室

		var keyTimer = null;
		$('#power-room-search-key').keyup(function(){

			if( keyTimer ){
				clearTimeout( keyTimer );
			}

			keyTimer = setTimeout( function(){
				commonModel.getAllPowerRoom($('#power-room-search-key').val()).subscribe(function(res){
					if(res.code == '0'){
						ctrl.renderPrList(res.list);
					}
				});
			}, 300 );

		});

		//点击配电室列表 选择配电室

		$('#power-room-list').delegate('.option', 'click', function(){

			var powerRoomId = $(this).attr('power-room-id');
			ctrl.selectedPrId = powerRoomId;
			ctrl.clearAlarms();
			ctrl.reRenderAlarmList();

		});

		//取消选中的配电室

		$('#remove-pr').click(function(){

			ctrl.selectedPrId = null;
			ctrl.clearAlarms();
			ctrl.reRenderAlarmList();
			
		});

		//鼠标悬浮

		$('#alarm-items-con').delegate( '.alarm-item', 'mouseover', function(){

			if($(this).hasClass('baojing')){
				$(this).removeClass('baojing');
				$(this).addClass('baojing-hover');
			}else{
				$(this).removeClass('yujing');
				$(this).addClass('yujing-hover');
			}

		});

		$('#alarm-items-con').delegate('.alarm-item','mouseout',function(){

			if($(this).hasClass('baojing-hover')){
				$(this).removeClass('baojing-hover');
				$(this).addClass('baojing');
			}else{
				$(this).removeClass('yujing-hover');
				$(this).addClass('yujing');
			}
		});

		//忽略报警

		$('#alarm-items-con').delegate('.ignore-alarm', 'click', function(e){

			var alarmId = $(this).attr('aid');
			var alarm = ctrl.model.data[alarmId];
			var alarmStatus = alarm.status;
			var way = alarm.way;

			if( alarmStatus == 2 || way == 3){

				//确认提示

				ctrl.willIgnoreAlarmId = alarmId;
				$('#ignore-alarm-modal').modal();

			}else if( alarmStatus == 1  ){

				//实时报警 非变位报警 不能忽略

				$('#disable-ignore-alarm-modal').modal();

			}

			e.stopPropagation();

		});

		//确认忽略

		$('#confirm-ignore-alarm').click(function(){

			$('#ignore-alarm-modal').modal('hide');
			var alarmId = ctrl.willIgnoreAlarmId;

			var param = {
				path : '/dwt/iems/bussiness/qx/ignore_bj',
				data : {
					alarmId : alarmId
				}
			};

			commonModel.post(param).subscribe(function(res){

				if(res.code != '0'){

					alert('忽略失败');

				}

			});

		});

		/*跳转到报警详情*/

		$('#alarm-items-con').delegate('.alarm-item', 'click', function(){

			var alarmId = $(this).data('alarm-id');
			window.location.href =  'warning-detail.html?aid='+alarmId ;

		});
	};

	//初始化websocket

	ctrl.initSocket = function () {

		var userId = commonModel.userId;
		var roleId = commonModel.roleId;
		var url = 'ws://192.169.0.116:8088/iems/bj_socket/' + userId + '/' + roleId;

		// var url = 'ws://iems.dianwutong.com/iems/bj_socket/60/' + roleId;

		this.model = new BaseModel( url );
		this.model.addEventListener( 'change', this.handleChange );

	};


	//渲染报警数量

	ctrl.renderAlarmNumber = function () {

		var alarms = $('.alarm-item');
		var resultCount = $('#result-count');
		var alarmCount = alarms.length;

		resultCount.text( alarmCount );

		if( alarmCount == 0 ){
			moni.emptyTips( '搜索不到报警', 'alarm-items-con' );
		}

	};
    
	//处理数据发生变化

	ctrl.handleChange = function (type, data) {

		switch ( type ){
		case 'OPEN' : ctrl.handleOpen(data); break;
		case 'ADD'  : ctrl.handleDataAdd(data.reverse()); break;
		case 'UPD'  : ctrl.handleDataUpdate(data); break;
		case 'DEL'  : ctrl.handleDataDelete(data); break;
		}

		ctrl.renderAlarmNumber();

	};

	//处理成功打开socket

	ctrl.handleOpen = function (data) {

		$('#alarm-items-con').empty();
		this.handleDataAdd( data);

	};

	//处理新增数据

	ctrl.handleDataAdd = function(data){

		var length = data.length;
		var dom = null;
		var firstDom = null;
		for(var i = 0; i < length; i++){
			if( data.hasOwnProperty( i ) ){
				if(ctrl.selectedPrId && ctrl.selectedPrId != data[i].prId){
					continue;
				}

				//data[i].status == 2 历史

				dom = null;

				if( ctrl.selectedStatus == 1 && ctrl.selectedStatus == data[i].status){

					dom = ctrl.createAlarmDom(data[i]);

				}else if( ctrl.selectedStatus == 2 && ctrl.selectedStatus == data[i].status){

					dom = ctrl.createAlarmDom(data[i]);

				}else if( ctrl.selectedStatus == -1 ){

					dom = ctrl.createAlarmDom(data[i]);

				}


				//如果是第一次打开的话 按顺序插入 否则插入到最前面

				var items = $('.alarm-item');

				if ( items.length > 0 ){

					firstDom = $(items[0]);

				}

				if( !firstDom ) {

					$('#alarm-items-con').append( dom );

				}else {

					firstDom.before( dom );

				}

			}

		}

	};

	//处理数据的改变

	ctrl.handleDataUpdate = function ( data ) {

		for( var i in data ){
			if( data.hasOwnProperty( i ) ){
				var alarmDom = $( '.alarm-item[alarm-id="' + data[i].id + '"]' );
				if( alarmDom ){
					alarmDom.replaceWith( ctrl.createAlarmDom( data[i] ) );
				}
			}
		}

	};

	//处理删除数据

	ctrl.handleDataDelete = function( data ){

		for ( var i in data ){
			if ( data.hasOwnProperty( i ) ){
				var alarmDom = $('.alarm-item[alarm-id="' + data[i] + '"]');
				if( alarmDom ){
					alarmDom.remove();
				}
			}
		}

	};

	//重新渲染报警

	ctrl.reRenderAlarmList = function () {

		var data = this.model.data;
		var list = [];

		for (var i in data ){

			if( data.hasOwnProperty( i ) ) {

				list.push( data[i] );
			}

		}

		this.clearAlarms();
		this.handleDataAdd( list );
		ctrl.renderAlarmNumber();

	};


	//创建一个报警DOM

	ctrl.createAlarmDom = function(item){
		var type = ['', '预警', '报警', '故障'];
		var dom = '';
		if(item.type.toString() == '1'){
			dom += '<div class="box-shadow yujing alarm-item pointer" data-alarm-id="'+item.id+'" alarm-id="' +item.id+ '">';
		}else{
			dom += '<div class="box-shadow baojing alarm-item pointer" data-alarm-id="'+item.id+'" alarm-id="' +item.id+ '">';
		}
		dom += '<div>';
		dom += '<div class="baojing-left-top">';
		dom += '<div style="display:flex;">';
		dom += '<div class="baojing-left-top1"></div>';
		dom += '<div class="baojing-left-top2">'+ type[item.type] +'</div>';
		dom += '</div>';
		dom += '<div class="baojing-left-top3 text-align-c ellipsis">'+ item.prName +'</div>';
		dom += '</div>';
		dom += '<div class="baojing-left-bottom">';
		dom += ( item.time ? item.time.slice(0,19) : '' );
		dom += '</div>';
		dom += '</div>';
		dom += '<div class="baojing-right">';
		dom += '<div style="height:120px;">';
		dom	+= '<div>' + ( item.bjDesc ? item.bjDesc : '' ) + '</div> ';
		if (item.varType == 'AI') {

			//AI点显示报警值

			dom += '<div>报警值:' + item.value + ( item.unit ? item.unit : '' ) + '</div>';
		} else {

			//DI点根据显示方式来决定是否显示报警值

			if (item.showValue) {
				dom += '<div>报警值:' + item.valueDefine + '</div>';
			}
		}
		dom += '<div>报警点:' + item.rname + '</div>';
		dom += '</div>';
		dom += '<div style="width:100%" class="width100">';

		if( item.status  == 1 ){

			dom += '<div class="width50 inline-block color-green">实时</div>';

		}else{
			dom += '<div class="width50 inline-block">&nbsp;</div>';
		}

		if ( commonModel.privilege.IEMS_ALARM_UPDATE ){

			if(item.status  == 2 || item.way == 3 ){

				dom += '<div class="ignore-alarm width50 text-align-r inline-block"  aid="'+item.id+'">忽略</div>';

			}

		}


		dom += '</div>';
		dom += '</div>';
		dom += '</div>';

		return dom;

	};

	//渲染报警配电室列表

	ctrl.renderPrList = function(prList) {

		var length = prList.length;
		$('#power-room-list').empty();

		if (length == 0) {
			$('#power-room-list').append('<div class="color-gray-2">搜索不到配电室</div>');
		} else {
			for (var i = 0; i < length; i++) {
				$('#power-room-list').append('<div class="option" power-room-id="' + prList[i].id + '">' + prList[i].prName + '</div>');
			}
		}

	};

	//清空本地的报警

	ctrl.clearAlarms = function () {

		$('#alarm-items-con').empty();

	};

})();
