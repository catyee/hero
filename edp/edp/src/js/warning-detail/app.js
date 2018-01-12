/* globals $,moni,window,moniWarningDetailModel*/

require('../../scss/warning-detail.scss');

import { moni} from '../common/common';
import { commonModel } from '../common/common-model';
import { commonCtrl } from '../common/common-controller';
import { moniWarningDetailModel } from './warning-detail-model'

require('../common/system-warning-service.js');
(function () {
	'use strict';

	var ctrl = {
		// 获取 repairLogId
		
		// initRtSocket: {},	//初始化获取实时数据的socket
		bind: {},			// 事件绑定
		disWarningDetail: {},     	//显示报警详情
		createRepairOrderFromSysBug: {},     	//生成抢修单
	};

	$(function () {

		ctrl.alarmId = moni.getParameter('aid');
		ctrl.bind();

		//显示报警详情

		ctrl.disWarningDetail();

		return ctrl == null;
	});

	/***
	 * 事件绑定
	 */

	ctrl.bind = function () {

		/*生成抢修单*/

		$('#create-order-button').click(function () {
			$('#model-system-bug-desc').val($('#alarm-desc').text());
			$('#create-order-modal').modal({});
		});

		/***
		 * 确认生成抢修单
		 */

		$('#model-create-repair-order').click(function () {
			ctrl.createRepairOrderFromSysBug();
			$(this).attr('disabled', 'disabled');
		});
	};

	/***
	 * 显示报警详情
	 */

	ctrl.disWarningDetail = function () {

		var alarmId = ctrl.alarmId;
		moniWarningDetailModel.getWarningDetailById(alarmId).subscribe(function (result) {

			if (result.code == '0') {

				ctrl.alarmInfo = result.entity;

				ctrl.alarmSource = result.alarmSource;

				var alarm = result.entity;
				$('#tag-name').val(alarm.tagName);

				$('#channel-name').val(alarm.channelName);

				$('#alarm-time').val(alarm.alarmTime.slice(0, -2));

				var alarmDesc = (alarm.ddN ? '[' + alarm.ddN + '] ' : '') + (alarm.alarmDesc ? alarm.alarmDesc : alarm.tagDesc);

				var alarmValue;

				if (alarm.varType == 'AI') {

					alarmValue = alarm.alarmValue.toFixed(2) + (alarm.unit ? alarm.unit : '');

					$('#alarm-value').text(alarmValue);

					//AI点显示报警设定值

					$('#threshold-value').text(
						((alarm.lowLimit || alarm.lowLimit == 0) ? "下限 " + alarm.lowLimit + alarm.unit : '')
						+ ((alarm.lowLimit || alarm.lowLimit == 0) && (alarm.topLimit || alarm.topLimit == 0) ? "，" : '')
						+ ((alarm.topLimit || alarm.topLimit == 0) ? "上限 " + alarm.topLimit + alarm.unit : '')
					);

				} else {
					//DI点根据显示方式来决定是否显示报警值

					if (alarm.showValue) {

						$('#alarm-value').text(alarm.valueDefine);

					} else {

						//从DOM中删除报警值一行

						$('#alarm-value').parent().remove();

					}

					//DI点不显示报警设定值

					$('#threshold-value').parent().remove();

				}


				var powerRoomAddress = '';
				powerRoomAddress += (alarm.pr.province ? alarm.pr.province : '');
				powerRoomAddress += ' ' + (alarm.pr.city ? alarm.pr.city : '');
				powerRoomAddress += ' ' + (alarm.pr.area ? alarm.pr.area : '');
				powerRoomAddress += ' ' + (alarm.pr.address ? alarm.pr.address : '');


				$('#alarm-desc').text(alarmDesc ? alarmDesc: '-');
				$('#alarm-tag').text(alarm.varDesc ? alarm.varDesc : '-');
				var types = ['', '设备预警', '设备报警', '事故报警'];
				$('#alarm-type').text(types[alarm.alarmType]);

				$('#power-room').text(alarm.pr.prName);
				$('#power-room').attr('href', 'power-room.do?prid=' + alarm.pr.id);
				$('#to-zrviewer').attr('href', 'zrviewer.do?prid=' + alarm.pr.id);

				$('#power-room-address').text(powerRoomAddress);
				$('#power-room-customer').text(alarm.pr.customer.cusName);
				$('#customer-contact').text(result.get('entity.pr.customer.lxr1', '-'));
				$('#customer-mobile').text(result.get('entity.pr.customer.lxr1Mobile', '-'));

				$('#alarm-time-view').text(alarm.alarmTime.slice(0, 19));

				//初始化获取实时数据的socket

				// var serverIP = result.get('entity.pr.server.serverAddress');
				// if (serverIP) {
				// 	ctrl.initRtSocket(serverIP, alarm.varIndex, alarm.varType, alarm.unit);
				// }

			}
		});
	};

	/***
	 * 初始化获取实时数据的socket
	 */

	// ctrl.initRtSocket = function (serverIP, varIndex, varType, unit) {
	// 	var websocket = new window.WebSocket('ws://' + serverIP + ':8061/GetFrameViewRTDataRapidly');

	// 	websocket.onopen = function () {
	// 		websocket.send(JSON.stringify({
	// 			code: 0,
	// 			Indexs: [{
	// 				index: varIndex,
	// 				type: varType
	// 			}]
	// 		}));
	// 	};

	// 	websocket.onmessage = function (message) {
	// 		var data = JSON.parse(message.data);
	// 		var value = data.Values[0];

	// 		$('#rt-value').text(value + (unit ? unit : ''));
	// 		window.setTimeout(function () {
	// 			websocket.send(JSON.stringify({
	// 				code: 1
	// 			}));
	// 		}, 5000);
	// 	};
	// };

	/**
	 * 确认生成抢修单
	 */

	ctrl.createRepairOrderFromSysBug = function () {
		var powerRoomId = ctrl.alarmInfo.prId;
		var bugId = ctrl.alarmInfo.id;
		var bugDesc = $.trim($('#model-system-bug-desc').val());
		moniWarningDetailModel.createRepairOrderFromSysBug(powerRoomId, bugId, bugDesc).subscribe(function (result) {
			if (result.code == '0') {
				window.location.replace('order-detail.do?od=' + result.id);
			} else if (result.code == '427') {
				window.location.replace('repairing-list.do');
			}
		});
	};

	/***
	 * 获取某数据点在某个时间点附近左右一分钟的数据
	 */

	ctrl.getNearByData = function (time, callback) {
		var data = {};
		var path = '';

		switch (parseInt(ctrl.alarmSource)) {
			case moni.collectModel.XS:
				data = {
					'tagName': ctrl.alarmInfo.tagFullName.split('\\')[1],
					'forwardChannel': ctrl.alarmInfo.channelName,
					'time': time,
					'enShortName': ctrl.alarmInfo.enShortName
				};
				path = moni.baseUrl + '/rt/ap/v1/repdispatch/get_nearby_value_alarm';
				break;
			case moni.collectModel.JK:
				data = {
					'serverId': ctrl.alarmInfo.serverId,
					'varDesc': ctrl.alarmInfo.tagFullName,
					'varType': ctrl.alarmInfo.varType,
					'alarmTime': time,
					'enShortName': ctrl.alarmInfo.enShortName
				};
				path = moni.baseUrl + '/rt/ap/v1/jk/jk_get_nearby_value_alarm';
				break;
		}

		/*发送ajax请求获取数据*/

		moni.ajax({
			path: path,
			data: data,
			success: callback
		});
	};
})();

