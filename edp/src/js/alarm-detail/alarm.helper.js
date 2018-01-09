
import { Common } from '../common/common'
import { ALARM_TYPES, ROLES } from '../common/common.enum'


export var alarmHelper = {
	alarmId: null,
	initAlarm: {},
	getAlarm: {}
};

/***
 * 初始化报警
 * @param alarmId
 */

alarmHelper.initAlarm = function (alarmId) {

	this.alarmId = alarmId;

	this.getAlarm().then(this.renderAlarm).catch(() => {

	});

};

/***
 * 从服务器获取报警详情
 * @returns {Promise}
 */

alarmHelper.getAlarm = function () {

	var data = {

		id: this.alarmId

	};

	var path = '/dwt/iems/bussiness/bj/get_alarm_by_id';

	var param = {

		path: path,
		data: data

	};

	return new Promise(function (resolve, reject) {

		Common.post(param).subscribe((res) => {

			if (res.code == 0) {

				resolve(res.entity);

			} else {

				reject(res.code);

			}
		});

	});

};

alarmHelper.renderAlarm = function (alarm) {

	var unit = alarm.unit ? ' ' + alarm.unit : '';

	//体验账号替换掉配电室名字

	alarm.alarmDesc = alarm.alarmDesc ? alarm.alarmDesc : '';
	if (Common.isExperience) {
		let replaceStr = Common.replaceStr;
		for (let i = 0; i < replaceStr.length; i++) {
			alarm.alarmDesc = alarm.alarmDesc.replace(RegExp(replaceStr[i], 'g'), Common.realName);
		}
	}


	$('#alarm-desc').text(alarm.alarmDesc);
	$('#DDNumber').text(alarm.ddN);
	$('#alarm-type').text(ALARM_TYPES[alarm.alarmType]);
	$('#alarm-time').text(alarm.alarmTime);
	$('#power-room').text(Common.isExperience ? Common.experiencePrName : alarm.pr.prName);

	//如果是客户 隐藏掉报警类型

	if (Common.roleId == ROLES.KH) {
		$('#alarm-type').parent().hide();
	}

	if (alarm.varType == 'AI') {

		let alarmValue = alarm.alarmValue.toFixed(2) + (alarm.unit ? alarm.unit : '');

		$('#alarm-value').text(alarmValue);

		//AI点显示报警设定值

		$('#threshold-value').text(
			((alarm.lowLimit || alarm.lowLimit == 0) ? '下限 ' + alarm.lowLimit + alarm.unit : '')
			+ ((alarm.lowLimit || alarm.lowLimit == 0) && (alarm.topLimit || alarm.topLimit == 0) ? '，' : '')
			+ ((alarm.topLimit || alarm.topLimit == 0) ? '上限 ' + alarm.topLimit + alarm.unit : '')
		);

	} else {

		//DI点根据显示方式来决定是否显示报警值

		if (alarm.showValue) {

			$('#alarm-value').text(alarm.valueDefine);

		} else {

			//从DOM中删除报警值一行

			$('#alarm-value-line').remove();

		}

		//DI点不显示报警设定值

		$('#threshold-value-line').remove();

	}
};