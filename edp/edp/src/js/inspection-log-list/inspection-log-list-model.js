
import { moni} from '../common/common';
import { commonModel } from '../common/common-model';
import { commonCtrl } from '../common/common-controller';

var insLogListModel = {
	page : 1,
	totalPage : 0,
	pageSize　: 12,
	cusId : null,
	prId : null,    //保存查询条件-- 配电室id
	date : null,    //保存查询条件-- 日期
	logList : [],   //保存日志列表
	customerList : [], //保存客户列表
	cusPRList    : [],   //保存配电室列表

	getInsLogList : {},    //获取巡检日志列表
};

	/***
     * 获取巡检日志列表
     */

insLogListModel.getInsLogList = function () {

	//如果是抢修班长，抢修组长，组团长，巡检组长，必选传userId 和roleId

	var userId = null;
	var roleId = null;
	if(
		commonModel.roleId == moni.ROLES.QXBZ ||
												commonModel.roleId == moni.ROLES.QXZZ ||
												commonModel.roleId == moni.ROLES.ZTZ  ||
												commonModel.roleId == moni.ROLES.XJZZ
	){
		userId = commonModel.userId;
		roleId = commonModel.roleId;
	}
	var param = {
		path : '/dwt/iems/bussiness/xjlog/page_get_xj_log_list',
		data : {
			currentPage : this.page,
			pageSize : this.pageSize,
			userId : userId,
			roleId : roleId,
			cusId  : ( insLogListModel.cusId != '-1' ? insLogListModel.cusId : null ),
			prId   : ( insLogListModel.prId != '-1' ? insLogListModel.prId : null ),
			xjDate : insLogListModel.date
		}
	};
	return commonModel.post(param).map(function(res){
		if(res.code == '0'){

			//获取到数据之后 将数据存放到model里 然后染回true 通知ctrl渲染

			insLogListModel.logList = res.pageResult.records;
			insLogListModel.page = res.pageResult.currentPage;
			insLogListModel.totalPage = res.pageResult.totalPages;
			insLogListModel.logNumber = res.pageResult.totalCount;
			return true;
		}
		return false;
	});
};

exports.insLogListModel = insLogListModel;
