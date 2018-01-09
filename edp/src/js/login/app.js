
require( '../../scss/login.scss' );

import { helper } from './helper';
import { Common } from '../common/common';


let app = {
	user : null,

	init: {},
	bind: {},
	login: {},	//登陆
	experience: {},	//客户体验
	checkInSuccess : {},


};

$(function () {

	app.init();

});


app.init = function () {
	app.bind();

	//如果已经记住密码 获取用户名和密码  赋值到控件上

	let code = $.cookie('_EDP_REM');

	if (code) {

		$('#password').attr('type', 'password');

		let str = Common.decodeString(code);
		let pair = str.split(',');
		$('#username').val(pair[0]);
		$('#password').val(pair[1]);

		$('#check-in-btn').addClass('able');


	}
};

//事件绑定

app.bind = function () {

	let _this = app;

	//
	//点击忘记密码按钮

	$('#forget').on('click',function () {
		window.location.href = 'verify-phone.html';
	});

	$('#check-in-btn').click(function () {

		$('#username-tips').text('');
		$('#password-tips').text('');

		let username = $.trim($('#username').val());
		let password = $('#password').val();

		if (username.length == 0) {

			$('#tips-content').text( '请填写用户名' );
			$('#tips').show(500);
			return false;

		}else if ( password == 0 ){

			$('#tips-content').text( '请填写密码' );
			$('#tips').show(500);
			return false;

		}

		$('#tips').hide();

		$('#role-selector').hide();

		_this.login(username, password);

	});

	//监听“回车键”

	$('#password,#username').keyup(function (e) {

		if (e.keyCode == 13) {
			$('#check-in-btn').click();
		}

		let username = $.trim( $('#username').val() );
		let password = $.trim( $('#password').val() );

		if ( username.length > 0 && password.length > 0){

			$('#check-in-btn').addClass( 'able' );

		}else{

			$('#check-in-btn').removeClass( 'able' );
		}


	});

	//如果账号绑定了多个角色 选择一个角色登录

	$('#role-selector').delegate('.role', 'click', function () {

		let index = $(this).data('index');

		_this.writeCookie( _this.user.roles[index] );

	});

	//点击记住密码按钮

	$('.remember').click( function () {

		$(this).toggleClass( 'checked' );

	});

	//客户体验

	$('#experience').click(function(){

		_this.getExperienceReplace();

	});

};

//登录

app.login = function (username, password) {

	//登陆验证

	helper.checkIn( username, password )
		.then( ( user ) => {

			this.checkInSuccess( user );

			//记住密码 将用户名和密码用“,”拼接 加密之后存入cookie

			let isRemember = ($('.remember.checked').length > 0);

			if (isRemember) {

				let code = Common.encodeString( username + ',' + password);
				$.cookie('_EDP_REM', code, {expires: 15});

			}

		} )
		.catch( () => {

			$('#tips-content').text('用户名或密码不正确');
			$('#tips').show(500);

		} );

};

//客户体验

app.experience = function () {
	helper.experience().then( user => {
		app.checkInSuccess( user );
	} );
};
app.getExperienceReplace = function () {

	//获取体验账号要替换的内容

	helper.gerExperienceReplace().then(function () {
		app.experience();
	});
};


//验证成功

app.checkInSuccess = function ( user ) {

	this.user = user;
	let roles = user.roles;

	//如果没有角色 提示不能登录
	//如果只有1个角色 直接登录
	//如果绑定多个角色 展示到页面 让用户选择

	if (roles.length == 0) {

		$('#username-tips').text('该账号没有登录权限');

	} else if (roles.length == 1) {

		app.writeCookie( roles[0] );

	} else {

		let html = '<div class="color-danger">请选择一个角色登录系统：</div><div class="height18"></div> ';
		let length = roles.length;
		for (let i = 0; i < length; i++) {

			html += '<span class="pointer role" data-index="' + i + '">' + roles[i].name + '</span>';

		}

		$('#roles').html(html);

		$('#role-selector').slideDown(500);

	}

};

//将登陆信息写入cookie

app.writeCookie = function ( role ) {

	let user = this.user;

	$.cookie('edp_user_name', user.username);
	$.cookie('edp_real_name', user.realName);
	$.cookie('edp_user_head', user.prefix + user.usrHead);
	$.cookie('edp_user_id', user.id);
	$.cookie('edp_role_id', role.id);

	if ( helper.isExperience ){
		$.cookie('edp_is_experience', 1);
		$.cookie('edp_experience_name', helper.realName);
		$.cookie('edp_experience_str', helper.replaceStr);

	}

	window.localStorage.setItem('edp_privilege', JSON.stringify(role.privilegeMap));

	//避免网页记住密码

	$('#password').val('');
	$('#password').attr('type', 'text');

	window.location.href = 'frame.html';

};

