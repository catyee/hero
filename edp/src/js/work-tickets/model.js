import { Common } from '../common/common'

export let model = {
	page: 1,
	pageSize: 12,
	totalPage: 0,
	startDate: null,       //搜索条件 开始日期
	endDate: null,       //搜索条件 结束日期
	prId: null,       //搜索条件 配电室id
	status: null,       //搜索条件 null 全部 1 已完成 2 未完成

	ticketList: [],       //保存巡检日志列表
	search: {},         //搜索日志
	handleData: {},        //对数据进行处理
};

model.search = function () {

	let param = {
		path: "/dwt/iems/bussiness/gzp/page_get_gzps",
		data: {
			currentPage: this.page,
			pageSize: this.pageSize,
			prId: this.prId,
			startDate: this.startDate,
			endDate: this.endDate,
			status: this.status
		}
	};
	console.log('111')
	return Common.post(param).map(function (res) {
		if (res.code == "0") {
			model.ticketList = res.pageResult.records;
			model.totalPage = res.pageResult.totalPages;

			return true;
		} else {
			return false
		}
	});
};

