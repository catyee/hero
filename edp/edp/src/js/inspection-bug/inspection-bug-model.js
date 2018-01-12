/**
 * inspectionBugDetailModel 巡检问题详情数据模型
 */

import { commonModel } from '../common/common-model';
import { commonCtrl} from '../common/common-controller';

var inspectionBugDetailModel = {
	getInspectionBugById        : {},    //通过问题id获取巡检问题详情
	
	createRepairOrderFromInsBug : {},    //通过巡检问题生成抢修单
}

/***
 * 通过巡检问题id获取问题详情
 * @param bugId    巡检问题id
 * @param callback 获取成功的回调函数
 */
inspectionBugDetailModel.getInspectionBugById = function(bugId){
	var param = {
		"path" : "/dwt/iems/bussiness/qx/get_xj_problem_by_id",
		"data" : {
            "id" : bugId,
        }
	}

	return commonModel.post(param);
}

/***
 * 由巡检问题生成抢修单
 * @param powerRoomId 配电室id
 * @param bugId       巡检问题id
 * @param bugDesc     问题描述
 * @param bugGrade    问题等级
 * @param callback    成功的调用函数
 */
inspectionBugDetailModel.createRepairOrderFromInsBug = function(powerRoomId, bugId, bugDesc){
	var param = {
		"path" : "/dwt/iems/bussiness/qx/add_or_update_qx_order",
		"data" : {
            userId : commonModel.userId,
			roleId : commonModel.roleId,
            prId : powerRoomId,
            problemId : bugId,
            problemDesc : bugDesc
		}
	}
	return commonModel.post(param);
}

exports.inspectionBugDetailModel = inspectionBugDetailModel;