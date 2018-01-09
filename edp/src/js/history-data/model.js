import { Common } from '../common/common';

export let model = {
	prId: null,		//配电室id
	searchType: 'AI',
	typeIds: [],	//选择的点的所有类型
	ranges : {},
	types: {
		day: 86400,
		hour: 3600,
		halfHour: 1800,
		minute: 60,
		fiveSecond: 5
	},
	duration: 3600,
	getDispatchMum: {},//获取调度号列表
	getType: {},//获取具体类型
	getHistoryData: {}//获取历史数据
};


model.getDispatchMum = function (prId, ct) {

	let param = {
		"path": "/dwt/iems/basedata/prvar/get_ddns",
		"data": {
			prId: prId,
			ct: ct
		}
	};

	return Common.post(param).map(function (res) {
		if (res.code == 0) {
			model.dispatchMum = res.list;
			return true;
		} else {
			return false;
		}
	})

};

model.getType = function (prId, ct, ddN, t) {

	let param = {
		"path": "/dwt/iems/basedata/prvar/get_pts",
		"data": {
			prId: prId,
			ct: ct,
			ddN: ddN,
			t: t

		}
	};

	return Common.post(param).map(function (res) {
		if (res.code == 0) {
			model.type = res.list;
			return true;
		} else {
			return false;
		}
	})

};

model.getHistoryData = function (prId, ddN, initBeginTime, initEndTime, interval, typeIds) {

	let param = {
		"path": "/dwt/edp/his/query_history_data",
		"data": {
			prId: prId,
			typeIds: typeIds,
			ddN: ddN,
			initBeginTime: initBeginTime,
			initEndTime: initEndTime,
			interval: interval
		}
	};

	return Common.post(param);

};

