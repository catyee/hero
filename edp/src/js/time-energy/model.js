
import {Common} from '../common/common'

import { POSITIONCLASSIFY } from '../common/common.enum';

export let model = {
	prId: null,
	number: null,  //调度号
	type: 1,
	date: {},
	TYPES: {
		DAY: 1,
		MONTH: 2,
		YEAR: 3,
	},
	cabinets: [],
	getCabinets: {},

	getData: {},       //获取数据
	JIAN: [],
	FENG: [],
	PING: [],
	GU: [],

	total_JIAN: 0,
	total_FENG: 0,
	total_PING: 0,
	total_GU: 0,

	compareLastYear: [],
	compareLastMonth: [],
	compareCurrent: [],
	compareXAxis: []

}


//获取调度号/柜子

model.getCabinets = function () {

	let param = {
		path: "/dwt/iems/basedata/prvar/get_ddns",
		data: {
			"prId": this.prId,
			"pq": "%Ep"
		}
	};

	return Common.post(param).map(function (res) {
		if (res.code == "0") {
			let list = res.list;

			//构建调度号树所需要的数据结构
			model.cabinets = [];
			for (let i = 1; i < 6; i++) {
				let type = list.filter( item => item.ct == POSITIONCLASSIFY[i].value);
				if (type.length > 0) {
					model.cabinets.push({
						"name": POSITIONCLASSIFY[i].content,
						"list": type
					})
				}
			}
			return true;
		} else {
			return false;
		}
	})
};

//获取数据

model.getData = function () {

	let param1 = {
		"path": "/dwt/edp/electric/fs_analysis_v2",
		"data": {
            initBeginTime: this.date[ this.type ].startDate,
            initEndTime: this.date[ this.type ].endDate,
			prId: this.prId,
			dataType: this.type,
			ddN: this.number
		}
	};

	let getTimeData$ = Common.post(param1);

	let param2 = {
		"path": "/dwt/edp/electric/proportion_analysis_v2",
		"data": {
            initBeginTime: this.date[ this.type ].startDate,
            initEndTime: this.date[ this.type ].endDate,
			prId: this.prId,
			dataType: this.type,
			ddN: this.number
		}
	};

	let getCompateData$ = Common.post(param2);

	return Rx.Observable.zip(getTimeData$, getCompateData$).map(function (res) {

		if (res[0].code == "0") {
			model.JIAN = [];
			model.FENG = [];
			model.PING = [];
			model.GU = [];
			model.total_JIAN = 0;
			model.total_FENG = 0;
			model.total_PING = 0;
			model.total_GU = 0;
			model.xAxises = [];
			res[0].list.map(function (item) {
				let tip = ( item.tip > 0? item.tip : 0 );
				let peak = ( item.peak > 0 ? item.peak : 0 );
				let flat = ( item.flat > 0 ? item.flat : 0 );
				let valley = ( item.valley > 0 ? item.valley : 0 );
				model.JIAN.push(tip);
				model.FENG.push(peak);
				model.PING.push(flat);
				model.GU.push(valley);

				model.total_JIAN += tip;
				model.total_FENG += peak;
				model.total_PING += flat;
				model.total_GU += valley;
				model.xAxises.push(item.date);
			})

		}
		if (res[1].code == 0) {
			let list = res[1].list;
			if (list[0]) {
				model.compareCurrent = [
					(list[0].tipProportion && list[0].tipProportion > 0) ? list[0].tipProportion : 0,
					(list[0].peakProportion && list[0].peakProportion > 0) ? list[0].peakProportion : 0,
					(list[0].flatProportion && list[0].flatProportion > 0) ? list[0].flatProportion : 0,
					(list[0].valleyProportion && list[0].valleyProportion > 0) ? list[0].valleyProportion : 0
				];
			}
			if (model.type == model.TYPES.DAY) {
				if (list[1]) {
					//本期
					model.compareLastMonth = [
						(list[1].tipProportion && list[1].tipProportion > 0) ? list[1].tipProportion : 0,
						(list[1].peakProportion && list[1].peakProportion > 0) ? list[1].peakProportion : 0,
						(list[1].flatProportion && list[1].flatProportion > 0) ? list[1].flatProportion : 0,
						(list[1].valleyProportion && list[1].valleyProportion > 0) ? list[1].valleyProportion : 0
					];
				}
				//去年同期
				if (list[2]) {
					model.compareLastYear = [
						(list[2].tipProportion && list[2].tipProportion > 0) ? list[2].tipProportion : 0,
						(list[2].peakProportion && list[2].peakProportion > 0) ? list[2].peakProportion : 0,
						(list[2].flatProportion && list[2].flatProportion > 0) ? list[2].flatProportion : 0,
						(list[2].valleyProportion && list[2].valleyProportion > 0) ? list[2].valleyProportion : 0
					];
				}
			} else {
				if (list[1]) {
					model.compareLastYear = [
						(list[1].tipProportion && list[1].tipProportion > 0) ? list[1].tipProportion : 0,
						(list[1].peakProportion && list[1].peakProportion > 0) ? list[1].peakProportion : 0,
						(list[1].flatProportion && list[1].flatProportion > 0) ? list[1].flatProportion : 0,
						(list[1].valleyProportion && list[1].valleyProportion > 0) ? list[1].valleyProportion : 0
					];
				}
			}
		}

		return true;
	})

};

