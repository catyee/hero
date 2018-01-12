/**
 * 公用的controller
 * 依赖文件 moni-common /model/moni-common-model
 */
import { commonModel } from './common-model'

var commonCtrl = {
	init: {},		//初始化
	initUser: {},	//初始化页眉的用户信息
	bind: {},		//事件绑定
};

$(function () {
	commonCtrl.init();

});

/***
 * 初始化
 */

commonCtrl.init = function () {
	commonCtrl.bind();
	commonCtrl.initUser();
};

/***
 * 事件绑定
 */

commonCtrl.bind = function () {

	/**
     *直接派单
     */

	$('#direct-send-order').click(function () {

		commonModel.getAllPowerRoom().subscribe(function (result) {

			$('#modal-direct-send-order-power-room').empty();
			$('#modal-direct-send-order-power-room').append('<option value="-1">请选择配电室</option>');
			for (var i = 0; i < result.list.length; i++) {
				$('#modal-direct-send-order-power-room').append('<option value="' + result.list[i].id + '">' + result.list[i].prName + '</option>');
			}
			$('#direct-send-order-modal').modal('show');

		});

	});

	/**
     * 确认派单
     */

	$('#direct-send-order-btn').click(function () {
		var powerRoomId = $('#modal-direct-send-order-power-room').val();
		var content = $.trim($('#modal-direct-send-order-desc').val());
		commonModel.directSendOrder(content, powerRoomId).subscribe(function (result) {

			window.location.href = './order-detail.do?od=' + result.id;
		});
	});

	//确认退出系统

	$('#logout-button').click(function () {
		$('#logout-confirm').modal();
	});

	$('#logout-confirm-button').click(function () {
		$('#logout-confirm').modal('hide');
		commonCtrl.loginOut();
	});

	/***
     * search-select
     * 获得焦点显示下来选框
     * 失去焦点 隐藏下拉选框
     * 点击选项 将选项的值显示到input
     * 点击 x 清空input
     */

	$('.search-select input').click(function () {
		$('.search-select .options-panel').css('display', 'block');
		$(this).val('');
	});

	$('.search-select input').blur(function () {
		setTimeout(function () {
			$('.search-select .options-panel').slideUp(100);
		}, 100);

	});
	$('body').delegate('.option', 'click', function () {
		var content = $(this).text();
		$(this).parent().parent().find('input').val(content);
	});

	$('.search-select .remove').click(function () {
		$(this).prev('input').val('');
	});

	//!search-select

};

commonCtrl.initUser = function () {
	if (/login/.test(window.location.pathname)) {
		return false;
	}
	$('#user-name').text(commonModel.realName.length > 8 ? commonModel.realName.slice(0, 8) + '...' : commonModel.realName);
};

/***
 * 退出系统
 */

commonCtrl.loginOut = function () {
	$.cookie('iems_user_name', null);
	$.cookie('iems_real_name', null);
	$.cookie('iems_user_head', null);
	$.cookie('iems_user_id', null);
	$.cookie('iems_role_id', null);
	window.sessionStorage.removeItem('iems_privilege');
	window.location.href = './login.do';

};

exports.commonCtrl = commonCtrl;