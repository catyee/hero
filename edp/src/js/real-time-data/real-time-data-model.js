import { Common } from '../common/common';

export let RTDModel = {
	prId: null,       //配电室id
	cabinetType: null, //配电柜分类 1:高压侧 2:低压 3：直流屏 4：变压器
	dispatchMum: null, //调度号
	tagTypes: [],   //选择的标签分类
	tagList: [],   //标签列表

	getDispatchMum: {},  //获取调度号列表
	getPrById: {},       //获取配电室信息
	getTagList: {},   //获取标签列表
	JKRDTWebsocket: "ws://{IP}:8061/GetFrameViewRTDataRapidly",		//获取实时数据的websocket接口
};

//获取调度号列表

RTDModel.getDispatchMum = function (prId, ct) {
	let param = {
		"path": "/dwt/iems/basedata/prvar/get_ddns",
		"data": {
			prId: prId,
			ct: ct
		}
	};
	return Common.post(param).map(function (res) {
		if (res.code == 0) {
			RTDModel.dispatchMum = res.list;
			return true;
		} else {
			return false;
		}
	})
};

//获取配电室信息

RTDModel.getPrById = function (prId) {
	let param = {
		"path": "/dwt/iems/basedata/pr/get_pr_by_id",
		"data": {
			id: prId,
		}
	};
	return Common.post(param);
};

//获取标签列表

RTDModel.getTagList = function (prId, t, ct, ddN) {
	let data;
	if (ddN) {
		data = {
			prId: prId,
			ddN: ddN,
			ct: ct,
			t: t
		}
	} else {
		data = {
			prId: prId,
			t: t
		}
	}
	let param = {
		"path": "/dwt/iems/basedata/prvar/get_pr_vars",
		"data": data
	};

	return Common.post(param);
};
