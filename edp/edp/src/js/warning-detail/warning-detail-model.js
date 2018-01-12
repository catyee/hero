
import { commonModel } from '../common/common-model';
import { commonCtrl } from '../common/common-controller';

var moniWarningDetailModel = {
	getWarningDetailById        : {},    //获取报警详情
	getFiledData                : {},    //获取报警现场数据
	getRealTimerData            : {},    //获取实时数据
	createRepairOrderFromSysBug : {},    //生成抢修单
};

/***
 * 通过报警id 获取报警详情
 * @param {Number} alarmId    报警id
 * @param {Function} callback 成功时的回调函数
 */

moniWarningDetailModel.getWarningDetailById = function(alarmId, callback){
	var param = {
		'path' : '/dwt/iems/bussiness/bj/get_alarm_by_id',
		'data' : {
			'id' : alarmId,
		}
	};

	return commonModel.post(param);
};

/***
 * 获取报警现场数据
 * @param {String}         tagName       标签名
 * @param {String}         channelName   转发通道名
 * @param {DateTimeFormat} time          报警时间
 * @param {Function}       callback      获取成功的回调函数
 */

moniWarningDetailModel.getFiledData = function(tagName, channelName, time, callback){
	var param = {
		'forwardChannel' : channelName,
		'tagName'        : tagName,
		'time'      : time
	};
	
	$.ajax({
		'url' : moni.baseUrl + '/rt/ap/v1/repdispatch/get_nearby_value__alarm',
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
 * 获取报警点的实时值
 * @param {String}    channel    转发通道
 * @param {String}    tagName    标签名
 * @param {Function}  callback   获取成功时的回调函数
 */

moniWarningDetailModel.getRealTimerData = function(channel, tagName, callback){
	var param = {
		'forwardChannel' : channel,
		'tagName' : tagName
	};
	
	$.ajax({
		'url' : moni.baseUrl + '/rt/ap/v1/repdispatch/get_realtime_value',
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
 * 生成抢修单
 * @param {String}   powerRoomId 配电室id
 * @param {String}   bugId       报警id
 * @param {String}   bugDesc     报警描述
 * @param {Function} callback    生成成功时的回掉函数
 */

moniWarningDetailModel.createRepairOrderFromSysBug = function(powerRoomId, bugId, bugDesc,callback){
	var param = {
		'path' 		: '/dwt/iems/bussiness/qx/add_or_update_qx_order',
		'data' 		: {
			userId : commonModel.userId,
			roleId : commonModel.roleId,
			prId   : powerRoomId,
			alarmId : bugId,
			problemDesc : bugDesc
		}
	};
	return commonModel.post(param);
};

exports.moniWarningDetailModel = moniWarningDetailModel;
