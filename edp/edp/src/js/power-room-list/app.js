require('../../scss/pr-list.scss');

import { moni} from '../common/common';
import { commonModel } from '../common/common-model';
import { commonCtrl } from '../common/common-controller';
import { prListModel } from './power-room-list-model';

 require('../common/system-warning-service.js');


let prListCtrl = {
	init		: {},			//初始化
	bind		: {},			//事件绑定
	search		: {},			//搜索配电室
	render		: {},			//渲染页面
	renderPrList: {},           //渲染配电室列表
	getPrDom	: {},			//生成配电室的DOM

	renderMainTask : {},        //获取今日任务
};

$(function(){
	prListCtrl.init();
});

//初始化页面

prListCtrl.init = function(){
	prListCtrl.bind();
	prListCtrl.search();
	prListCtrl.render();
};

//事件绑定

prListCtrl.bind = function(){

	//选择客户

	$('#power-room-customer-select').change(function(){
		$('#power-room-list-con').empty();
		$('#power-room-list-pagination').attr('page','1');
		prListCtrl.render();
	});

	//搜索配电室

	$('#search-power-room-btn').click(function(){
		$('#power-room-list-con').empty();
		prListModel.keyWord = $('#power-room-search-key').val();
		prListModel.page = 1;
		prListCtrl.search();
	});

	//搜索配电室input 按回车键时 搜索配电室

	$('#power-room-search-key').keyup(function(e){
		if(e.keyCode == '13'){
			$('#search-power-room-btn').click();
		}
	});


	//下拉加载更多配电室

	var windowHeight = $(window).height();
	$(window).scroll( function() {
		var bodyHeight   = $('body').height();//获取body高
		if(windowHeight+$(window).scrollTop()>(bodyHeight-10)){
			if($('#power-room-list-pagination').attr('page') == 'maxPage'){
				return false;
			}
			prListCtrl.render();
		}
	});

	//点击配电室跳转

	$('#power-room-list-con').delegate('.power-room','click',function(){
		var powerRoomId = $(this).attr('power-room-id');
		window.location.href = 'pr-metarial.html?prid='+powerRoomId;
	});

	//翻页

	$('#pagination').delegate('li', 'click', function(){
		prListModel.page = $(this).attr('page');
		prListCtrl.search();
	});
};

//搜索配电室

prListCtrl.search = function(){
	prListModel.getPrList().subscribe(function (res) {
		prListCtrl.renderPrList();
	});
};

//渲染页面

prListCtrl.render = function(){
	prListCtrl.renderMainTask();
};

//渲染配电室列表

prListCtrl.renderPrList = function () {
	$('#power-room-list-con').empty();
	if(prListModel.prCnt == 0){
		moni.emptyTips('搜索不到配电室','power-room-list-con');
		$('#result-count').parent().css('display','none');
	}

	$('#result-count').text(prListModel.prCnt);
	$('#result-count').parent().css('display','block');

	var length = prListModel.prList.length;
	var prList = prListModel.prList;
	for(var i = 0; i < length; i++){
		$('#power-room-list-con').append(prListCtrl.getPrDom(prList[i]));
	}

	moni.disPages('pagination', prListModel.totalPage, prListModel.page);
};

//构建配电室DOM

prListCtrl.getPrDom = function(item) {

	var address = (item.province?item.province:' ');
	address += (item.city?item.city:' ');
	address += (item.area?item.area:' ');
	address += (item.address?item.address:'');
	if(address.length == 3){
		address = '地址不详';
	}
	var dom = '';
	dom += '<div class="pei power-room" power-room-id="' + item.id + '">';
	dom += '<div class="big-pei">';
	dom += '<div>';
	dom += '<div class="text-align-c pei1">' + item.prName + '</div>';
	dom += '<div class="text-align-c pei2"><img src="//cdn.dianwutong.com/ems/home/img/dianli.png"></div>';
	dom += '<div class="text-align-c pei3"><img src="//cdn.dianwutong.com/ems/home/img/biao.png"> ' + address + '</div>';
	dom += '</div>';
	dom += '<div class="big-pei-2">';
	dom += '<div class="big-pei-2-1">' + item.prName + '</div>';
	dom += '<div class="big-pei-2-2"></div>';
	dom += '<div class="big-pei-2-3">等级：' + item.prGrade.grade + ' 级</div>';
	dom += '<div class="big-pei-2-4 ellipsis">客户：' + item.customer.cusName + '</div>';
	dom += '<div class="big-pei-2-4">电话：' + item.customer.lxr1Mobile + '</div>';
	dom += '</div>';
	dom += '</div>';
	dom += '</div>';

	return dom;
};

//渲染今日任务

prListCtrl.renderMainTask = function(){
	prListModel.getMainTask().subscribe(function (res) {
		if(res){
			$('#occur-count').text(prListModel.emergencyCnt);
			$('#unhandle-repair-log-count').text(prListModel.repairLogCnt);
			$('#unhandle-ticket-count').text(prListModel.operTicketCnt);

			var arrangeContent = '';

			//计算安排到哪天了

			$('#inspect-arrange-situation').text(prListModel.arangeSituation);
		}
	});
};

