/**
 * powerRoomModel   配电室model 
 */

import { commonModel } from './common-model';


var powerRoomModel = {
	powerRoomId : $('#power-room-id').val(),		   //配电室id

	getPowerRoomBaseInfoById    : {},                  //获取配电室基本信息
	getCheckTemplateList        : {},                  //获取巡检模板列表
	getCheckTemplateById        : {},                  //获取巡检模板详情
	getPowerRoomCheckList       : {},                  //获取配电室的巡检项列表

	getSystemFileList           : {},                  //获取系统文件列表
	getPowerRoomFileList        : {},                  //获取配电室文件列表
	getRecheckItemList          : {},                  //获取配电室复检项
	getEmergencyItemList        : {},                  //获取突发列表
	getInspectionLogsById       : {},                  //获取配电室巡检日志
	getRepairLogsById           : {},                  //获取配电室抢修日志
	getTagListById              : {},                  //获取标签列表
	getFilterListById           : {},                  //获取过滤过的标签列表

	getProjectNameByPrId        : {},                  //获取Zr90工程名

	getTagHistoryData           : {},                  //获取标签的历史数据

	addOrUpdateCheckClass       : {},                  //新增或更新巡检分类名称
	bacthAddCkeckItems          : {},                  //批量增加巡检项 
	
	setCheckTemplate            : {},                  //设置巡检模板
	setPowerRoomCheckItem       : {},                  //设置（添加）一个巡检项
	setFileToPowerRoom          : {},                  //设置（引用）一个系统文件到配电室
	setFileOutFromPowerRoom     : {},                  //设置 配电室文件移除
	setIgnoreEmergencyItem      : {},                  //设置忽略突发项
	setCheckItemOrder           : {},                  //设置（保存）巡检项的顺序
	
	removePowerRoomCheckItem    : {},                  //删除配电室巡检项
	removePowerRoomCheckClass   : {},                  //删除配电室巡检项分类
	removeRecheckItem           : {},                  //删除配电室复检项
	addSystemFile               : {},                  //添加一个系统文件
};

/***
 * 获取配电室基本信息
 */

powerRoomModel.getPowerRoomBaseInfo = function(){
	var param = {
		path : '/dwt/iems/basedata/pr/get_pr_by_id',
		data : {
			id : this.powerRoomId
		}
	};
	return commonModel.post(param);
};


/***
 * 获取系统文件列表
 * @param callback   回调函数
 */

powerRoomModel.getSystemFileList = function (powerRoomId,fileName) {
	var param = {
		path: '/dwt/iems/bussiness/xj/get_sys_files',
		data: {
			prId:     powerRoomId,
			fileName: fileName,
		}
	};
	return commonModel.post(param);
};

/***
 * 获取配电室文件列表
 * @param powerRoomId 配电室id
 * @param callback    回调函数
 */

powerRoomModel.getPowerRoomFileList = function(powerRoomId){
	
	var param = {
		path:'/dwt/iems/bussiness/xj/get_files_by_pr_id',
		data:{
			prId : powerRoomId
		}

	};
	return commonModel.post(param);

};

/***
 * 通过配电室id 获取配电室巡检日志
 * @param powerRoomId 配电室id
 * @param date        查询的日期
 * @param page        页数
 * @param callback    查询成功时的回调函数
 */

powerRoomModel.getInspectionLogsById = function(powerRoomId, date, page){
	var param = {
		'prId' : powerRoomId,
		'inspectDate' : date,
		'page' : page,

	};
	$.ajax({
		'url' : moni.baseUrl + '/rt/ap/v1/head/get_inspe_logs_list',
		'type' : 'post',
		'contentType' : 'application/json;charset=UTF-8',
		'dataType' : 'json',
		'data' : JSON.stringify(param),
		'success' : callback,
		'error' : function(result){
			
		}
	});
};
powerRoomModel.getInspectionLogsById = function (powerRoomId,currentPage,pageSize,xjDate) {
	var param = {
		path: '/dwt/iems/bussiness/xjlog/page_get_xj_log_list',
		data:{
			prId:        powerRoomId,
			currentPage: currentPage,
			pageSize:    pageSize,
			xjDate:      xjDate
		}
	};
	return commonModel.post(param);
};

