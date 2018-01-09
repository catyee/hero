
import { Common } from '../common/common';

export var helper = {

	checkIn : {},
	experience : {}

};

/***
 * 获取短信验证码
 * @param mobile
 * @returns {Promise}
 */

helper.getCode = function (mobile) {
	let param = {};
	param.data = {
		mobile:mobile
	};
	param.path = '/dwt/privilege/get_sms_verify_code';
    
	return new Promise(function (resolve,reject) {
		Common.post(param).subscribe(function (res) {
			if(res.code == '0'){
				resolve(res);
			}else {
				reject(res.code);
			}
		});
	});
};

/**
 * 验证手机号和验证码是否正确
 */

helper.verifyPhone = function (mobile,sms) {
	let param = {};
	param.data = {
		mobile:mobile,
		sms:sms
	};
	param.path = '/dwt/app/app/verify_mobile_and_sms_code';
	return new Promise(function (resolve,reject) {
		Common.post(param).subscribe(function (res) {

			if(res.code == '0'){
				resolve(res);
			}else {
				reject(res.code);
			}
		});
	});
};