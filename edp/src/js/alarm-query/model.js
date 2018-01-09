
import {Common} from '../common/common'

export let model = {
	page: 1,
	pageSize: 12,

	catalogType: null,		//搜索条件 报警位置 1高压侧 2低压侧 3变压器 4直流屏 5信号屏
	alarmFlag: null,		//搜索条件 报警标识   0：未处理  1：处理中  2：处理完成
	alarmClasses: null,		//搜索条件 报警事件 1、事故变位 2、操作变位 3、保护事件
	alarmStatus: null,		//搜索条件 解决状态 1:实时报警 2：历史报警


	prId: null,		//搜索条件 配电室id
	cusFlag: null,     //登录账号是否为客户

	totalPage: 0,        //总页数

	startDate: null,      //开始日期
	endDate: null,      //开始日期

	alarmList: [],       //报警列表
	search: {},           //搜索报警

}
/**
 * 查询
 */
model.search = function () {
	let param = {
		path: "/dwt/iems/bussiness/bj/page_get_alarm_list",
		data: {
			currentPage: this.page,
			pageSize: this.pageSize,

			catalogType: this.catalogType,
			alarmStaus: this.alarmStatus,
			alarmClasses: this.alarmClasses,
			alarmFlag: this.alarmFlag,

			cusFlag: this.cusFlag,

			startDate: this.startDate,
			endDate: this.endDate,
			prId: this.prId
		}
	}

	return Common.post(param).map(function (res) {
		if (res.code == "0") {
			model.alarmList = res.pageResult.records;
			model.totalPage = res.pageResult.totalPages;
			return true;
		}
	});
}

/***
 * 获取报警excel的路径
 */

model.getExcelPath = function () {
	var param = {
		path : '/dwt/iems/bussiness/bj/export_bj',
		data : {
			catalogType:this.catalogType,
			alarmStaus:this.alarmStatus,
			alarmClasses:this.alarmClasses,
			alarmFlag: this.alarmFlag,

			cusFlag:this.cusFlag,

			startDate :this.startDate,
			endDate :this.endDate,
			prId : this.prId
		}
	};

	return Common.post(param).map(function (res) {

		return res;

	});
};
