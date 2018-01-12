require('../../scss/inspection-bug-list.scss');

import { moni} from '../common/common';
import { commonModel } from '../common/common-model';
import { commonCtrl } from '../common/common-controller';

require('../common/system-warning-service.js');

let insBugListCtrl = {
	init: {},	//初始化页面
	bind: {},	//时间绑定
	getInsBugList: {}, //获取巡检问题列表
	render: {},		//渲染页面
	getInsBugDom: {},	//获取报警DOM

	bugList: [],	//巡检问题列表
	updateCycle: 10000, //设置更新周期

};

$(function () {
	insBugListCtrl.init();
});

//初始化页面

insBugListCtrl.init = function () {
	insBugListCtrl.bind();
	insBugListCtrl.getInsBugList();
	setInterval(insBugListCtrl.getInsBugList,insBugListCtrl.updateCycle);
};

//事件绑定

insBugListCtrl.bind = function () {

	//点击巡检问题 跳转到详情页

	$('#inspection-bug-con').delegate('.inspection-item', 'click', function(){
		var id = $(this).data('id');
		window.location.href =  './inspection-bug.html?bid='+id;
	});
};

//获取巡检问题列表

insBugListCtrl.getInsBugList = function () {
	var param = {
		path: '/dwt/iems/bussiness/qx/get_xj_problems',
		data: {
			userId: commonModel.userId,
			roleId: commonModel.roleId
		}
	};

	commonModel.post(param).subscribe(function (res) {
		if(res.code == '0'){
			insBugListCtrl.bugList = res.list;
			insBugListCtrl.render();
		}else{
			$('#bug-panel').css('display', 'none');
			$('#inspection-bug-con').empty();
			$('#empty-panel').css('display', 'block');
			moni.emptyTips('获取巡检问题失败', 'empty-panel');
			$('#result-count').parent().css('display', 'none');
		}
	});
};

//渲染页面

insBugListCtrl.render = function () {
	var bugList = insBugListCtrl.bugList;
	var length = bugList.length;
	$('#inspection-bug-con').empty();
	if (length == 0) {
		$('#bug-panel').css('display', 'none');
		$('#inspection-bug-con').empty();
		$('#empty-panel').css('display', 'block');
		moni.emptyTips('系统安全，无巡检问题！', 'empty-panel');
		$('#result-count').parent().css('display', 'none');
	} else {
		$('#bug-panel').css('display', 'block');
		$('#empty-panel').css('display', 'none');
		$('#result-count').text(length);
		$('#result-count').parent().css('display', 'block');
		for (var i = 0; i < length; i++) {
			$('#inspection-bug-con').append(insBugListCtrl.getInsBugDom(bugList[i]));
		}
	}
};

//获取巡检问题的DOM

insBugListCtrl.getInsBugDom = function (item) {

	var prName = '';
	var teamerName = '';
	try{ prName = item.xjRoute.pr.prName; }catch (e){ prName = '不详'; }
	try{ teamerName = item.xjRoute.xjzz.realName; }catch (e){ teamerName = '不详'; }


	var dom = '';
	dom += '<div class="hang inspection-item pointer" data-id="' + item.id + '">';
	dom += '<div class="row">';
	dom += '<div class="col-md-3 kuai">' + item.createTime.slice(0, 19) + '</div>';
	dom += '<div class="col-md-3 kuai">' + item.problemDesc + '</div>';
	dom += '<div class="col-md-3 kuai">' + prName + '</div>';
	dom += '<div class="col-md-3 kuai">' + teamerName + '</div>';
	dom += '</div>';
	dom += '</div>';
	return dom;
};

