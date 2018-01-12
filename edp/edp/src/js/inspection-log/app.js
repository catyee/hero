/**
 * 巡检日志详情
 */
require('../../scss/inspection-log.scss');

import { moni} from '../common/common';
import { commonModel } from '../common/common-model';
import { commonCtrl } from '../common/common-controller';
import { inspectionLogDetailModel } from './inspection-log-model';

require('../common/system-warning-service.js');


var inspectionLogDetailController = {
	disPowerRoomInfo       : {},    //展示配电室信息
	disInspectionLogDetail : {},    //展示巡检日志详情
	
}
$(function(){
	var screenHeight = ((window.innerHeight > 0) ? window.innerHeight : screen.height);
	$("#main-container").css("minHeight",screenHeight-64);
	
	inspectionLogDetailController.disPowerRoomInfo();
	inspectionLogDetailController.disInspectionLogDetail();

})

/***
 * 展示配电室信息
 */
inspectionLogDetailController.disPowerRoomInfo = function(){
	var powerRoomId = moni.getParameter('prid');
	commonModel.getPowerRoomById(powerRoomId).subscribe(function(result){
		if(result.code == "0"){
			var pr = result.entity;
			$("#power-room-name").text(pr.prName);
			$("#power-room-grade").text(pr.prGrade.grade); 
			$("#customer-name").text(pr.customer.cusName);
			$("#customer-mobile").text(pr.customer.lxr1Mobile);
			$("#power-room-address").text((pr.province?pr.province:'')+' '+(pr.city?pr.city:'')+' '+(pr.area?pr.area:""));
		}
	})
}

/**
 * 展示巡检日志详情
 */
inspectionLogDetailController.disInspectionLogDetail = function(){
	var id = moni.getParameter('d');
	inspectionLogDetailModel.getInspectinLogById(id).subscribe(function(result){
		if(result.code == "0"){
			var log = result.entity;
			$("#inspection-date").text(log.inspectDate);
			$("#teamer-name").text(log.groupName);
			$("#teamer-mobile").text(log.groupMobile);
			
			$("#check-item-list").empty();
			var statusInfo = ["<span class='color-green'>正常</span>","<span class='color-green'>异常已解决</span>","<span class='color-red'>异常已提交</span>"];
		
			var html = "";
			/*日常巡检*/
			html += '<div class="">';
			html += '<div class="height34"></div>';
			html += '<div class="font18 bold" style="padding:0 56px;">日检</div>';
			html += '<div class="height20"></div>';
			html += '<table class="inspection-table">';
			html += '<tr class="font18">';
			html += '<td class="bold">序号</td>';
			html += '<td class="bold">巡检项目</td>';
			html += '<td  class="bold">状态</td>';
			html += '</tr>';
			for(var i=0; i<log.rjLogs.length; i++){
				html += '<tr class="font14">';
				html += '<td>'+(i+1)+'</td>';
				html += '<td>'+log.rjLogs[i].xjItem.xjItem+'</td>';
				html += '<td>'+statusInfo[log.rjLogs[i].xjItemStatus]+'</td>';
				html += '</tr>';
			}
			html += '</table>';
			html += '</div>';


			/*周检巡检*/
			if(log.weekLogs.length>0) {

				html += '<div class="">';
				html += '<div class="height34"></div>';
				html += '<div class="font18 bold" style="padding:0 56px;">周检</div>';
				html += '<div class="height20"></div>';
				html += '<table class="inspection-table">';
				html += '<tr class="font18">';
				html += '<td class="bold">序号</td>';
				html += '<td class="bold">巡检项目</td>';
				html += '<td  class="bold">状态</td>';
				html += '</tr>';
				for (var i = 0; i < log.weekLogs.length; i++) {
					html += '<tr class="font14">';
					html += '<td>' + (i + 1) + '</td>';
					html += '<td>' + log.weekLogs[i].xjItem.xjItem + '</td>';
					html += '<td>' + statusInfo[log.weekLogs[i].xjItemStatus] + '</td>';
					html += '</tr>';
				}
				html += '</table>';
				html += '</div>';

			}
			/*月检巡检*/
			if(log.monthLogs.length>0) {
				html += '<div class="">';
				html += '<div class="height34"></div>';
				html += '<div class="font18 bold" style="padding:0 56px;">月检</div>';
				html += '<div class="height20"></div>';
				html += '<table class="inspection-table">';
				html += '<tr class="font18">';
				html += '<td class="bold">序号</td>';
				html += '<td class="bold">巡检项目</td>';
				html += '<td  class="bold">状态</td>';
				html += '</tr>';
				for (var i = 0; i < log.monthLogs.length; i++) {
					html += '<tr class="font14">';
					html += '<td>' + (i + 1) + '</td>';
					html += '<td>' + log.monthLogs[i].xjItem.xjItem + '</td>';
					html += '<td>' + statusInfo[log.monthLogs[i].xjItemStatus] + '</td>';
					html += '</tr>';
				}
				html += '</table>';
				html += '</div>';
			}


			
			/*复检*/
			if(log.fjLogs.length>0){
				html += '<div class="">';
				html += '<div class="height34"></div>';
				html += '<div class="font18 bold" style="padding:0 56px;">复检</div>';
				html += '<div class="height20"></div>';
				html += '<table class="inspection-table">';
				html += '<tr class="font18">';
				html += '<td class="bold">序号</td>';
				html += '<td class="bold">巡检项目</td>';
				html += '<td class="bold">状态</td>';
				html += '</tr>';
				for(var i=0; i<log.fjLogs.length; i++){
					html += '<tr class="font14">';
					html += '<td>'+(i+1)+'</td>';
					html += '<td>'+log.fjLogs[i].fjItem.fjItem+'</td>';
					html += '<td class="color-green">'+statusInfo[log.fjLogs[i].fjItemStatus]+'</td>';
					html += '</tr>';
				}
				html += '</table>';
				html += '</div>';
			}
			/*突发*/
			
			if(log.tfLogs.length > 0){
				html += '<div class="">';
				html += '<div class="height34"></div>';
				html += '<div class="font18 bold" style="padding:0 56px;">突发问题</div>';
				html += '<div class="height20"></div>';
				html += '<table class="inspection-table">';
				html += '<tr class="font18">';
				html += '<td class="bold">序号</td>';
				html += '<td class="bold">巡检项目</td>';
				html += '<td class="bold">状态</td>';
				html += '</tr>';
				for(var i=0; i<log.tfLogs.length; i++){
					html += '<tr class="font14">';
					html += '<td>'+(i+1)+'</td>';
					html += '<td>'+log.tfLogs[i].tfItem.tfItem+'</td>';
					html += '<td class="color-green">'+statusInfo[log.tfLogs[i].tfItemStatus]+'</td>';
					html += '</tr>';
				}
				html += '</table>';
				html += '</div>';
			}
			
			$("#inspection-content").html(html);
			
		}
	})
}