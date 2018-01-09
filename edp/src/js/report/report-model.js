import {Common} from '../common/common'
/**
 * 报表类型说明：
 *  1 年报表
 *  3 月报表
 *  5 日报表
 *  7 时报表
 *  9 分报表
 */

export let reportModel = {
    id: null,
    type: null,
    TYPES: {
        // YEAR : 1,
        // MONTH : 3,
        // WEEK : 5,
        DAY: 7,
        //HOUR : 9,
    },
    date: null,
    startDate: null,
    endDate: null,
    dispatchNum : '',
    handleData: {},
	getDispatchMum: {},

}

//获取调度号

reportModel.getDispatchMum = function (prId, ct) {

	let param = {
		"path": "/dwt/iems/basedata/prvar/get_ddns",
		"data": {
			prId: prId,
			ct: ct,
			pq: "%Ep"
		}
	};

	return Common.post(param).map(function (res) {
		if (res.code == 0) {
			reportModel.dispatchMum = res.list;
			return true;
		} else {
			return false;
		}
	})

};

//获取统计报表数据

reportModel.getData = function () {

    //获取上个月的今天的日期

    function getLastMonthDay() {

        var now = new Date();
        var year = now.getFullYear();//getYear()+1900=getFullYear()
        var month = now.getMonth() + 1;//0-11表示1-12月
        var day = now.getDate();
        if (parseInt(month) < 10) {
            month = "0" + month;
        }
        if (parseInt(day) < 10) {
            day = "0" + day;
        }

        now = year + '-' + month + '-' + day;

        if (parseInt(month) == 1) {//如果是1月份，则取上一年的12月份
            return (parseInt(year) - 1) + '-12-' + day;
        }

        var preSize = new Date(year, parseInt(month) - 1, 0).getDate();//上月总天数
        if (preSize < parseInt(day)) {//上月总天数<本月日期，比如3月的30日，在2月中没有30
            return year + '-' + month + '-01';
        }

        if (parseInt(month) <= 10) {
            return year + '-0' + (parseInt(month) - 1) + '-' + day;
        } else {
            return year + '-' + (parseInt(month) - 1) + '-' + day;
        }

    }


    this.lastMonthDay = getLastMonthDay();

    var param = {
        "path": '/dwt/edp/report/query_report_data',
        "data": {
            prId: this.prId,
			initBeginTime: this.startDate,
			initEndTime: this.endDate,
            ddN : this.dispatchMum,
        }
    };

    return Common.post(param).map(function (res) {

        if (res.code == 0) {

            reportModel.timeList = res.timeList;
            reportModel.records = res.list;

            return true;
        }
    })
};

//导出统计报表数据
reportModel.exportReport = function () {
    var param = {
        "path": "/dwt/edp/report/export_report",
        "data": {
			prId: this.prId,
			initBeginTime: this.startDate,
			initEndTime: this.endDate,
			ddN : this.dispatchMum,
        }
    }
    return Common.post(param).map(function (res) {

        if (res.code == 0) {
            reportModel.report = res;
            return true;
        }
        return false;
    })
}

