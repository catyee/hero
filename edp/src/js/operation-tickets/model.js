import { Common } from '../common/common'

export let model = {
	page: 1,
	pageSize: 12,
	totalPage: 0,
	startDate: null,       //搜索条件 开始日期
	endDate: null,       //搜索条件 结束日期
	prId: null,       //搜索条件 配电室id

	ticketList: [],         //保存巡检日志列表
	search: {},         //搜索日志
	handleData: {},        //对数据进行处理
}

model.search = function () {
	var param = {
		path: "/dwt/iems/bussiness/czp/page_get_czps",
		data: {
			currentPage: this.page,
			pageSize: this.pageSize,
			prId: this.prId,
			startDate: this.startDate,
			endDate: this.endDate,
            staus: this.status
		}
	}

	return Common.post(param).map(function (res) {
		if (res.code == "0") {
			model.ticketList = res.pageResult.records;
			model.totalPage = res.pageResult.totalPages;
			return true;
		} else {
			return false
		}
	});
}


