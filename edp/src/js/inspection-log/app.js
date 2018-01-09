require('../../scss/inspection.log.scss');

import {Common} from '../common/common';
import {model} from './model'

let app = {
	init: {},
	bind: {},
	getLog: {},
	renderLog: {},
	renderPr: {},     //显示配电室信息
};
$(function () {
	app.init();
});

app.init = function () {
	app.bind();
	model.id = Common.getParameter('d');
	model.prId = Common.getParameter('prid');
	app.getLog();
	app.renderPr();
}

app.bind = function () {

	//点击异常的巡检项 跳转到巡检问题里

	$("#content").on( 'click', '.item', function () {

		let itemId = $(this).data( 'item-id' );
		let itemStatus = $(this).data( 'item-status' );
		let itemType = $(this).data( 'item-type')

		if ( itemStatus == 2){

			window.location.href = './inspection-bug.html?itemId=' + itemId + '&logId=' + model.id + '&itemType=' + itemType ;

		}

	})

};

app.getLog = function () {
	model.getLog().subscribe(function (res) {
		if (res) {
			app.renderLog();
		}
	})
};

app.renderLog = function () {

	let log = model.log;

	$("#date").text(log.route.xjDate);
	$("#inspection-date").text(log.route.xjDate);
	$("#complete-time").text(log.route.xjzz.lastModifyTime.slice(0, 19));
	$("#inspector").text(log.route.xjzz.realName);
	$("#daily-count").text(log.dailyCount + '项');
	$("#week-count").text(log.weekCount + '项');
	$("#month-count").text(log.monthCount + '项');
	$("#review-count").text(log.reviewCount + '项');
	$("#burst-count").text(log.burstCount + '项');
	$("#bug-count").text(log.bugCount + '项');

	let dailyLogs = log.rjLogs;
	let weekLogs = log.weekLogs;
	let monthLogs = log.monthLogs;
	let reviewLogs = log.fjLogs;
	let burstLogs = log.tfLogs;

	let content = "";

	let length = dailyLogs.length;
	if (length > 0) {
		content += '<tr>'
		content += '<td colspan="3">日检项目</td>'
		content += '</tr>'
	}

	for (let i = 0; i < length; i++) {

		content += this.getItem({
			index : i,
			type : 1, //日常巡检
			id : dailyLogs[i].xjItem.id,
			name : dailyLogs[i].xjItem.xjItem,
			status : dailyLogs[i].xjItemStatus
		})

	}

	length = weekLogs.length;

	if (length > 0) {
		content += '<tr>';
		content += '<td colspan="3">周检项目</td>';
		content += '</tr>';
	}

	for (let i = 0; i < length; i++) {

		content += this.getItem({
			index : i,
			type : 1, //日常巡检
			id : weekLogs[i].xjItem.id,
			name : weekLogs[i].xjItem.xjItem,
			status : weekLogs[i].xjItemStatus
		});

	}

	length = monthLogs.length;
	if (length > 0) {
		content += '<tr>';
		content += '<td colspan="3">月检项目</td>';
		content += '</tr>'
	}

	for (let i = 0; i < length; i++) {

		content += this.getItem({
			index : i,
			type : 1, //日常巡检
			id : monthLogs[i].xjItem.id,
			name : monthLogs[i].xjItem.xjItem,
			status : monthLogs[i].xjItemStatus
		});

	}

	length = reviewLogs.length;

	if (length > 0) {
		content += '<tr>'
		content += '<td colspan="3">复检项目</td>'
		content += '</tr>'
	}

	for (let i = 0; i < length; i++) {

		content += this.getItem({
			index : i,
			type : 2, //复检
			id : reviewLogs[i].fjItem.id,
			name : reviewLogs[i].fjItem.fjItem,
			status : reviewLogs[i].fjItemStatus
		});

	}

	length = burstLogs.length;
	if (length > 0) {
		content += '<tr>'
		content += '<td colspan="3">突发项目</td>'
		content += '</tr>'
	}

	for (let i = 0; i < length; i++) {

		content += this.getItem({
			index : i,
			type : 3, //突发
			id : burstLogs[i].tfItem.id,
			name : burstLogs[i].tfItem.tfItem,
			status : burstLogs[i].tfItemStatus
		});

	}

	let total = log.dailyCount + log.reviewCount + log.burstCount + log.weekCount + log.monthCount;

	content += '<tr>';
	content += '<td colspan="3">共计：' + total + '项， 巡检人：' + log.route.xjzz.realName + '， 巡检日期：' + log.route.xjDate + '</td>';
	content += '</tr>';

	$("#content").html(content);
};

app.getItem = function ( item ) {

	let statusContent = [
		'<span class="color-success" style="white-space: nowrap;" >正常</span>',
		'<span class="color-warning" style="white-space: nowrap;" >异常已解决</span>',
		'<span class="color-danger" style="white-space: nowrap;">异常已汇报</span>'];

	let className = item.status == 2 ?'pointer' : '';

	return `
		<tr class="${ className } item" data-item-id="${ item.id }" data-item-status="${ item.status }" data-item-type="${ item.type }">	
		<td width="6%" class="center">${ item.index + 1 }</td>
		<td>${ item.name }</td>
		<td class="center">${ statusContent[item.status] }</td>
		</tr>
	`
};


app.renderPr = function () {

	Common.getPowerRoomBaseInfo(model.prId).subscribe(function (res) {
		if (res.code == "0") {

			let pr = res.entity;

			let prName = (Common.isExperience ? Common.experiencePrName : pr.prName );

			$("#title").text(prName + "巡检日志");
			$("#power-room-name").text(prName);
		}
	})
};
