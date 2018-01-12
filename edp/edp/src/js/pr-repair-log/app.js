require('../../scss/pr-repair-log.scss');

import { powerRoomCommonController } from '../common/power-room-common-controller';
import { powerRoomModel } from '../common/power-room-model';
import { moni } from '../common/common';
import { commonModel } from '../common/common-model';
import { commonCtrl } from '../common/common-controller';

require('../common/system-warning-service.js');

var powerRoomRepairLogController = {
	disRepairLogs: {},
};
$(function () {

	powerRoomRepairLogController.initPagesPath();

	//初始化配电室基本信息

	powerRoomCommonController.initPowerRoomBaseInfo();

	//初始化一次接线图按钮

	powerRoomCommonController.initYCJXTButton();

	powerRoomRepairLogController.disRepairLogs();

	/*选择日期*/

	$('#repair-log-date-select').datetimepicker({
		format: 'yyyy-mm-dd',
		autoclose: true,
		todayBtn: true,
		startView: 3,
		minView: 2,
		language: 'ch',
	}).on('changeDate', function (e) {
		$('#repiar-log-pagination').attr('page', '1');

		//重新显示抢修日志

		powerRoomRepairLogController.disRepairLogs();
	});

	/**/

	$('#repair-log-date-select-btn').click(function () {
		$('#repair-log-date-select').focus();
	});

	$('#reomve-repair-log-date-select').click(function () {
		$('#repair-log-date-select').val('');
		$('#repair-log-date-select').attr('value', '');
		powerRoomRepairLogController.disRepairLogs();
	});

	/*翻页*/

	$('body').delegate('#repair-log-pagination', 'click', function (e) {
		if (e.target.nodeName == 'LI') {
			return false;
		}
		if ($(e.target).parent().hasClass('disabled')) {
			return false;
		}
		var page = $(e.target).parent().attr('page');
		$('#repair-log-pagination').attr('page', page);

		powerRoomRepairLogController.disRepairLogs();
		return false;
	});

	/*查看详情*/

	$('#repair-log-con').delegate('.repair-log-item', 'click', function () {
		window.location.href = 'repair-log.html?d=' + $(this).attr('repair-log-id');
	});


});


/**
 * 初始化 扩展信息各个item标题(相关资料，抢修日志，巡检日志，巡检项目)的路径
 */
powerRoomRepairLogController.initPagesPath = function () {
	this.prId = moni.getParameter('prid');
	$('#toPrMetarial').attr('href','pr-metarial.html?prid='+this.prId);
	$('#toRepairLog').attr('href','pr-repair-log.html?prid='+this.prId);
	$('#toInspectionLog').attr('href','pr-inspection-log.html?prid='+this.prId);
	$('#toPrCheck').attr('href','pr-check-list.html?prid='+this.prId);
}

/**
 * 显示巡检日志
 */

powerRoomRepairLogController.disRepairLogs = function () {
	var powerRoomId = this.prId;
	var currentPage = $('#repair-log-pagination').attr('page');
	var queryDate = $('#repair-log-date-select').val();
	var pageSize  = 10;
	if (queryDate.length == 0) {
		queryDate = null;
	}

	powerRoomModel.getRepairLogsById(powerRoomId,currentPage,pageSize,queryDate).subscribe(function (result) {
		if(result.code == 0) {
			$('#repair-log-con .repair-log-item').remove();
			moni.disPages('repair-log-pagination', result.pageResult.totalPages, result.pageResult.currentPage);
			var list = result.pageResult.records;
			var length = list.length;
			if (length == 0) {
				moni.emptyTips('搜索不到抢修日志', 'empty-tips-container');
				$('#empty-tips-container-tr').css('display', 'table-row');
			} else {
				$('#empty-tips-container-tr').css('display', 'none');
			}

			var tpl =  '<tr class="con repair-log-item" repair-log-id="{{repairLogId}}">';
			tpl += '<td class="td5-1 text-align-c">{{alarmTime}}</td>';
			tpl += '<td class="td5-1 text-align-c">{{completeTime}}</td>';
			tpl += '<td class="td5-1 text-align-c">{{alarmDesc}}</td>';
			tpl += '<td class="td5-1 text-align-c">{{repairPeople}}</td>';



			for (var i = 0; i < length; i++) {

				var repairLogId = result.pageResult.records[i].id;
				var alarmTime = list[i].createTime.slice(0,-2);

				if(list[i].prAlarm){
					alarmTime = list[i].prAlarm.alarmTime;
				}
				if(list[i].xjProblem){
					alarmTime = list[i].xjProblem.createTime.slice(0,-2);
				}

				var qxTasks =  _.filter(list[i].qxTasks, _.matcher({'type':2}));
				var completeTime = qxTasks[0]?qxTasks[0].lastModifyTime.slice(0,-2):'-';

				var alarmDesc = list[i].problemDesc;
				var repairPeople = qxTasks[0]?qxTasks[0].qxPeople:'-';

				if(list[i].inContact == '0'){
					repairPeople = '-';
				}

				var dom = tpl.replace('{{repairLogId}}', repairLogId)
					.replace('{{alarmTime}}', alarmTime)
					.replace('{{completeTime}}', completeTime)
					.replace('{{alarmDesc}}', alarmDesc)
					.replace('{{repairPeople}}', repairPeople);

				$('#repair-log-con').append(dom);

			}
		}
	});
};