/**
 * 巡检日志详情数据模型 
 */
import { moni} from '../common/common';
import { commonModel } from '../common/common-model';
import { commonCtrl } from '../common/common-controller';

var inspectionLogDetailModel = {
};

/***
 *  通过id 获取巡检日志的详细信息
 *  @param id
 *  @param callback 获取成功的回调函数
 */

inspectionLogDetailModel.getInspectinLogById = function(id){
	var param = {
		'path' : '/dwt/iems/bussiness/xjlog/get_xj_log_details',
		'data' : {
			id : id
		}
	};
	return commonModel.post(param);
};

/***
 * 根据配电室id获取配电室基本信息
 * @param powerRoomId   配电室id
 * @param callback      获取成功的回调函数 
 */

inspectionLogDetailModel.getPowerRoomInfoById = function(powerRoomId, callback){
	var param = {
		'prId' : powerRoomId
	};
	
	$.ajax({
		'url' : moni.baseUrl + '/rt/ap/v1/admin/get_pr_byId',
		'type' : 'post',
		'contentType' : 'applications/json;charset=UTF-8',
		'dataType' : 'json', 
		'data' : JSON.stringify(param),
		'success' : callback,
		'error' : function(result){
			
		}
	});
};

exports.inspectionLogDetailModel = inspectionLogDetailModel;