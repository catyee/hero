
import { powerRoomModel } from '../common/power-room-model';
import { moni } from '../common/common';
import { commonModel } from '../common/common-model';

var prCheckListModel = {
	checkList : [],      //用来保存巡检分类列表

};

/***
     * 获取巡检模板列表
     */

prCheckListModel.getCheckTemplateList = function(callback){

	var param = {
		path : '/dwt/iems/basedata/check/get_xj_tpl_list'
	};

	return commonModel.post(param);
};

/***
     * 获取模板详情
     */

prCheckListModel.getCheckTemplateById = function(id){

	var param = {
		path : '/dwt/iems/basedata/check/get_xj_tpl_by_id',
		data : {
			id : id
		}
	};

	return commonModel.post(param);
};

/***
     * 获取配电室的巡检项列表
     */

prCheckListModel.getPowerRoomCheckList = function(){
	var param = {
		'path' : '/dwt/iems/bussiness/xj/get_xj_define_list',
		'data' : {
			'prId' : powerRoomModel.powerRoomId
		}
	};
	return commonModel.post(param).map(function(res){
		if(res.code == '0'){
			prCheckListModel.checkList = res.list;
			return true;
		}
		return false;
	});
};

/***
     * 获取一个巡检分类
     */

prCheckListModel.getACheckClass = function(classId){
	var matcher = {'id':parseInt(classId)};
	var list = _.filter(prCheckListModel.checkList,matcher);
	if(list.length > 0){
		return list[0];
	}
	return null;
};

/***
     * 获取配电室复检项
     * @param powerRoomId 配电室id
     * @param callback
     */

prCheckListModel.getRecheckItemList = function(powerRoomId, callback){
	var param = {
		'path' : '/dwt/iems/bussiness/xj/get_fj_items_by_pr_id',
		'data' : {
			'prId' : powerRoomModel.powerRoomId
		}
	};
	return commonModel.post(param);
};

/***
     * 获取配突发列表
     * @param powerRoomId 配电室id
     * @param callback    成功的回掉函数
     */

prCheckListModel.getEmergencyItemList = function(){
	var param = {
		'path' : '/dwt/iems/bussiness/xj/get_tf_items_by_pr_id',
		'data' : {
			'prId' : powerRoomModel.powerRoomId,
		}
	};

	return commonModel.post(param);
};


/**
     * 新增或更新巡检分类名称
     * @param powerRoomId   配电室id
     * @param classId       分类id  id!=null 为新增操作
     * @param className     分类名
     * @param callback      操作成功的回调函数
     */

prCheckListModel.addOrUpdateCheckClass = function(powerRoomId, classId, className, callback){
	var param = {
		'path' : '/dwt/iems/bussiness/xj/add_or_update_xj_define',
		'data' : {
			'prId'       : powerRoomId,
			'id'         : classId,
			'defineName' : className
		}
	};
	return commonModel.post(param);
};

/***
     * 批量增加巡检项
     * @param checkItemList 数组 如下
     * [{"prCheckDefineId":"1","checkItem":"电压","checkType":"1"}
     ,{"prCheckDefineId":"1","checkItem":"温度","checkType":"2","weekInspectCycle":"3"},
     {"prCheckDefineId":"1","checkItem":"电流","checkType":"3","monthInspectCycle":"13"}]
     参数意义：
     prCheckDefineId：对应检查大项的id
     checkItem：具体的检查项的名字
     checkType：检查类型  1：日检  2：周检  3：月检
     weekInspectCycle：周检的日期     1-7 代表 周一到周日
     monthInspectCycle ： 月检的日期  1-28

     */

prCheckListModel.bacthAddCkeckItems = function(checkItemList,callback){

	var param = {
		'path' : '/dwt/iems/bussiness/xj/add_or_update_xj_items',
		'data' : {
			'list' : checkItemList
		}
	};
	return commonModel.post(param);
};

/***
     * 设置（添加一个巡检项）
     */

prCheckListModel.setPowerRoomCheckItem = function(classId, checkType,checkItem,weekDay,monthDate){
	var param = {
		'path' : '/dwt/iems/bussiness/xj/add_or_update_xj_items',
		'data' : {
			'list' : [{
				xjItem : checkItem,
				id : null,
				prXjDefineId: classId,
				checkType: checkType,
				weekXjCycle: weekDay,
				monthXjCycle: monthDate
			}]

		}
	};

	return commonModel.post(param);

};

/***
     * 忽略突发项
     */

prCheckListModel.setIgnoreEmergencyItem = function(emergencyItemId){
	var param = {
		'path' : '/dwt/iems/bussiness/xj/delete_tf_item_by_id',
		'data' : {
			id : emergencyItemId
		}
	};
	return commonModel.post(param);

};

/***
     * 设置（保存）巡检项的顺序
     * @param checkItemList 巡检项的list
     * @param callback      设置成功的回调函数
     */

prCheckListModel.setCheckItemOrder = function(checkItemList, callback){

	$.ajax({
		'url' : moni.baseUrl + '/rt/ap/v1/head/update_check_item',
		'type' : 'post',
		'contentType' : 'application/json;charset=UTF-8',
		'dataType' : 'json',
		'data' : JSON.stringify(checkItemList),
		'success' : callback,
		'error' : function(result){

		}
	});
};

/***
     * 删除配电室巡检项
     */

prCheckListModel.removePowerRoomCheckItem = function(checkItemIds){
	var param = {
		'path' : '/dwt/iems/bussiness/xj/delete_xj_items',
		'data' : {
			'xjItemIds' : checkItemIds,
		}
	};
	return commonModel.post(param);
};

/***
     * 根据一个分类id删除该分类
     * @param ClassID  分类id
     * @param callback 删除成功的回调函数
     */

prCheckListModel.removePowerRoomCheckClass = function(ClassID){

	var param = {
		'path' : '/dwt/iems/bussiness/xj/add_or_update_xj_define',
		'data' : {
			'id' : ClassID,
			'deleteFlag' : 1
		}

	};
	return commonModel.post(param);
};


/***
     * 删除配电室复检项
     * @param recheckItemId   复检项id
     * @param callback        删除成功的回掉函数
     */

prCheckListModel.removeRecheckItem = function(recheckItemId){

	var param = {
		'path' : '/dwt/iems/bussiness/xj/delete_fj_item_by_id',
		'data' : {
			'id' : recheckItemId
		}
	};
	return commonModel.post(param);

};

exports.prCheckListModel = prCheckListModel;