/***
 * 根据配电室id获取配电室的抢修日志
 * @param powerRoomId 配电室id
 * @param currentPage 页数
 * @param pageSize    每页条数
 * @param queryDate        查询的日期
 * @param callback    查询成功时的回调函数
 */

powerRoomModel.getRepairLogsById = function (powerRoomId,currentPage,pageSize,queryDate) {
	var param = {
		path : '/dwt/iems/bussiness/qx/page_get_qx_orders',
		data : {
			prId :       powerRoomId,
			currentPage: currentPage,
			pageSize:    pageSize,
			queryDate:   queryDate,
			deleteFlag:1
		}
	};

	return commonModel.post(param);
};

/***
 * 根据配电室id 获取配电室taglist
 * @param {String}    powerRoomId  配电室id
 * @param {Function}  callback     获取成功后的回调函数 
 */

powerRoomModel.getTagListById = function(powerRoomId, callback){
	var param = {
		'prId' : powerRoomId
	};
	$.ajax({
		'url' : moni.baseUrl + '/rt/ap/v1/admin/get_tags_by_pr',
		'type' : 'post',
		'contentType' : 'application/json;charset=UTF-8',
		'dataType' : 'json',
		'data' : JSON.stringify(param),
		'success' : callback,
		'error' : function(result){
			
		}
	});
	
};

/**
 * 根据条件来检索某个配电室的tagList
 * @param {prId} 配电室Id
 * @param {searchType} 点类型，查询全部为null，1：高压，2：低压，3:变压器，4：直流屏
 * @param {keyWord} 搜索关键词，没有就为null
 */

powerRoomModel.getFilterListById = function (prId, searchType, keyWord, callback) {
	var param = {
		'prId' : prId,
		'searchType' : searchType,
		'keyWord' : keyWord
	};
	$.ajax({
		'url' : moni.baseUrl + '/rt/ap/v1/common/filter_tag',
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
 * 根据配电室id获取该配电室对应的Zr90工程名
 * @param {String}  powerRoomId 配电室id
 * @param {Function}  callback     获取成功后的回调函数 
 */

powerRoomModel.getProjectNameByPrId = function(powerRoomId, callback){
	var param = {
		'prId' : powerRoomId
	};
	$.ajax({
		'url' : moni.baseUrl + '/rt/ap/v1/admin/get_project_name',
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
 * 获取标签的历史数据
 * @param {String}   channelName    转发通道名
 * @param {String}   tagName        标签名
 * @param {String}   time           时间
 * @param {Function} callback       获取成功的回调函数
 */

powerRoomModel.getTagHistoryData = function(channelName, tagName, date,  callback){
	var param = {
		'forwardChannel' : channelName,
		'tagName'        : tagName,
		'queryDate'      : date
	};
	
	$.ajax({
		'url' : moni.baseUrl + '/rt/ap/v1/repdispatch/get_history_data',
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
 * 设置（引用）一个系统文件到配电室
 * @param fileId       系统文件的id
 * @param powerRoomId  配电室id
 * @param callback     回调函数
 */

powerRoomModel.setFileToPowerRoom = function (fileId,powerRoomId) {
	var param = {
		path: '/dwt/iems/bussiness/xj/add_pr_file',
		data:{
			sysFileId: fileId,
			prId:      powerRoomId
		}
	};
	return commonModel.post(param);
};

/***
 * 删除配电室的引用文件
 * @param referId   引用的id
 * @param callback  回调函数
 */

powerRoomModel.setFileOutFromPowerRoom = function (referId,fileId) {
	var param = {
		path: '/dwt/iems/bussiness/xj/delete_pr_file_by_id',
		data:{
			id: referId,
			sysFileId: fileId,
		}
	};
	return commonModel.post(param);
};
powerRoomModel.addSystemFile = function (fileUrl,fileName) {
	var param = {
		path: '/dwt/iems/bussiness/xj/add_sys_file',
		data: {
			fileUrl:fileUrl,
			fileName:fileName
		}
	};
	return commonModel.post(param);
};

exports.powerRoomModel = powerRoomModel;