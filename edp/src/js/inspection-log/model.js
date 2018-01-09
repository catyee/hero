
import { Common } from '../common/common';

export let model = {
	id: null,
	log: null,
	getLog: {},
	handleData: {},
	lastState: ''
};

model.getLog = function () {

	if (!this.id) {
		return Rx.Observable.create(function (observe) {
			observe.next(false);
		});
	}

	let param = {
		"path": "/dwt/iems/bussiness/xjlog/get_xj_log_details",
		"data": {
			id: this.id
		}
	};

	return Common.post(param).map(function (res) {
		if (res.code == "0") {
			model.log = res.entity;
			model.handleData();
			return true;
		} else {
			return false;
		}
	});

};

//处理数据

model.handleData = function () {

	model.log.dailyCount = model.log.rjLogs.length;
	model.log.weekCount = model.log.weekLogs.length;
	model.log.monthCount = model.log.monthLogs.length;
	model.log.reviewCount = model.log.fjLogs.length;
	model.log.burstCount = model.log.tfLogs.length;
	model.log.bugCount = model.log.ycCount;

};

