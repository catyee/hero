require('../../scss/repairing-list.scss');

import { moni} from '../common/common';
import { commonModel } from '../common/common-model';
import { commonCtrl } from '../common/common-controller';

require('../common/system-warning-service.js');

let repairingListCtrl = {
	init : {},	//初始化页面
	bind : {},	//事件绑定
	render : {},	//渲染页面
	getOrderList : {},	//获取正在抢修的抢修单
	createOrderDom: {},	//创建正在抢修的抢修单DOM

	orderList 	: [],		//枪修单列表
	updateCycle	: 15000,	//轮训获抢修单周期
};

$(function(){
	repairingListCtrl.init();
});

//初始化页面

repairingListCtrl.init = function(){
	repairingListCtrl.bind();

	repairingListCtrl.getOrderList();
	window.setInterval(repairingListCtrl.getOrderList,repairingListCtrl.updateCycle);

};

//事件绑定

repairingListCtrl.bind = function(){

	$('body').delegate('.qtn','mouseover',function(){
		$(this).children().eq(0).removeClass('qtn-white');
		$(this).children().eq(0).addClass('qtn-green');
	});

	$('body').delegate('.qtn','mouseout',function(){
		$(this).children().eq(0).removeClass('qtn-green');
		$(this).children().eq(0).addClass('qtn-white');
	});
};

//获取正在抢修的抢修单

repairingListCtrl.getOrderList = function(){
	var param = {
		path : '/dwt/iems/bussiness/qx/page_get_qx_orders',
		data : {
			userId : commonModel.userId,
			roleId : commonModel.roleId,
			currentPage : 1,
			pageSize : 2396745,
			deleteFlag : 0
		}
	};
    	commonModel.post(param).subscribe(function(res){
    		if(res.code == '0'){
			repairingListCtrl.orderList = res.pageResult.records;
			repairingListCtrl.render();
		}else{
			moni.emptyTips('获取报警失败，请重试','repairing-con');
		}
	});
};

repairingListCtrl.render = function () {
	$('#repairing-con').empty();
	var orderList = repairingListCtrl.orderList;
	var length = orderList.length;

	if(length == 0){
		moni.emptyTips('没有正在抢修的记录！','repairing-con');
		return false;
	}
	var dom = '';
	for(var i = 0; i < length; i++){
		dom = repairingListCtrl.createOrderDom(orderList[i]);
		$('#repairing-con').append(dom);
	}
};

//创建正在抢修的抢修单DOM

repairingListCtrl.createOrderDom = function (item) {
	format(item);
	var dom = '';
	dom += '<div class="qtn">';
	dom += '<div class="qtn-white"></div>';
	dom += '<div>';
	dom += '<div class="top">';
	dom += '<div>';
	dom += '<div class="top-top">';
	dom += '<div class="top-top-1"><b>产生报警</b></div>';
	dom += '<div class="top-top-2">开始侦查</div>';
	dom += '<div class="top-top-2">开始抢修</div>';
	dom += '<div class="top-top-2">抢修完成</div>';
	dom += '</div>';
	dom += '<div>';
	dom += '<div class="top-bottom">';

	/***
         * 第一个圆一定点亮
         */

	dom += '<div class="top-bottom-yuan">';
	dom += '<div class="top-bottom-neiyuan-1"></div>';
	dom += '</div>';

	dom += '<div class="top-bottom-xian"></div>';

	if(item.startRepairTime!=null || item.startSurveyTime != null){
		dom += '<div class="top-bottom-yuan">';
		dom += '<div class="top-bottom-neiyuan-2-2"></div>';
		dom += '</div>';
	}else{
		dom += '<div class="top-bottom-yuan">';
		dom += '<div class="top-bottom-neiyuan-2-1"></div>';
		dom += '</div>';
	}

	dom += '<div class="top-bottom-xian"></div>';

	if(item.startRepairTime!=null){
		dom += '<div class="top-bottom-yuan">';
		dom += '<div class="top-bottom-neiyuan-3-2"></div>';
		dom += '</div>';
	}else{
		dom += '<div class="top-bottom-yuan">';
		dom += '<div class="top-bottom-neiyuan-3-1"></div>';
		dom += '</div>';
	}
	dom += '<div class="top-bottom-xian"></div>';
	if(item.completeRepairTime != null){
		dom += '<div class="top-bottom-yuan">';
		dom += '<div class="top-bottom-neiyuan-4-2"></div>';
		dom += '</div>';
	}else{
		dom += '<div class="top-bottom-yuan">';
		dom += '<div class="top-bottom-neiyuan-4-1"></div>';
		dom += '</div>';
	}

	dom += '</div>';
	dom += '</div>';
	dom += '</div>';
	dom += '<div class="top-right">'+item.pr.prName+'</div>';
	dom += '</div>';
	dom += '<div class="bottom">';
	dom += '<div class="bottom-top-1"><b>'+item.alarmTime+'</b></div>';

	if(item.startRepairTime !=null && item.startSurveyTime == null){
		dom += '<div class="bottom-top-1"><b>无查勘记录</b></div>';
	}else if(item.startSurveyTime != null){
		dom += '<div class="bottom-top-1"><b>'+item.startSurveyTime+'</b></div>';
	}

	if(item.startRepairTime!=null){
		dom += '<div class="bottom-top-1"><b>'+item.startRepairTime+'</b></div>';
	}

	if(item.completeRepairTime!=null){
		dom += '<div class="bottom-top-1"><b>'+item.completeRepairTime+'</b></div>';
	}

	dom += '</div>';
	dom += '<div class="bottom">';
	dom += '<div class="bottom-bottom-left">'+item.problemDesc+'</div>';
	dom += '<a class="bottom-bottom-right" href="order-detail.html?od='+item.id+'">详情</a>';
	dom += '<div></div>';
	dom += '</div>';
	dom += '</div>';
	dom += '</div>';
	dom += '<div class="height30"></div>';

	return dom;
        
	function format(item) {

		//查询报警时间

		if(item.prAlarm){
			item.alarmTime = item.prAlarm.alarmTime;
		}else if(item.xjProblem){
			item.alarmTime = item.xjProblem.createTime.slice(0,-2);
		}else{
			item.alarmTime = item.createTime.slice(0,-2);
		}

		//查询开始查勘时间

		var surveyTasks = _.filter( item.qxTasks, _.matcher({'type':1}));
		if(surveyTasks.length > 0){
			var tasks = _.sortBy(surveyTasks, 'createTime');
			item.startSurveyTime = tasks[0].createTime.slice(0,-2);
		}else{
			item.startSurveyTime = null;
		}

		//获取抢修时间和抢修结束时间
		//查询开始查勘时间

		var repairTask = _.filter( item.qxTasks, _.matcher({'type':2}));

		if(repairTask.length>0){
			repairTask = repairTask[0];
			item.startRepairTime = repairTask.createTime.slice(0,-2);
			item.completeRepairTime = (repairTask.isComplete == 1)?repairTask.lastModifyTime.slice(0,-2):null;
		}else{
			item.startRepairTime = null;
			item.completeRepairTime = null;
		}
	}
};

