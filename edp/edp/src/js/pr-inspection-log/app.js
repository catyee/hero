
require('../../scss/pr-inspection-log.scss');

import { powerRoomCommonController } from '../common/power-room-common-controller';
import { powerRoomModel } from '../common/power-room-model';
import { moni } from '../common/common';
import { commonModel } from '../common/common-model';
import { commonCtrl } from '../common/common-controller';

require('../common/system-warning-service.js');

var powerRoomInspectionController = {
	initPowerRoomBaseInfo: {},
	disInspectionLogs: {},
};
$(function () {

	powerRoomInspectionController.initPagesPath();

	//初始化配电室基本信息

	powerRoomCommonController.initPowerRoomBaseInfo();

	//初始化一次接线图按钮

	powerRoomCommonController.initYCJXTButton();

	powerRoomInspectionController.disInspectionLogs();

	/*选择日期*/

	$('#inspection-log-date-select').datetimepicker({
		format: 'yyyy-mm-dd',
		autoclose: true,
		todayBtn: true,
		startView: 3,
		minView: 2,
		language: 'ch',
	}).on('changeDate', function (e) {
		$('#inspection-log-pagination').attr('page', '1');

		//重新显示抢修日志

		powerRoomInspectionController.disInspectionLogs();
	});

	/**/

	$('#inspection-log-date-select-btn').click(function () {
		$('#inspection-log-date-select').focus();
	});

	$('#reomve-inspection-log-date-select').click(function () {
		$('#inspection-log-date-select').val('');
		$('#inspection-log-date-select').attr('value', '');
		powerRoomInspectionController.disInspectionLogs();
	});

	/*跳转至巡检详情*/

	$('#inspection-logs-con').delegate('.inspection-item', 'click', function () {
		var inspectionId = $(this).attr('inspection-id');
		var powerRoomId = this.prId;
		window.location.href = 'inspection-log.html?d=' + inspectionId + '&prid=' + powerRoomId;
	});

	//翻页

	//翻页

	$('#inspection-log-pagination').delegate('li', 'click', function () {

		var page = $(this).attr('page');
		$('#inspection-log-pagination').attr('page', page);
		powerRoomInspectionController.disInspectionLogs();
		return false;
	});


});

/**
 * 初始化 扩展信息各个item标题(相关资料，抢修日志，巡检日志，巡检项目)的路径
 */
powerRoomInspectionController.initPagesPath = function () {
	this.prId = moni.getParameter('prid');
	$('#toPrMetarial').attr('href','pr-metarial.html?prid='+this.prId);
	$('#toRepairLog').attr('href','pr-repair-log.html?prid='+this.prId);
	$('#toInspectionLog').attr('href','pr-inspection-log.html?prid='+this.prId);
	$('#toPrCheck').attr('href','pr-check-list.html?prid='+this.prId);
}




powerRoomInspectionController.initPowerRoomBaseInfo = function () {
	var powerRoomId = this.prId;
	powerRoomModel.getPowerRoomBaseInfoById(powerRoomId, function (result) {
		if (result.code == '0') {
			$('#power-room-name').text(result.prName);
			$('#power-room-address').text(result.prProvince + ' ' + result.prCity + ' ' + (result.prArea ? result.prArea : '') + ' ' + result.prAddress);
			$('#power-room-grade').text(result.prGrade + '级');
			$('#power-room-desc').text(result.prDesc);
			$('#customer-name').text(result.cusName);
			$('#customer-contactor').text(result.contactPerson);
			$('#customer-mobile').text(result.contactPersonMobile);
			$('#teamer-name').text(result.headName);
			$('#teamer-mobile').text(result.headMobile);
		}
	});
};

/*显示巡检日志列表*/

powerRoomInspectionController.disInspectionLogs = function () {
	var powerRoomId = this.prId;
	var currentPage = $('#inspection-log-pagination').attr('page');
	var pageSize = 10;
	var xjDate = $('#inspection-log-date-select').val();

	if (xjDate.length == 0) {
		xjDate = null;
	}

	/*powerRoomModel.getInspectionLogsById(powerRoomId, date, page, function (result) {
        if (result.code == "0") {
            moni.disPages("inspection-log-pagination", result.pageTotal, result.currentPage);
            $("#inspection-logs-con .inspection-item").remove();

            var dom = '';
            var length =  result.logsList.length;

            if(length == 0){
                moni.emptyTips("搜索不到巡检日志", "empty-tips-container");
                $("#empty-tips-container-tr").css("display", "table-row");
            }else{
                $("#empty-tips-container-tr").css("display", "none");
            }

            for (var i = 0; i < length; i++) {
                dom = '';
                dom += '<tr class="text-align-c inspection-item" inspection-id="' + result.logsList[i].routeId + '">';
                dom += '<td class="td5-1">' + result.logsList[i].inspectDate + '</td>';
                dom += '<td class="td7-1">' + result.logsList[i].inspectItemCount + '</td>';
                dom += '<td class="td7-1">' + result.logsList[i].recheckItemCount + '</td>';
                dom += '<td class="td7-1">' + result.logsList[i].occurItemCount + '</td>';
                dom += '<td class="td7-1">' + result.logsList[i].inspectQuesCount + '</td>';
                dom += '<td class="td8-1">' + result.logsList[i].groupLeader + '</td>';
                dom += '</tr>';

                $("#inspection-logs-con").append(dom);
            }
        }

    });*/

	powerRoomModel.getInspectionLogsById(powerRoomId,currentPage,pageSize,xjDate).subscribe(function (result) {
		if (result.code == '0') {
			moni.disPages('inspection-log-pagination', result.pageResult.totalPages, result.pageResult.currentPage);
			$('#inspection-logs-con .inspection-item').remove();
			var dom = '';
			var length =  result.pageResult.records.length;
			if(length == 0){
				moni.emptyTips('搜索不到巡检日志', 'empty-tips-container');
				$('#empty-tips-container-tr').css('display', 'table-row');
			}else{
				$('#empty-tips-container-tr').css('display', 'none');
			}

			for (var i = 0; i < length; i++) {
				dom = '';
				dom += '<tr class="text-align-c inspection-item" inspection-id="' + result.pageResult.records[i].id + '">';
				dom += '<td class="td5-1">' + result.pageResult.records[i].xjDate + '</td>';
				dom += '<td class="td7-1">' + result.pageResult.records[i].rjCount + '</td>';
				dom += '<td class="td7-1">' + result.pageResult.records[i].fjCount + '</td>';
				dom += '<td class="td7-1">' + result.pageResult.records[i].tfCount + '</td>';
				dom += '<td class="td7-1">' + result.pageResult.records[i].ycCount + '</td>';
				dom += '<td class="td8-1">' + result.pageResult.records[i].xjzz.realName + '</td>';
				dom += '</tr>';

				$('#inspection-logs-con').append(dom);
			}
		}
	});
};