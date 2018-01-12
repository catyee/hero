
/**
 * 公用部分 数据模型
 * 使用前必须引入
 *        moni-commin
 *        jquery
 *        jquery.cookie
 */

import { moni } from  './common';

var commonModel = {
	'userName': $.cookie('iems_user_name'), //账号
	'realName': $.cookie('iems_real_name'), //真实姓名
	'userHead': $.cookie('iems_user_head'),	//头像
	'userId': $.cookie('iems_user_id'),   //用户id
	'roleId': $.cookie('iems_role_id'),   //角色id
	'privilege': JSON.parse(decodeURI(window.sessionStorage.getItem('iems_privilege')))  //权限列表
};



commonModel.CONSTANT = {};

/***
 * 网络请求
 * @param param
 *        param.path    借口路径
 *        param.data    json格式的数据
 *        param.success    成功的回调函数
 *        param.error        失败的回调函数
 *        param.async        是否同步
 */

commonModel.post = function (param){
	var json = {};
	if (typeof param.path != 'undefined') {
		json.url = moni.baseUrl + param.path;
	} else {

		//没有制定接口路径就直接返回

		return Rx.Observable.create(function (observer) {
			observer.next({
				'code': '404',
				'msg': '接口路径不正确'
			});
		});
	}

	//请求参数 可以不传

	if (typeof param.data != 'undefined') {
		json.body = JSON.stringify(param.data);
	}

	//是否同步

	if (typeof param.async != 'undefined') {
		json.async = param.async;
	} else {
		json.async = true;
	}

	//数据传输方式

	if (typeof param.method != 'undefined') {
		json.method = param.method;
	} else {
		json.method = 'POST';
	}

	return Rx.Observable.ajax(json).map(function (res) {
		if (res.status == 200) {
			var response = res.response;
			response.get = function (attributes, undefinedRet) {
				attributes = attributes.replace(/\[/g, '.[').replace(/["|']/g, '');
				attributes = attributes.split('.');
				var length = attributes.length;

				var tmp = this;
				for (var i = 0; i < length; i++) {

					if (/^\[(.*)\]$/.test(attributes[i])) {
						var index = RegExp.$1;
						tmp = tmp[index];
					} else {
						tmp = tmp[attributes[i]];
					}

					if (tmp && i == length - 1) {
						return tmp;
					} else if (!tmp) {
						return undefinedRet;
					}

				}
			};
			return res.response;
		}
	});
};

/***
 * 上传文件
 * @param file 文件对象
 * @param from 1、配电室  2、操作票  3、工作票、
 * @param type 1、文件   2、图片
 */

commonModel.CONSTANT.UPLOAD = {
	FROM_PR : 1,
	FROM_OPER_RICKET : 2,
	FROM_WORK_TICKET : 3,
	TYPE_FILE 	: 1,
	TYPE_IMG	: 2
}

commonModel.uploadFile = function (file, from, type) {
	var form = new FormData();

	var fileName = 'img.' + file.type.split('/')[1];

	form.append('file', file, fileName);
	form.append('from', from);
	form.append('type', type);

	var param = {
		url: moni.baseUrl + '/file_upload.do',
		method: 'POST',
		contentType: 'application/json;charset=utf-8',
		body: form
	};
	return Rx.Observable.ajax(param).map(function (res) {
		if (res.status == 200) {
			return res.response;
		}
	});
};


/***
 * 直接派单
 * @param content 抢修单内容
 * @param powerRoomId    配电室id
 * @param callback    回调函数
 */

commonModel.directSendOrder = function (content, powerRoomId) {
	var param = {
		'path': '/dwt/iems/bussiness/qx/add_or_update_qx_order',
		'data': {
			'prId': powerRoomId,
			'problemDesc': content,
			'userId': commonModel.userId,
			'roleId': commonModel.roleId
		}
	};

	return commonModel.post(param);
};

/***
 * 获取系统设置中配电室等级的信息
 * @param callback 获取成功的回掉函数
 */

commonModel.getSysPrGrade = function (callback) {
	var param = {
		'path': '/rt/ap/v1/admin/get_all_pr_grade',
		'success': callback
	};
	commonModel.post(param);

};

/***
 * 获取所有抢修组的信息
 * @param callback 获取成功的回调函数
 */

commonModel.getAllRepairTeamStatus = function (callback) {
	var param = {
		'path': '/rt/ap/v1/repdispatch/get_all_repair_team_status',
		'success': callback
	};
	this.post(param);
};

/***
 * 获取所有配电室
 * @param callback
 */

commonModel.getAllPowerRoom = function (keyWord) {
	var param = {
		'path': '/dwt/iems/basedata/pr/get_pr_list',
		'data': {
			'userId': this.userId,
			'roleId': this.roleId,
			'keyWord': keyWord
		}
	};
	return this.post(param);
};

/***
 * 获取客户的所有配电室
 * @param cusId
 * @returns {{code: string, msg: string}}
 */

commonModel.getAllPROfCustomer = function (cusId) {
	var param = {
		'path': '/dwt/iems/basedata/pr/get_pr_list',
		'data': {
			'cusId': cusId
		}
	};
	return this.post(param);
};

/***
 * 获取所有客户
 * @returns {{code: string, msg: string}}
 */

commonModel.getAllCustomer = function () {
	var userId = null;
	var roleId = null;
	if (commonModel.roleId != moni.ROLES.ZBZ) {
		userId = commonModel.userId;
		roleId = commonModel.roleId;
	}
	var param = {
		path: '/dwt/iems/basedata/cus/get_customer_list',
		data: {
			userId: userId,
			roleId: roleId
		}
	};

	return this.post(param);

};

/***
 * 获取一个配电室
 */

commonModel.getPowerRoomById = function (powerRoomId) {
	var param = {
		'path': '/dwt/iems/basedata/pr/get_pr_by_id',
		'data': {
			'id': powerRoomId
		}
	};

	return commonModel.post(param);

};

/***
 * 从url上获取一个参数
 * @param name
 * @returns {*}
 */

commonModel.getParameter = function (name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
	var r = window.location.search.substr(1).match(reg);
	if (r != null)return RegExp.$2;
	return null;
};

exports.commonModel = commonModel;

