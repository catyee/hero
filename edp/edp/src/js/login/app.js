require('../../scss/login.scss');


import { moni} from '../common/common';
import { commonModel } from '../common/common-model';


/**
 * 登录页控制器
 */

var loginCtrl = {
	userInfo        : {},   //记录服务端返回的原始数据
	IEMSRoles       : [],   //保存能登录IEMS系统的角色

	init	        : {},	//初始化页面
	bind	        : {},	//事件绑定
	checkIn         : {},   //用户登录
	loginOut        : {},   //退出登录
	initUserInfo    : {},   //初始化用户信息
	writeCookie     : {},   //将用户信息写入cookie
};

$(function(){
	loginCtrl.init();
});

loginCtrl.init = function(){
	this.bind();

	//如果已经记住密码 获取用户名和密码  赋值到控件上

	var code = $.cookie('_IEMS_REM');
	if(code){
		var str = moni.decodeString(code);
		var pair = str.split(',');
		$('#moni-username').val(pair[0]);
		$('#moni-password').val(pair[1]);
	}
};

/****
 * 事件绑定
 */

loginCtrl.bind = function(){

	/***
     * 点击登录按钮
     */

	$('#check-in-btn').click(function(){
		var account = $.trim($('#moni-username').val());
		var password = $('#moni-password').val();
		if(!account || !password){
			return false;
		}
		loginCtrl.checkIn(account, password);
		return false;
	});

	//用户名或密码控件接受到回车消息

	$('#moni-account,#moni-password').keyup(function(e){
		if(e.keyCode == 13){
			$('#check-in-btn').click();
		}
	});

	//如果账号绑定了多个角色 选择一个角色登录

	$('#role-selector').delegate('.role', 'click', function(){
		var index = $(this).data('index');
		loginCtrl.writeCookie(index);
	});
};

/***
 * 用户登录
 * @param account 用户名
 * @param password 密码
 */

loginCtrl.checkIn = function(account, password){
	$('#account-tips').text('');
	$('#password-tips').text('');
	var data = {
		username : account,
		password : password
	};

	var param = {};
	param.data = data;
	param.path = '/dwt/privilege/user_login';

	commonModel.post(param).subscribe(function(res){
		if(res.code == '0'){

			//将原始信息保存到全局变量

			loginCtrl.userInfo = res.entity;

			//过滤出能在IEMS登录的角色

			var roles = res.entity.roles;
			var length = roles.length;

			loginCtrl.IEMSRoles = [];

			for(var i=0; i < length; i++){
				if(roles[i].privilegeMap.IEMS){
					loginCtrl.IEMSRoles.push(roles[i]);
				}
			}

			//如果没有角色 提示不能登录
			//如果只有1个角色 直接登录
			//如果绑定多个角色 展示到页面 让用户选择

			if(loginCtrl.IEMSRoles.length == 0){
				$('#username-tips').text('该账号没有登录权限');
			}else if(loginCtrl.IEMSRoles.length == 1){
				loginCtrl.writeCookie(0);
			}else{
				var html = '该账号绑定了多个角色，请选择一个角色登录：<br />';
				length = loginCtrl.IEMSRoles.length;
				for(var i = 0; i < length; i++){
					html += '<span class="pointer role" data-index="'+ i +'">'+ loginCtrl.IEMSRoles[i].name +'</span> &nbsp;';
				}
				$('#role-selector').html(html);
			}

			//记住密码 将用户名和密码用“,”拼接 加密之后存入cookie

			var isRemember = $('#moni-remember').is(':checked');
			if(isRemember){
				var code = moni.encodeString(account+','+password);
				$.cookie('_IEMS_REM',code, {expires:15});
			}

		}else {
			$('#password-tips').text('用户名或密码不正确');
		}
	});

};

/**
 * 将用户信息写入cookie
 * @param index IEMSRoles中的索引
 */

loginCtrl.writeCookie = function(index){
	$.cookie('iems_user_name', loginCtrl.userInfo.username);
	$.cookie('iems_real_name', loginCtrl.userInfo.realName);
	$.cookie('iems_user_head', loginCtrl.userInfo.prefix + loginCtrl.userInfo.usrHead);
	$.cookie('iems_user_id', loginCtrl.userInfo.id);
	$.cookie('iems_role_id', loginCtrl.IEMSRoles[index].id);
	window.sessionStorage.setItem('iems_privilege', JSON.stringify(loginCtrl.IEMSRoles[index].privilegeMap));

	this.judgePageByprivilege(loginCtrl.IEMSRoles[index].privilegeMap);
};

/**
 * 根据账户拥有的权限，判断登录后首次进入的页面
 */
loginCtrl.judgePageByprivilege = function(privilege) {
	// 配电室列表
	if(privilege["IEMS_PR_READ"]){
		window.location.href= 'power-room-list.html';
		return;
	}
	// 正在解决
	if(privilege["IEMS_ORDER_READ"]){
		window.location.href= 'repairing-list.html';
		return;
	}
	// 正在报警
	if(privilege["IEMS_ALARM_READ"]){
		window.location.href= 'system-warning.html';
		return;
	}

	// 巡检问题
	if(privilege["IEMS_INS_BUG"]){
		window.location.href= 'inspection-bug-list.html';
		return;
	}

	// 抢修日志

	if(privilege["IEMS_REP_LOG_READ"]){
		window.location.href= 'repair-order-list.html';
		return;
	}

	// 巡检日志 

	if(privilege["IEMS_INS_LOG_READ"]){
		window.location.href= 'inspection-log-list.html';
		return;
	}

	// 操作票

	if(privilege["IEMS_OPER_TICKET_READ"]){
		window.location.href= 'operation-order-list.html';
		return;
	}
 
	// 工作票
	if(privilege["IEMS_WORK_TICKET_READ"]){
		window.location.href= 'work-order-list.html';
		return;
	}

	// 巡检安排
	if(privilege["IEMS_INS_ARRANGE"]){
		window.location.href= 'inspection-arrange-list.html';
		return;
	}
	// 报警监控
	if(privilege["IEMS_ALARM_MONITOR_READ"]){
		window.location.href= 'alarm-monitor.html';
		return;
	}

}


/***
 * 初始化用户信息
 */

loginCtrl.initUserInfo = function(){
	if(/login/.test(window.location.pathname)){
		return false;
	}
	if($.cookie('roleId') == null || $.cookie('roleId') == 'undefined'){
		window.location.href = 'login.html';
		return false;
	}

	$('#user-name').text($.cookie('account').length>8?$.cookie('account').slice(0,8)+'...':$.cookie('account'));
};