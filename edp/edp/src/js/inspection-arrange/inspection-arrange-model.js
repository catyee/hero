/**
 * 巡检数据模型
 */

import { commonModel } from '../common/common-model';
import { commonCtrl } from '../common/common-controller';

var inspectionArrangeModel = {
	getInspectionArrange   : {},    //获取巡检安排
	getPowerRoomByTeamerId : {},    //获取组团行下辖的所有配电室
	
	setInspectionArrange   : {},    //保存巡检安排
};


/***
 * 初始化巡检安排
 * @param teamerId 组团长id
 * @param date     日期  格式yyyy-MM-dd  如：2016-02-29
 * @param callback 获取成功是的回调函数
 */

inspectionArrangeModel.getInspectionArrange = function(date){
	var param = {
    	'path' : '/dwt/iems/bussiness/xj/get_xj_route',
		'data' : {
			'ztzUserId': commonModel.userId,
			'xjDate': date
		}
	};
	return commonModel.post(param);
};

/***
 * 根据组团长id获取其下辖的所有配电室
 * @param callback  成功时的回调函数
 */

inspectionArrangeModel.getPowerRoomByTeamerId = function(){
	return commonModel.getAllPowerRoom();
};

/***
 * 保存巡检安排的路线
 * @param teamerId  组团长Id
 * @param date      日期 格式：yyyy-MM-dd 如2016-02-29
 * @param routeList 路线列表对象如下：
 * 
 * [
 *		{
 *           "inspectTeamGroupId": "1",
 *		     "route": "1,2,3"
 *		},
 *		{
 *		     "inspectTeamGroupId": "2",
 *		     "route": "4,5,6"
 *		}
 * ]
 * @param callback  成功后的回调函数
 */

inspectionArrangeModel.setInspectionArrange = function(teamerId, date, routeList, callback){
	var param = {
		'path' : '/dwt/iems/bussiness/xj/add_xj_route',
		'data' : {
			ztzUserId : commonModel.userId,
			xjDate : date,
			routes : routeList
		}

	};
	return commonModel.post(param);
};

exports.inspectionArrangeModel = inspectionArrangeModel;