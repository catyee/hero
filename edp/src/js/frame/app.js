require('../common/guard');
require('../../scss/frame.scss');

import { Common } from '../common/common';
import { ROLES } from '../common/common.enum';
import { UI } from '../common/ui';


let local = {
	page: 1,
	pageSize: 20,
	keyWord: null,
	init: {},
	bind: {},
	initUser: {},
	initView: {},
	searchPowerRoom: {},	//搜索配电室
	renderRowerRoom: {},	//渲染配电室
	getPowerRoomDom: {},	//获取配电室的DOM

	logout: {},			//退出登录
};

$(function () {

	local.init();

});
local.init = function () {
	local.initView();
	local.bind();
	local.initUser();
	local.searchPowerRoom();
	UI.init();

};

//初始化用户信息

local.initUser = function () {

	$('#username').text( Common.realName );
};

//初始化页面的展示样式

local.initView = function () {

	/*设置iframe的高度*/

	$('#main-frame').css('height', $(window).height() - $('#header').height());
	$('#main-frame').css('width', $('body').width() - $('#left').width());
	$('#power-room-con').css('height', $(window).height() - $('#header').height() - $('#left-soso').height());
    if (navigator.userAgent.indexOf('Mac OS X') !== -1) {
        $('#power-room-con').css('marginRight',0);
	}else {
        $('#power-room-con').css('marginRight','-15px');
	}

};

//事件绑定

