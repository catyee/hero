
import { moni} from '../common/common';
import { commonModel } from '../common/common-model';
import { commonCtrl } from '../common/common-controller';

var repairLogListModel = {
	page : 1,
	pageSize : 10,
	totalPage : 0,
	logNumber : 0,
	customerId : null, //过滤条件 客户id
	prId : null,    //过滤条件  配电室id
	date : null,      //过滤条件  日期
	logList : [],   //日志列表
};

//获取抢修日志列表

repairLogListModel.getRepLogList = function () {
	var param = {
		path : '/dwt/iems/bussiness/qx/page_get_qx_orders',
		data : {
			userId : commonModel.userId,
			roleId : commonModel.roleId,
			prId : this.prId,
			cusId : this.customerId,
			queryDate : this.date,
			currentPage : this.page,
			pageSize : this.pageSize,
			deleteFlag : 1
		}
	};

	return commonModel.post(param).map(function(res){
		if(res.code == '0'){
			repairLogListModel.logList = res.pageResult.records;
			repairLogListModel.page = res.pageResult.currentPage;
			repairLogListModel.totalPage = res.pageResult.totalPages;
			repairLogListModel.logNumber = res.pageResult.totalCount;
			return true;
		}else{
			return false;
		}
	});
};

exports.repairLogListModel = repairLogListModel;
