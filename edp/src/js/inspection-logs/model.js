import {Common} from '../common/common'
export let model = {
	page: 1,
	pageSize: 20,
	totalPage: 0,
	startDate: null,       //搜索条件 开始日期
	endDate: null,       //搜索条件 结束日期
	prId: null,       //搜索条件 配电室id

	logList: [],         //保存巡检日志列表

	search: {},         //搜索日志
};

model.search = function () {
	let param = {
		path: "/dwt/iems/bussiness/xjlog/page_get_xj_log_list",
		data: {
			currentPage: this.page,
			pageSize: this.pageSize,
			prId: this.prId,
			startDate: this.startDate,
			endDate: this.endDate
		}
	};

	return Common.post(param).map(function (res) {
		if (res.code == "0") {
			model.logList = res.pageResult.records;
			model.totalPage = res.pageResult.totalPages;
			return true;
		} else {
			return false
		}
	});
}
