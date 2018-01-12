/**
 * 抢修日志
 */

import { moni} from '../common/common';
import { commonModel } from '../common/common-model';
import { commonCtrl } from '../common/common-controller';


var repairLogModel = {
	log					 : {},		//日志
	repairTask			 : {},		//抢修任务
	surveyTasks			 : {},		//巡检任务
	getRepairLogById     : {},    //通过抢修单id获取抢修单详情
	getRepairProcessById : {},    //通过抢修单id获取抢修流程
	getSurveyRecordsById : {},    //根据抢修单id获取查勘记录
	getRepairResultById  : {},    //根据抢修单id获取抢修结果
	
	setToReCheckItem     : {},    //设置为复检项
};

/***
 * 通过id获取抢修单详情
 * @param repairLogId   抢修单id
 * @param callback      获取成功时的回调函数
 */

repairLogModel.getRepairLogById = function(repairLogId){
	var param = {
		'path' : '/dwt/iems/bussiness/qx/get_qx_order_by_id',
		'data' : {
			'qxOrderId' : repairLogId,
		}
	};
	return commonModel.post(param).map(function (res) {
		if(res.code == '0'){
			repairLogModel.log = res.entity;
			repairLogModel.surveyTasks = _.filter( repairLogModel.log.qxTasks, _.matcher({'type':1}));
			var repairTask = _.filter( repairLogModel.log.qxTasks, _.matcher({'type':2}));
			repairLogModel.repairTask  = (repairTask&&repairTask.length >0)?repairTask[0]:null;

			//查询报警时间

			if(repairLogModel.log.prAlarm){
				repairLogModel.alarmTime = repairLogModel.log.prAlarm.alarmTime;
			}else if(repairLogModel.log.xjProblem){
				repairLogModel.alarmTime = repairLogModel.log.xjProblem.createTime.slice(0,-2);
			}else{
				repairLogModel.alarmTime = repairLogModel.log.createTime.slice(0,-2);
			}

			//查询开始查勘时间

			if(repairLogModel.surveyTasks.length > 0){
				var tasks = _.sortBy(repairLogModel.surveyTasks, 'createTime');
				repairLogModel.startSurveyTime = tasks[0].createTime.slice(0,-2);
			}else{
				repairLogModel.startSurveyTime = '没有安排查勘';
			}

			//获取抢修时间和抢修结束时间

			if(repairLogModel.repairTask){
				repairLogModel.startRepairTime = repairLogModel.repairTask.createTime.slice(0,-2);
				repairLogModel.completeRepairTime = repairLogModel.repairTask.lastModifyTime.slice(0,-2);
			}else{
				repairLogModel.startRepairTime = '没有安排抢修';
				repairLogModel.completeRepairTime = '没有安排抢修';
			}

			return true;
		}
		return false;
	});
};

/***
 * 通过抢修单id获取抢修流程
 * @param repairLogId   抢修单id
 * @param callback      获取成功时的回调函数
 */

repairLogModel.getRepairProcessById = function(repairLogId, callback){
	var param = {
		'repairOrderId' : repairLogId
	};
	
	$.ajax({
		'url' : moni.baseUrl + '/rt/ap/v1/repdispatch/get_repair_process',
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
 * 通过抢修单id获取查勘流程
 * @param repairLogId   抢修单id
 * @param callback      获取成功时的回调函数
 */

repairLogModel.getSurveyRecordsById = function(repairLogId, callback){
	var param = {
		'repairOrderId' : repairLogId
	};
	
	$.ajax({
		'url' : moni.baseUrl + '/rt/ap/v1/repair/get_survey_record',
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

repairLogModel.getRepairResultById = function(repairOrderId, callback){
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

/***
 * 组团长根据抢修日志设置复检项
 * @param repairLogId   抢修日志id
 * @param reCheckTitle  复检标题
 * @param reCheckDesc   复检内容
 * @param callback      设置成功的回调函数
 */

repairLogModel.setToReCheckItem = function(reCheckTitle, reCheckDesc){
	var param = {
		'path' : '/dwt/iems/bussiness/xj/add_fj_item',
		'data' : {
			'qxOrderId' : this.log.id,
			'prId' : this.log.prId,
			'fjItem'  : reCheckTitle,
			'fjDesc'   : reCheckDesc
		}

	};

	return commonModel.post(param);
	
};

exports.repairLogModel = repairLogModel;