local.bind = function () {

	let _this = this;
	if(Common.roleId != ROLES.KH || Common.isExperience){
        $("#suggest").css('display','none');
	}else {
        $("#suggest").css('display','block');
	}
	//点击用户反馈按钮
	$("#suggest").on('click',function () {

        $('#main-frame').attr('src', 'suggests.html');
    })

	//绑定退出登录按钮

	$('#logout').click(function () {
		let options = {};
		options.tip = '您确定退出登录吗？';
		options.rightBtnClick = function () {
            local.logout();
        }
        UI.confirm(options);

	});

	//点击修改密码
    //如果是体验账号，隐藏修改密码

    if(Common.isExperience){
        $('#updatePassword').css('display','none')
    }else {
        $('#updatePassword').css('display','block')
    }
	$('#updatePassword').click(function () {
		$('#main-frame').attr('src', 'update-password.html');
	});

	$(window).resize( function () {

		if ( timer ){

			clearTimeout( timer );
		}

		let timer = setTimeout( function () {

			_this.initView()

		}, 300)

	});

	//首页

	$('#toIndex').click(function () {
		$('#main-frame').attr('src', 'index.html');
	});

	//一级菜单 展开和收起

	$('#power-room-con').delegate('.first', 'click', function () {

		if ($(this).hasClass('open')) {
			$('.first').find('.first-arrow').html('&#xe605;');
			$('.second').slideUp(120);
			$('.third').slideUp(120);
			$('.first').removeClass('open');
		} else {
			$(this).addClass('open');
			$('.first').find('.first-arrow').html('&#xe605;');

			$('.second').slideUp(120);
			$('.third').slideUp(120);
			$(this).parent().find('.second').slideDown(120).css('display', 'flex');
			$(this).find('.first-arrow').html('&#xe602;');
		}

		$('#power-room-con .active').removeClass('active');
		$(this).addClass('active');

	});

	//二级菜单

	$('#power-room-con').delegate('.second', 'click', function () {
		if (!$(this).hasClass('active')) {
			$('#power-room-con .active').removeClass('active');
			$('.third').slideUp(120);

			$(this).addClass('active');
			$(this).parent().find('.third').slideDown(120);
		}

	});

	//三级菜单

	$('#power-room-con').delegate('.third', 'click', function () {
		$('#power-room-con .active').removeClass('active');
		$(this).addClass('active');
	});

	/*点击配电室的实时数据*/

	$('#power-room-con').delegate('.real-time-data').click(function (e) {
		if (!($(e.target).hasClass('real-time-data') || $(e.target).parents('.real-time-data').length > 0))return false;
		let prid = $(e.target).parents('.power-room').attr('power-room-id');

		$('#main-frame').attr('src', 'real-time-data.html?prid=' + prid);
	});

	/*点击配电室的历史数据*/

	$('#power-room-con').delegate('.history-data').click(function (e) {
		if (!($(e.target).hasClass('history-data') || $(e.target).parents('.history-data').length > 0))return false;
		let prid = $(e.target).parents('.power-room').attr('power-room-id');

		$('#main-frame').attr('src', 'history-data.html?prid=' + prid);
	});

	/*点击配电室的报警查询*/

	$('#power-room-con').delegate('.alarm-query').click(function (e) {
		if (!($(e.target).hasClass('alarm-query') || $(e.target).parents('.alarm-query').length > 0))return false;
		let prid = $(e.target).parents('.power-room').attr('power-room-id');
		$('#main-frame').attr('src', 'alarm-query.html?prid=' + prid);
	});

	/*点击能耗分析*/

	$('#power-room-con').delegate('.compare-energy').click(function (e) {
		if (!($(e.target).hasClass('compare-energy') || $(e.target).parents('.compare-energy').length > 0))return false;
		let prid = $(e.target).parents('.power-room').attr('power-room-id');
		$('#main-frame').attr('src', 'compare-energy.html?prid=' + prid);
	});

	/*点击能耗分析*/

	$('#power-room-con').delegate('.time-energy').click(function (e) {
		if (!($(e.target).hasClass('time-energy') || $(e.target).parents('.time-energy').length > 0))return false;
		let prid = $(e.target).parents('.power-room').attr('power-room-id');
		$('#main-frame').attr('src', 'time-energy.html?prid=' + prid);
	});

	/*点击配电室的数据报表*/

	$('#power-room-con').delegate('.report').click(function (e) {
		if (!($(e.target).hasClass('report') || $(e.target).parents('.report').length > 0))return false;
		let prid = $(e.target).parents('.power-room').attr('power-room-id');
		$('#main-frame').attr('src', 'report.html?prid=' + prid);
	});

	/*点击配电室的日志查询->巡检日志*/

	$('#power-room-con').delegate('.inspection-logs').click(function (e) {
		if (!($(e.target).hasClass('inspection-logs') || $(e.target).parents('.inspection-logs').length > 0))return false;
		let prid = $(e.target).parents('.power-room').attr('power-room-id');
		$('#main-frame').attr('src', 'inspection-logs.html?prid=' + prid);
	});

	/*点击配电室的日志查询->抢修日志*/

	$('#power-room-con').delegate('.repair-logs').click(function (e) {
		if (!($(e.target).hasClass('repair-logs') || $(e.target).parents('.repair-logs').length > 0))return false;
		let prid = $(e.target).parents('.power-room').attr('power-room-id');
		$('#main-frame').attr('src', 'repair-logs.html?prid=' + prid);
	});

	/*点击配电室的日志查询->抢修日志*/

	$('#power-room-con').delegate('.repair-logs').click(function (e) {
		if (!($(e.target).hasClass('repair-logs') || $(e.target).parents('.repair-logs').length > 0))return false;
		let prid = $(e.target).parents('.power-room').attr('power-room-id');
		$('#main-frame').attr('src', 'repair-logs.html?prid=' + prid);
	});

	/*点击配电室的日志查询->工作票*/

	$('#power-room-con').delegate('.work-tickets').click(function (e) {
		if (!($(e.target).hasClass('work-tickets') || $(e.target).parents('.work-tickets').length > 0))return false;
		let prid = $(e.target).parents('.power-room').attr('power-room-id');
		$('#main-frame').attr('src', 'work-tickets.html?prid=' + prid);
	});

	/*点击配电室的日志查询->操作票*/

	$('#power-room-con').delegate('.operation-tickets').click(function (e) {
		if (!($(e.target).hasClass('operation-tickets') || $(e.target).parents('.operation-tickets').length > 0))return false;
		let prid = $(e.target).parents('.power-room').attr('power-room-id');
		$('#main-frame').attr('src', 'operation-tickets.html?prid=' + prid);
	});

	/*点击一次接线图按钮*/

	$('#power-room-con').delegate('.toYCJXT').click(function (e) {
		if (!($(e.target).hasClass('toYCJXT') || $(e.target).parents('.toYCJXT').length > 0))return false;
		let prId = $(e.target).parents('.power-room').attr('power-room-id');


		if (!Common.isIE()) {

			UI.alert({
				'content' : '请在IE浏览器上打开一次接线图',
				'btn' : '知道了',
				'callback' : function () {
					//alert("haha")
				}
			})
			return false;
		}
		$('#main-frame').attr('src', 'jkviewer.html?prid=' + prId);

	});

	//搜索配电室

	$('#search').click(function () {
		local.page = 1;
		$('.power-room').remove();
		$('#load-more-power-room').css('display', 'block');
		local.searchPowerRoom();
	});

	/*按回车键  自动搜索*/

	$('#keyWord').keyup(function (e) {
		if (e.keyCode == 13) {
			$('#search').click();
		}
	});

	/*点击 加载更多按钮*/

	$('#load-more-power-room').click(function () {
		local.page++;
		local.searchPowerRoom();
	});
};

//搜索配电室

