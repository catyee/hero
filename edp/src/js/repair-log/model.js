import { Common } from '../common/common';

export let model = {
	id: null,
	log: null,
	prefix: '',
	getLog: {},
	handleData: {},
};

model.getLog = function () {
	if (!this.id) {
		return Rx.Observable.create(function (observe) {
			observe.next(false);
		});
	}

	let param = {
		'path': '/dwt/iems/bussiness/qx/get_qx_order_by_id',
		'data': {
			qxOrderId: this.id
		}
	};

	return Common.post(param).map(function (res) {
		if (res.code == '0') {
			model.log = res.entity;
			model.prefix = res.prefix;
			model.handleData();
			return true;
		} else {
			return false;
		}
	});

};

//处理数据

model.handleData = function () {

	model.surveyTasks = model.log.qxTasks.filter( item => item.type == 1 );
	let repairTask = model.log.qxTasks.filter( item => item.type == 2 );
	model.repairTask = (repairTask && repairTask.length > 0) ? repairTask[0] : null;

	//查询报警时间

	if (model.log.prAlarm) {

		model.alarmTime = model.log.prAlarm.alarmTime;

	} else if (model.log.xjProblem) {

		model.alarmTime = model.log.xjProblem.createTime.slice(0, -2);

	} else {

		model.alarmTime = model.log.createTime.slice(0, -2);

	}

	//查询开始查勘时间

	if (model.surveyTasks.length > 0) {

		let tasks = model.surveyTasks.sort( (a, b) => a.createTime - b.createTime );
		model.startSurveyTime = tasks[0].createTime.slice(0, -2);

	} else {

		model.startSurveyTime = '没有安排查勘';

	}


	//获取抢修时间和抢修结束时间

	if (model.repairTask) {

		model.startRepairTime = model.repairTask.createTime.slice(0, -2);
		model.completeRepairTime = model.repairTask.lastModifyTime.slice(0, -2);

	} else {

		model.startRepairTime = '没有安排抢修';
		model.completeRepairTime = '没有安排抢修';

	}
};

