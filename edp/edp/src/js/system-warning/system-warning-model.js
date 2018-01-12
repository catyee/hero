
import { commonModel } from '../common/common-model';
import { commonCtrl } from '../common/common-controller'

let systemWarningModel = {
	isFirst : true,         //第一次加载的标识
	prId    : null,         //通过配电室id查报警
	alarmList : [],          //报警列表
	newAlarmList : [],      //新的报警列表
	toDeleteAlarmList : [], //将要删除的报警列表
	serverAlarmList : [],   //服务器返回的报警列表
	unExistAlarmIds : [],   //本地比服务器多的报警id即不存在的报警的id

	getAlarmList : {},      //获取报警
	filterNewAlarm : {},    //过滤出新的报警的数组
	filterUnExistAlarm : {},//过滤出不存在的报警的数组
	ignoreAlarm : {},       //忽略报警

};

//获取系统报警

systemWarningModel.getAlarmList = function(){
	var param = {
		'path' : '/dwt/iems/bussiness/bj/page_get_alarm_list',
		'data' : {
			currentPage : 1,
			pageSize : 2147483647,
			deleteFlag : 0,
			prId : this.prId,
			userId : commonModel.userId,
			roleId : commonModel.roleId
		}
	};
	return commonModel.post(param).map(function(res){
		if(res.code == '0'){
			systemWarningModel.serverAlarmList = res.pageResult.records;
			systemWarningModel.filterNewAlarm();
			systemWarningModel.filterUnExistAlarm();
			return true;
		}else{
			return false;
		}
	});
};

//过滤出新的数组

systemWarningModel.filterNewAlarm = function(){

	//获取到本地报警id的数组
	//获取到服务器返回的报警的id的数组
	//取出服务器比本地多出的报警的id数组
	//取出多出的报警存放到newAlarmList
	//将newAlarmList合并到alarmList

	var localAlarmIds  = _.map(systemWarningModel.alarmList, function(alarm){ return alarm.id;});
	var serverAlarmIds = _.map(systemWarningModel.serverAlarmList, function(alarm){ return alarm.id;});
	var newAlarmIds    = _.difference(serverAlarmIds, localAlarmIds);

	systemWarningModel.newAlarmList = _.filter(systemWarningModel.serverAlarmList, function(alarm){
		if(_.indexOf(newAlarmIds,alarm.id) == -1){
			return false;
		}
		return true;
	});
	systemWarningModel.alarmList = _.union(systemWarningModel.alarmList, systemWarningModel.newAlarmList);

};

//过滤出已经不存在的报警

systemWarningModel.filterUnExistAlarm = function(){

	//获取到本地报警id的数组
	//获取到服务器返回的报警的id的数组
	//取出本地比服务器多出的报警的id数组
	//从newAlarmList删除掉不存在的报警

	var localAlarmIds  = _.map(systemWarningModel.alarmList, function(alarm){ return alarm.id;});
	var serverAlarmIds = _.map(systemWarningModel.serverAlarmList, function(alarm){ return alarm.id;});
	systemWarningModel.unExistAlarmIds = _.difference(localAlarmIds, serverAlarmIds);

	systemWarningModel.alarmList = _.filter(systemWarningModel.alarmList, function(alarm){
		if(_.indexOf(systemWarningModel.unExistAlarmIds,alarm.id) == -1){
			return true;
		}
		return false;
	});

};

//清空报警

systemWarningModel.clearAlarms = function () {
	this.alarmList = [];
	this.newAlarmList = [];
	this.toDeleteAlarmList = [];
	this.serverAlarmList = [];
	this.unExistAlarmIds = [];
};

//忽略报警

systemWarningModel.ignoreAlarm = function (alarmId) {
	var param = {
		path : '/dwt/iems/bussiness/qx/ignore_bj',
		data : {
			alarmId : alarmId
		}
	};
	return commonModel.post(param);
};

exports.systemWarningModel = systemWarningModel;
