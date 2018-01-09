import {Common} from '../common/common';

export var helper = {

	isExperience: false,

	checkIn: {},
	experience: {}

};

/***
 * 身份认证
 * @param username
 * @param password
 * @returns {Promise}
 */

helper.check = function (data) {

	let param = {};
	param.data = data;
	param.path = '/dwt/privilege/user_login';

	return new Promise(function (resolve, reject) {

		Common.post(param).subscribe(function (res) {

			if (res.code == '0') {

				let user = res.entity;

				//过滤出能在EDP登录的角色

				let roles = user.roles;
				let length = roles.length;

				let EDPRoles = [];

				for (let i = 0; i < length; i++) {

					if (roles[i].privilegeMap.EDP) {

						EDPRoles.push(roles[i]);

					}
				}

				user.roles = EDPRoles;

				resolve(user);

			} else {

				reject(res.code);

			}
		});

	});

};


/***
 * 身份认证
 * @param username
 * @param password
 * @returns {Promise}
 */

helper.checkIn = function (username, password) {

	this.isExperience = false;

	let data = {
		username: username,
		password: password
	};

	return this.check(data);
};


/***
 * 客户体验
 * @returns {Promise}
 */

helper.experience = function () {
	this.isExperience = true;

	let data = {

		'loginFlag': 1

	};

	return this.check(data);
};

/**
 * 如果是体验账号，获取体验账号要替换的内容
 */

helper.gerExperienceReplace = function () {
	let param = {};
	param.path = '/dwt/privilege/replace_str';
	param.data = {};
	return new Promise(function (resolve, reject) {

		Common.post(param).subscribe(function (res) {

			if (res.code == '0') {

				//如果是客户体验账号，替换掉客户及配电室名字

				resolve(res);
				helper.realName = res.replaceTo;
				helper.replaceStr = res.str;
			} else {

				reject(res.code);

			}
		});

	});
};