/**
 * inspectionBugDetailController  巡检问题详情控制器
 */
require('../../scss/inspection-bug.scss');

import { moni} from '../common/common';
import { commonModel } from '../common/common-model';
import { commonCtrl } from '../common/common-controller';

import { inspectionBugDetailModel } from './inspection-bug-model';

require('../common/system-warning-service.js');

var inspectionBugDetailController = {
	disinspectionBugDetail      : {},        //显示问题详情
	createRepairOrderFromInsBug : {},       //由巡检问题生成抢修单
}

$(function(){
	var screenHeight = ((window.innerHeight > 0) ? window.innerHeight : screen.height);
	$("#main-container").css("minHeight",screenHeight-64);
	$("#inspection-bug-sheet").css("minHeight",screenHeight-64);

	// 获取 bugId
	inspectionBugDetailController.bugId = moni.getParameter('bid');
	
	inspectionBugDetailController.disinspectionBugDetail();
	
	/*点击生成抢修单按钮*/
	$("#general-repair-order-btn").click(function(){
		$("#general-repair-order-modal").modal();
	})
	
	/***
	 * 确认生成抢修单
	 */
	$("#model-create-repair-order").click(function(){
		inspectionBugDetailController.createRepairOrderFromInsBug();
		$(this).attr("disabled","disabled");
	})
	
	/***
	 * 点击录音  播放
	 */
	$("#audio-con").delegate(".audio","click",function(){
		var url = $(this).attr("url");
		moni.playAudio(url);
	})
})

/***
 * 展示问题详情
 */
inspectionBugDetailController.disinspectionBugDetail = function(){
	
	var bugId = inspectionBugDetailController.bugId;
	inspectionBugDetailModel.getInspectionBugById(bugId).subscribe(function(result){
		if(result.code == "0"){
			var item = result.entity;
			var pr = item.xjRoute.pr;
			var prefix = result.prefix;

			$("#power-room").text(pr.prName);
			$("#power-room-address").text(pr.province+' '+pr.city+' '+(pr.area?pr.area:"")+' '+pr.address);
			$("#customer-name").text(pr.customer.cusName);
			$("#customer-tel").text(pr.customer.lxr1Mobile);
			$("#inspection-grouper").text(item.xjRoute.ztz.realName);
			$("#inspection-grouper-tel").text(item.xjRoute.ztz.lxMobile);
			$("#inspection-bug-desc").text(item.problemDesc);
			$("#inspection-bug-time").text(item.createTime.slice(0,19));
			$("#model-inspection-bug-desc").val(item.problemDesc);
			
			$("#power-room-id").val(pr.id);
			$("#bug-grade").val(item.quesGrade);

			
			if(item.isSolved == 0){
				$("#general-repair-order-btn").css("display","inline")
			}
			
			try{
				var photosUrl = item.picUrl.split(",");
				var dom = '';
				for(var i=0; i<photosUrl.length; i++){
					dom = '';
					dom += '<div class="media-item photo">';
					dom += '<a href="'+prefix+photosUrl[i]+'" class="bug-pic" data-fancybox-group="gallery">';
					dom += '<img src="'+prefix+photosUrl[i]+'"  alt=""/>';
					dom += '</a>';
					dom += '</div>';
					$("#inspection-bug-media").append(dom);
				}
			}catch(e){
				console.log(e);
			}
			
			try{
				var audiosUrl = item.recordUrl.split(",");
				for(var i=0; i<audiosUrl.length; i++){
					dom = '';
					dom += '<div url="'+prefix+audiosUrl[i]+'" class="media-item audio"><img src="images/voice.png"/><div class="height5"></div><span>录音'+(i+1)+'</span></div>';
					$("#inspection-bug-media").append(dom);
				}
			}catch(e){
				console.log(e);
			}
			
			
			$(".bug-pic").fancybox();
			$(".audio").click(function(){
				var url = $(this).attr("url");
				moni.playAudio(url);
			})
		}
	})
}

/***
 * 由巡检问题生成抢修单
 */
inspectionBugDetailController.createRepairOrderFromInsBug = function(){
	var powerRoomId = $("#power-room-id").val();
	var bugId       = inspectionBugDetailController.bugId;
	var bugDesc     = $.trim($("#model-inspection-bug-desc").val());
	inspectionBugDetailModel.createRepairOrderFromInsBug(powerRoomId, bugId, bugDesc).subscribe(function(result){
		if(result.code == "0"){
			window.location.replace("order-detail.do?od="+result.id);
		}else if(result.code == "427"){
		
		}
		
		
	})
	
}