local.searchPowerRoom = function () {
	let keyWord = $.trim($('#keyWord').val());
	let param = {
		'path': '/dwt/iems/basedata/pr/page_get_pr_list',
		'data': {
			currentPage: this.page,
			pageSize: this.pageSize,
			keyWord: keyWord,
			userId: Common.userId,
			roleId: Common.roleId
		}
	};

	Common.post(param).subscribe(function (res) {
		if (res.code == '0') {
			local.renderRowerRoom(res.pageResult);
		} else {

			//console.error(res);

		}
	});
};

//渲染配电室列表

local.renderRowerRoom = function (res) {
	let list = res.records;
	let length = list.length;
	for (let i = 0; i < length; i++) {
		$('#load-more-power-room').before(local.getPowerRoomDom(list[i]));
	}

	//如果返回的当前页和最大页数相等  隐藏掉加载更多按钮

	if (res.currentPage == res.totalPages || res.totalCount == 0) {
		$('#load-more-power-room').css('display', 'none');
	}
};

//获取配电室DOM

local.getPowerRoomDom = function (item) {
	let dom = '';
	dom += '<div class="power-room" power-room-id="' + item.id + '">';
	dom += '<div class="first">';
	dom += '<div style="display:flex;align-items:center;padding:0 0.8rem;">';
	dom += '<i class="iconfont power-room-icon">&#xe606;</i>&nbsp;';
	dom += '<div class="noSpill">' + (Common.isExperience ? Common.experiencePrName : item.prName) + '</div>';
	dom += '</div>';
	dom += '<i class="first-arrow iconfont">&#xe605;</i>';
	dom += '</div>';

	dom += '<div>';
	dom += '<div class="second real-time-data" power-room-id="' + item.id + '">';
	dom += '<i class="iconfont second-arrow">&#xe607;</i>';
	dom += '<div class="second-title">实时数据</div>';
	dom += '</div>';
	dom += '</div>';

	dom += '<div>';
	dom += '<div class="second history-data" power-room-id="' + item.id + '">';
	dom += '<i class="iconfont second-arrow">&#xe607;</i>';
	dom += '<div class="second-title">历史数据</div>';
	dom += '</div>';
	dom += '</div>';


	dom += '<div>';
	dom += '<div class="second alarm-query"  power-room-id="' + item.id + '">';
	dom += '<i class="iconfont second-arrow">&#xe607;</i>';
	dom += '<div class="second-title">报警查询</div>';
	dom += '</div>';
	dom += '</div>';

	dom += '<div>';
	dom += '<div  class="second"  power-room-id="' + item.id + '">';
	dom += '<i class="iconfont second-arrow">&#xe607;</i>';
	dom += '<div class="second-title">能耗分析</div>';
	dom += '</div>';
	dom += '<div  class="third compare-energy"  power-room-id="' + item.id + '">对比分析</div>';
	dom += '<div  class="third time-energy"  power-room-id="' + item.id + '">分时分析</div>';
	dom += '</div>';

	dom += '<div>';
	dom += '<div class="second report">';
	dom += '<i class="iconfont second-arrow">&#xe607;</i>';
	dom += '<div class="second-title">报表统计</div>';
	dom += '</div>';
	dom += '</div>';

	dom += '<div>';
	dom += '<div class="second"  power-room-id="' + item.id + '">';
	dom += '<i class="iconfont second-arrow">&#xe607;</i>';
	dom += '<div class="second-title">日志查询</div>';
	dom += '</div>';
	dom += '<div  class="third inspection-logs"  power-room-id="' + item.id + '">巡检日志</div>';
	dom += '<div  class="third repair-logs"  power-room-id="' + item.id + '">抢修日志</div>';
	dom += '<div  class="third work-tickets"  power-room-id="' + item.id + '">工作票</div>';
	dom += '<div  class="third operation-tickets"  power-room-id="' + item.id + '">操作票</div>';
	dom += '</div>';

	dom += '<div>';
	dom += '<div class="second "power-room-id="' + item.id + '">';
	dom += '<i class="iconfont second-arrow">&#xe607;</i>';
	dom += '<div class="second-title toYCJXT">一次接线图</div>';
	dom += '</div>';
	dom += '</div>';

	dom += '</div>';
	return dom;
};

//退出登录

local.logout = function () {
	$.cookie('edp_user_name', null);
	$.cookie('edp_real_name', null);
	$.cookie('edp_user_head', null);
	$.cookie('edp_user_id', null);
	$.cookie('edp_role_id', null);
	$.cookie('edp_is_experience', null);
	window.sessionStorage.removeItem('edp_privilege');
	window.location.href = 'login.html';
}

