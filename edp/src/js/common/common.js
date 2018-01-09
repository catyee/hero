import { POSITIONCLASSIFY } from './common.enum';

export var Common = {
	'userName': $.cookie('edp_user_name'),	//账号
	'realName': $.cookie('edp_real_name'),	//真实姓名
	'userHead': $.cookie('edp_user_head'),	//头像
	'userId': $.cookie('edp_user_id'),		//用户id
	'roleId': $.cookie('edp_role_id'),		//角色id
	'privilege': JSON.parse(decodeURI(window.localStorage.getItem('edp_privilege'))),	//权限列表
};


/****
 * 如果是客户体验账号
 * 把名字改成 “某500强D公司”
 * 把配电室名称改为 “某500强D公司配电室”
 */

var isExperience = $.cookie('edp_is_experience');
var experienceName = $.cookie('edp_experience_name');
var replaceStr = $.cookie('edp_experience_str');  //需要被替换的
if (isExperience && experienceName) {
	Common.isExperience = true;
	Common.replaceStr = replaceStr.split(',');
	Common.realName = experienceName;
	Common.experiencePrName = Common.realName + '配电室';
}

/***
 * 平台的用户角色
 */

Common.ROLES = {
	'KH': -1,	//客户
	'QXBZ': 1,	//抢修班长
	'ZTZ': 2,	//巡检组团长
	'AQY': 3,	//安全员
	'XJZZ': 4,	//巡检组长
	'QXZZ': 5,	//抢修组长
	'ZBZ': 6,	//值班长
	'ERP_ADMIN': 7,	//ERP管理员
	'WLY': 8,	//物料员
	'IEMS_ADMIN': 9	//IEMS管理员
};

Common.baseUrl = "http://iems.dianwutong.com/"

/***
 * 网络请求
 * @param param
 *        param.path    接口路径
 *        param.data    json格式的数据
 *        param.success    成功的回调函数
 *        param.error        失败的回调函数
 *        param.async        是否同步
 */

Common.post = function (param) {
	param = param == null ? {} : param;
	param['data'].userId = this.userId;
	param['data'].roleId = this.roleId;
	var json = {};
	if (typeof param.path != 'undefined') {
		json.url = this.baseUrl + param.path;
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

			return res.response;
		} else {
			console.error(res.status);
		}

	});
};


Common.post1 = function (param) {
	param = param == null ? {} : param;
	var json = {};
	if (typeof param.path != 'undefined') {
		json.url = this.baseUrl + param.path;
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

			return res.response;
		} else {
			console.error(res.status);
		}

	});
};

/***
 * 获取所有配电室 不分页
 */

Common.getAllPowerRoom = function (userId, roleId) {
	var param = {
		path: '/dwt/iems/basedata/pr/get_pr_list',
		data: {}
	};
	if (roleId == Common.ROLES.KH) {
		param.data.cusId = userId;
	} else {
		param.data.userId = userId ? userId : this.userId;
		param.data.roleId = roleId ? roleId : this.roleId;
	}
	return this.post(param);
};

/*获取配电室基本信息*/

Common.getPowerRoomBaseInfo = function (powerRoomId) {
	var param = {
		'path': '/dwt/iems/basedata/pr/get_pr_by_id',
		'data': {
			'id': powerRoomId
		}
	};

	return this.post(param);
};


/***
 * 格式化数据
 * 如果数据为null 默认为0
 * 如果不为0 取小数点后2位
 */

Common.formatData = function (number, fixed) {
	if (!number) {
		return 0;
	}
	if (typeof fixed == 'undefined') {
		fixed = 2;
	}
	number = parseFloat(number);
	return number.toFixed(fixed);

};

/***
 * 空记录提示
 * @param dom dom的id
 * @param tips 提示的内容
 */

Common.emptyTips = function (dom, tips) {
	var html = '';
	html += '<div style="width:400px;margin:100px auto 0 auto;" id="empty-tip">';
	html += '<div style="display:inline-block;">';
	html += '<img src="' + this.baseUrl + '/images/empty.png" width="100px">';
	html += '</div>';
	html += '<div style="display:inline-block;font-size:18px;">';
	html += '<span>' + tips + '</span>';
	html += '</div>';
	html += '</div>';

	$('#' + dom).append(html);
};

/***
 * 对字符串加密
 * @param str
 * @returns {string}
 */

Common.encodeString = function (str) {
	var length = str.length;
	var code = '';

	for (var i = 0; i < length; i++) {
		code += String.fromCharCode(str.charCodeAt(i) + (i - length));
	}
	return code;
};

/***
 * encodeString的逆序操作
 * @param code
 * @returns {string}
 */

Common.decodeString = function (code) {
	var length = code.length;
	var str = '';

	for (var i = 0; i < length; i++) {
		str += String.fromCharCode(code.charCodeAt(i) - (i - length));
	}
	return str;
};

/***
 * 序列化网页的状态
 * @param ob
 * @returns {string}
 */

Common.pushState = function (ob) {

	window.sessionStorage.setItem(location.pathname, JSON.stringify(ob));

};

/***
 * 反序列化网页的状态
 * @param ob
 * @returns {string}
 */

Common.popState = function () {
	var state = window.sessionStorage.getItem(location.pathname);
	if (!state) {

		return {};

	}
	window.sessionStorage.removeItem(location.pathname);
	return JSON.parse(state);

};

/***
 * 从url上获取一个参数
 * @param name
 * @returns {*}
 */

Common.getParameter = function (name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
	var r = window.location.search.substr(1).match(reg);
	if (r != null)return RegExp.$2;
	return null;
};


/***
 * 判断是否是ie
 * @returns {*}
 */

Common.isIE = function () {

	//使用userAgent去判断，ie5-ie11有

	var UA = navigator.userAgent;
	if (/Trident/i.test(UA)) {
		if (/MSIE (\d{1,})/i.test(UA)) {

			return RegExp.$1;

		} else if (/rv:(\d{1,})/i.test(UA)) {

			return RegExp.$1;

		} else {

			return false;

		}
	} else {
		return false;
	}
};


// 获取配电室的位置分类

Common.getPrPositionClassify = function (prId, onlyEenergy) {
	var param = {
		path: '/dwt/iems/basedata/prvar/get_catalog_type',
		data: {
			prId: prId,
			pq: onlyEenergy ? '%Ep' : null
		}
	};
	return Rx.Observable.create(function (observer) {

		Common.post(param).subscribe(function (data) {

			let positions = POSITIONCLASSIFY;

			if (data.code == '0') {

				let list = [];
				for (var i = 0; i < data.list.length; i++) {

					list.push(positions[data.list[i]]);
				}

				data.list = list;

			}

			observer.next(data);

		});
	});

};



Common.uploadFile = function (file, from, type) {
	var form = new FormData();

	var fileName = 'img.' + file.type.split('/')[1];

	form.append('file', file, fileName);
	form.append('from', from);
	form.append('type', type);

	console.log( file.type );

	var param = {
		url: this.baseUrl + '/file_upload.do',
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


