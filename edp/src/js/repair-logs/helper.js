
import {Common} from '../common/common';

export var repairLogsModel = {
    page: 1,
    pageSize: 10,
    totalPage: 0,
    startDate: null,       //搜索条件 开始日期
    endDate: null,       //搜索条件 结束日期
    prId: null,       //搜索条件 配电室id

    logList: [],         //保存巡检日志列表
    search: {},         //搜索日志
    handleData: {},        //对数据进行处理
}

repairLogsModel.search = function () {
    var param = {
        path: "/dwt/iems/bussiness/qx/page_get_qx_orders",
        data: {
            currentPage: this.page,
            pageSize: this.pageSize,
            prId: this.prId,
            startDate: this.startDate||null,
            endDate: this.endDate||null,
            deleteFlag: 1 //只查看已完成的
        }
    }

    return Common.post(param).map(function (res) {
        if (res.code == "0") {
            repairLogsModel.logList = res.pageResult.records;
            repairLogsModel.totalPage = res.pageResult.totalPages;
            repairLogsModel.handleData();
            return true;
        } else {
            return false
        }
    });
}

repairLogsModel.handleData = function () {
    var logList = this.logList;
    var length = logList.length;
    for (var i = 0; i < length; i++) {
        var order = logList[i];
        var repairTask = order.qxTasks.filter( item => item.type == 2 );
        logList[i].repairTask = (repairTask && repairTask.length > 0) ? repairTask[0] : null;
    }

}
