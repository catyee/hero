import { commonModel } from '../common/common-model'


var prListModel = {
	page : 1,   //记录当前分页
	pageSize : 12,  //配置分页数量
	totalPage: 0,   //记录最大分页数量
	prCnt    : 0, //配电室总数
	keyWord  : null,//关键字
	prList   : [],  //保存配电室列表


	emergencyCnt    : 0,    //突发数量
	repairLogCnt    : 0,    //今日抢修日志数量
	operTicketCnt   : 0,    //未完成操作票数量
	arangeSituation : 0,    //巡检安排情况
};

	//获取配电室列表

prListModel.getPrList = function () {
	var param = {
		'path' : '/dwt/iems/basedata/pr/page_get_pr_list',
		'data' : {
			currentPage : this.page,
			pageSize : this.pageSize,
			keyWord : this.keyWord,
			userId : commonModel.userId,
			roleId : commonModel.roleId
		}
	};
	return commonModel.post(param).map(function(res){
		if(res.code == '0'){
			prListModel.page = res.pageResult.currentPage;
			prListModel.totalPage = res.pageResult.totalPages;
			prListModel.prCnt = res.pageResult.totalCount;
			prListModel.prList = res.pageResult.records;
			return true;
		}else{
			commonModel.page = 1;
			commonModel.maxPage = 0;
			commonModel.PrCnt = 0;
			commonModel.prList = [];
			return false;
		}
	});
};

//获取今日任务

prListModel.getMainTask = function () {
	var param = {
		'path' : '/dwt/iems/bussiness/xj/ztz_first_page',
		'data' : {
			userId : commonModel.userId,
			roleId : commonModel.roleId
		}
	};

	return commonModel.post(param).map(function(res){
		if(res.code == '0'){
			prListModel.emergencyCnt = res.entity.tfCount;
			prListModel.repairLogCnt = res.entity.qxLogCount;
			prListModel.operTicketCnt = res.entity.czpCount;

			//计算巡检安排的情况

			var arrangeDate = (res.entity.xjDate?new Date(res.entity.xjDate.slice(0, 10).replace(/-/g,'/')):new Date());

			//计算该日期距今多少天

			var dateUtils = new DateUtils();
			var distance = dateUtils.getDateDistance(arrangeDate);
			var arrangeContent;
			switch (distance){
			case 0: arrangeContent = '今天未安排巡检'; break;
			case 1: arrangeContent = '明天未安排巡检'; break;
			default : arrangeContent = '已安排到'+res.entity.xjDate;
			}
			prListModel.arangeSituation = arrangeContent;
			return true;
		}else{
			return false;
		}
	});
};

exports.prListModel = prListModel;