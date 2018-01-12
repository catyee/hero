/**
 * 抢修单详情数据模型
 */
import { commonModel } from '../common/common-model'
import { commonCtrl } from '../common/common-controller'

var repairOrderModel = {
	orderInfo 				   : null,		  //抢修信息
	surveyTasks				   : [],		  //查看任务
	repairTask				   : [],		  //抢修任务
	getRepairOrderBaseInfo     : {},          //获取抢修单的基本信息
	getSurveyRecordById        : {},          //通过抢修单id获取查勘记录
	getRepairResultById        : {},          //通过抢修单id获取抢修结果
	getRepairGroupList		   : {},		  //获取自己抢修小组
	
	sendStuffToSurvey          : {},          //派遣员工到现场进行查勘
	sendStuffToRepair          : {},          //派遣员工抢修
	
	setDefinitiveById          : {},          //定性问题为合同内还是合同外
	setDestroyOrderById        : {},          //通过抢修单id销单
};

/***
 * 通过抢修单id获取抢修单的基本信息
 * @param  repairOrderId 抢修单id
 * @param callback       获取成功的回掉函数
 */

repairOrderModel.getRepairOrderBaseInfo = function(repairOrderId){
	var param = {
		'path' : '/dwt/iems/bussiness/qx/get_qx_order_by_id',
		'data' : {
			'qxOrderId' : repairOrderId,
		}
	};

	return commonModel.post(param).map(function (res) {
		if(res.code == '0'){
			repairOrderModel.orderInfo = res.entity;
			repairOrderModel.surveyTasks = _.filter(repairOrderModel.orderInfo.qxTasks, _.matcher({'type':1}));
			var repairTask = _.filter(repairOrderModel.orderInfo.qxTasks, _.matcher({'type':2}));
			repairOrderModel.repairTask  = (repairTask&&repairTask.length >0)?repairTask[0]:null;
			return true;
		}
		return false;
	});
};

/***
 * 通过抢修单id获取查勘记录
 * @param  repairOrderId 抢修单id
 * @param callback       获取成功的回掉函数
 */

repairOrderModel.getSurveyRecordById = function(repairOrderId){
	var param = {
		'repairOrderId' : repairOrderId
	};
	
	$.ajax({
		'url' : moni.baseUrl+'/rt/ap/v1/repair/get_survey_record',
		'type' : 'post',
		'contentType' : 'application/json;charset=UTF-8',
		'dataType' : 'json',
		'data' : JSON.stringify(param),
		'success' : callback,
		'error' : function(result){
			
		}
	});
};

/***
 * 通过抢修单id获取抢修结果
 * @param  repairOrderId 抢修单id
 * @param callback       获取成功的回掉函数
 */

repairOrderModel.getRepairResultById = function(repairOrderId, callback){
	var param = {
		'repairOrderId' : repairOrderId
	};
		
	$.ajax({
		'url' : moni.baseUrl+'/rt/ap/v1/repdispatch/get_repair_record',
		'type' : 'post',
		'contentType' : 'application/json;charset=UTF-8',
		'dataType' : 'json',
		'data' : JSON.stringify(param),
		'success' : callback,
		'error' : function(result){
				
		}
	});
};

/****
 * 获取自己的抢修小组
 * @returns {{code: string, msg: string}}
 */

repairOrderModel.getRepairGroupList = function(){
	var param = {
		path : '/dwt/privilege/get_user_list',
		data : {
			parentUserId : commonModel.userId,
			parentRoleId : commonModel.roleId
		}
	};

	return commonModel.post(param);
};

/***
 * 派遣员工到现场进行查勘
 * @param repairOrderId  抢修单id
 * @param stuffId        员工id
 * @callback             成功的回掉函数
 */

repairOrderModel.sendStuffToSurvey = function(repairOrderId, stuffId, stuffName){
	var param = {
		'path' : '/dwt/iems/bussiness/qx/add_qx_task',
		'data' : {
			qxOrderId : repairOrderId,
			qxzUserId : stuffId,
			qxPeople : stuffName,
			role : commonModel.roleId,
			type : 1
		}
	};
	return commonModel.post(param);
};

/***
 * 派遣员工到现场抢修
 * @param repairOrderId  抢修单id
 * @param stuffId        员工id
 * @callback             成功的回掉函数
 */

repairOrderModel.sendStuffToRepair = function(repairOrderId, stuffId, stuffName){
	var param = {
		'path' : '/dwt/iems/bussiness/qx/add_qx_task',
		'data' : {
			qxOrderId : repairOrderId,
			qxzUserId : stuffId,
			qxPeople : stuffName,
			role : commonModel.roleId,
			type : 2
		}
	};
	return commonModel.post(param);
};

/***
 * 定性问题为合同内还是合同外
 * @param orderId   抢修单id
 * @param isInContact 是否合同内
 * @param repairProgramme 抢修方案
 * @param callback   成功的回调函数
 */

repairOrderModel.setDefinitiveById = function(orderId, isInContact, repairProgramme){
	var param = {
		path: '/dwt/iems/bussiness/qx/decide_qx_type',
		data: {
			'id': orderId,
			'inContact': isInContact,
			'qxProgramme': repairProgramme
		}
	};
	return commonModel.post(param);
};

/***
 * 通过抢修单id销单
 * @param repairOrderId 抢修单id
 * @param callback      销单成功的回调函数
 */

repairOrderModel.setDestroyOrderById = function(repairOrderId, callback){
	var param = {
		path : '/dwt/iems/bussiness/qx/delete_qx_order',
		data : {
			'id' : repairOrderId
		}

	};

	return commonModel.post(param);
};

exports.repairOrderModel = repairOrderModel;