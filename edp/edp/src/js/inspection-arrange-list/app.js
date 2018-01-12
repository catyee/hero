/**
 * 
 */
require('../../scss/inspection-arrange-list.scss');

import { commonModel } from '../common/common-model';
import { moni } from '../common/common';
import { commonCtrl} from '../common/common-controller';

require('../common/system-warning-service.js');

var inspectionArrangeListController = {
	disArrangeSituation : {},          //获取巡检安排详情
};
$(function(){

	/*查询巡检安排情况*/

	inspectionArrangeListController.disArrangeSituation();
	
	/*跳转到巡检安排详情*/

	$('#arrange-situation-con').delegate('.select-orrange-date','click',function(){
		
		var date = $(this).attr('date');
		window.location.href = './inspection-arrange.html?dt='+date;
	});
});
inspectionArrangeListController.disArrangeSituation = function(){
	var teamerId = $.cookie('roleId');
	var path = '/dwt/iems/bussiness/xj/get_next7_xj_route';
	var param = {
		path : path,
		data : {
			ztzUserId : commonModel.userId
		}
	};

	commonModel.post(param).subscribe(function(result){
		if(result.code == '0'){
			$('#arrange-situation-con').empty();

			var dom = '';
			var yesterday = getYesterday();

			dom = createInspectionDom(1, yesterday, yesterday+'及以前');
			$('#arrange-situation-con').append(dom);

			for(var i=0; i<result.list.length; i++){
				dom = createInspectionDom(result.list[i].arranged, result.list[i].xjDate, result.list[i].xjDate);
				$('#arrange-situation-con').append(dom);
			}
		}
	});

	//构造巡检安排的dom

	function createInspectionDom(arranged, inspectDate, content){
		var dom = '';
		if(arranged=='1'){
			dom += '<div class="one-1 select-orrange-date" date="'+inspectDate+'">';
		}else{
			dom += '<div class="one-2 select-orrange-date" date="'+inspectDate+'">';
		}

		dom += '<div style="margin-top:70px">'+content+'</div>';
		dom += '<div class="height22"></div>';
		dom += '<div>'+((arranged=='1')?'已安排':'未安排')+'</div>';
		dom += '</div>';

		return dom;
	}

	function getYesterday(){
		var yesterday = ((new Date()).valueOf()) - 24*60*60*1000;
		var dateUtils = new DateUtils();
		dateUtils.setDate(yesterday);
		return dateUtils.getFomattedDate('yyyy-MM-dd');
	}
};