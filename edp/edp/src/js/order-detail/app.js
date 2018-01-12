require('../../scss/order-detail.scss');

import { moni} from '../common/common';
import { commonModel } from '../common/common-model';
import { commonCtrl } from '../common/common-controller';
import { repairOrderModel } from './repair-order-model';

require('../common/system-warning-service.js');

/**
 *  抢修单控制器 
 */

var repairOrderController = {
	disRepairOrderDetail : {} ,     //显示抢修单详情
	disSurveyRecord      : {} ,     //显示查勘记录
	renderSurveyRecord	 : {} ,		//渲染查勘记录
	renderRepairRecord	 : {} ,		//渲染抢修结果
};

$(function(){

	repairOrderController.repairOrderId = moni.getParameter('od');

	/**
	 * 让头部和身体铺满窗口
	 * 将页脚顶至屏幕之下
	 */
	
	repairOrderController.disRepairOrderDetail();

	//repairOrderController.disSurveyRecord();
	
	/***
	 * 打开定性对话框
	 */

	$('#rdefinitive-btn').click(function(){
		$('#definitive-modal').modal({
			closeOnConfirm : false,
			onConfirm : function(){
				var isInContact  = $('.modal-is-in-contact:checked').val();
				var repairOrderId = repairOrderController.repairOrderId;
				var repairProgramme = $('#modal-repair-programme').val();
				
				//合同内的订单要填写抢修方案

				if(isInContact == '1'){
					if(repairProgramme.length == 0){
						moni.generalTip('请填写抢修方案');
						return false;
					}
				}else{
					repairProgramme = null;
				}
				
				/***
				 * 保存定性内容
				 * 保存成功
				 * 如果是合同内：显示派遣抢修的按钮
				 * 隐藏定性按钮
				 * 隐藏查勘派遣按钮
				 * 如果是合同内：显示抢修方案，否是显示抢修方案为“合同外，线下抢修”
				 * 关闭定性对话框
				 */

				repairOrderModel.setDefinitiveById(repairOrderId, isInContact, repairProgramme, function(result){
					if(result.code == '0'){
						if(isInContact == '1'){
							$('#repair-send-btn').css('display','inline');
						}
						$('#rdefinitive-btn').css('display','none');
						$('#survey-send-btn').css('display','none');
						$('#repair-programme-con').css('display','block');
						$('#repair-programme').text((isInContact=='1')?repairProgramme:'合同外，线下进行抢修。');
						$('#definitive-modal').modal('close');
					}
				});
			}
		});
	});
	
	/***
	 * 选择是否合同内
	 */

	$('.modal-is-in-contact').click(function(){
		var isInContact = $(this).val();
		if(isInContact == '1'){
			$('#modal-repair-programme-panel').css('display','block');
		}else{
			$('#modal-repair-programme-panel').css('display','none');
		}
	});
	
	/*提交定性*/

	$('#modal-submit-definitive').click(function(){
		var isInContact  = $('.modal-is-in-contact:checked').val();
		var repairOrderId = repairOrderController.repairOrderId;
		var repairProgramme = $('#modal-repair-programme').val();
		
		//合同内的订单要填写抢修方案

		if(isInContact == '1'){
			if(repairProgramme.length == 0){
				moni.generalTip('请填写抢修方案');
				return false;
			}
		}else{
			repairProgramme = null;
		}
		
		/***
		 * 保存定性内容
		 * 保存成功
		 * 如果是合同内：显示派遣抢修的按钮
		 * 隐藏定性按钮
		 * 隐藏查勘派遣按钮
		 * 如果是合同内：显示抢修方案，否是显示抢修方案为“合同外，线下抢修”
		 * 关闭定性对话框
		 */

		repairOrderModel.setDefinitiveById(repairOrderId, isInContact, repairProgramme).subscribe(function(result){
			if(result.code == '0'){
				if(isInContact == '1'){
					$('#repair-send-btn').css('display','inline-block');
				}
				$('#rdefinitive-btn').css('display','none');
				$('#survey-send-btn').css('display','none');
				if(isInContact=='1'){
					$('#repair-programme-con').css('display','table-row');
					$('#repair-programme').text(repairProgramme);
				}
				
				$('#repair-status').text((isInContact=='1')?'定性为合同内，等待派遣抢修组...':'定性为合同外，抢修在线下进行');
				$('#definitive-modal').modal('hide');
			}
		});
	});
	
	/***
	 * 打开查勘派遣对话框
	 */

	$('#survey-send-btn').click(function(){

		//初始化员工列表

		repairOrderModel.getRepairGroupList().subscribe(function(result){
			if(result.code == '0'){
				$('#survey-send-stuff-list').empty();
				var dom ='';
				var status = ['空闲','派遣中'];
				for(var i=0;i<result.list.length; i++){
					dom = '';
					dom += '<tr stuff-id="'+result.list[i].id+'" stuff-name="'+result.list[i].realName+'" status="'+result.list[i].status+'">';
					dom += '<td>'+(i+1)+'</td>';
					dom += '<td>'+result.list[i].realName+'</td>';
					dom += '<td>'+result.list[i].lxMobile+'</td>';
					dom += '<td>'+status[(result.list[i].taskCount == 0?0:1)]+'</td>';
					dom += '<td>'+(result.list[i].loginStatus == 0?'离线':'在线')+'</td>';
					dom += '</tr>';
					$('#survey-send-stuff-list').append(dom);
				}
				
				$('#survey-send-modal').modal();
			}
		});
	});
	
	/***
	 * 派遣查勘
	 */
	
	$('#modal-survey-send-btn').click(function(){
		
		var stuffId = $('#survey-send-stuff-list').attr('select-stuff');
		var stuffName = $('#survey-send-stuff-list').attr('select-name');

		if('-1' == stuffId){
			moni.generalTip('请指定员工（组）进行派遣');
			return false;
		}
		
		var orderId = $('#repair-order-id').val();
		
		repairOrderModel.sendStuffToSurvey(orderId, stuffId, stuffName).subscribe(function(result){
			if(result.code == '0'){
				moni.generalTip('派遣成功');
				repairOrderController.disRepairOrderDetail();
				$('#survey-send-modal').modal('hide');
			}
		});
	});
	
	/***
	 * 指定查勘员工
	 */

	$('#survey-send-stuff-list').delegate('tr','click',function(){
		$('#survey-send-stuff-list').attr('select-stuff',$(this).attr('stuff-id'));
		$('#survey-send-stuff-list').attr('select-name',$(this).attr('stuff-name'));
		$('#survey-send-stuff-list tr').removeClass('success');
		$(this).addClass('success');
	});
	
	/***
	 * 打开抢修派遣对话框
	 */

	$('#repair-send-btn').click(function(){

		//初始化员工列表

		repairOrderModel.getRepairGroupList().subscribe(function(result){
			if(result.code == '0'){
				$('#survey-send-stuff-list').empty();
				var dom ='';
				var status = ['空闲','派遣中'];
				for(var i=0;i<result.list.length; i++){
					dom = '';
					dom += '<tr stuff-id="'+result.list[i].id+'" stuff-name="'+result.list[i].realName+'" status="'+result.list[i].status+'">';
					dom += '<td>'+(i+1)+'</td>';
					dom += '<td>'+result.list[i].realName+'</td>';
					dom += '<td>'+result.list[i].lxMobile+'</td>';
					dom += '<td>'+status[(result.list[i].taskCount == 0?0:1)]+'</td>';
					dom += '<td>'+(result.list[i].loginStatus == 0?'离线':'在线')+'</td>';
					dom += '</tr>';
					$('#repair-send-stuff-list').append(dom);
				}

				$('#repair-send-modal').modal();
			}
		});
		
	});
	
	/*提交抢修派遣*/

	$('#modal-submit-repair-send').click(function(){
		var stuffId = $('#repair-send-stuff-list').find('.success').attr('stuff-id');
		var stuffName = $('#repair-send-stuff-list').find('.success').attr('stuff-name');

		if('undefined' == typeof(stuffId)  ){
			moni.generalTip('请指定员工（组）进行派遣');
			return false;
		}
		
		var orderId = $('#repair-order-id').val();
		
		repairOrderModel.sendStuffToRepair(orderId, stuffId, stuffName).subscribe(function(result){
			if(result.code == '0'){
				moni.generalTip('派遣成功');
				$('#repair-send-btn').css('display','none');
				$('#repair-send-modal').modal('hide');
				repairOrderController.disRepairOrderDetail();
			}
		});
	});
	
	/***
	 * 指定抢修员工
	 */

	$('#repair-send-stuff-list').delegate('tr','click',function(){

		//		if($(this).attr("status") == "1"){
		//			return false;
		//		}

		$('#repair-send-stuff-list tr').removeClass('success');
		$(this).addClass('success');
	});
	
	
	/***
	 * 点击销单按钮
	 */

	$('#destroy-order-btn').click(function(){
		$('#destroy-order-modal').modal();
	});
	
	/*确认销单*/

	$('#modal-destroy-order-btn').click(function(){
		var repairOrderId = repairOrderController.repairOrderId;
		repairOrderModel.setDestroyOrderById(repairOrderId).subscribe(function(result){
			if(result.code == '0'){
				window.location.replace('repair-log.html?d='+repairOrderId);
			}
		});
	});
	
	/*点击录音按钮*/

	$('#survey-record-con,#repair-result-con').delegate('.voice','click',function(){
		var voiceList = $(this).find('input.voice-item');
		
		$('#voice-overlay').remove();
		
		var html = '';
		
		html += '<div style="height:100vh;width:100vw;padding-top:40vh;z-index:999;background:rgba(0,0,0,0.6);position:fixed;top:0px;left:0px;text-align:center;" id="voice-overlay">';
		
		html += '<div style="text-align:center;display:inline-block;width:64px;height:64px;background:#0091dc;margin:0px 5px;padding:5px;cursor:pointer;color:#fff" src="'+$(voiceList[0]).val()+'" class="voice"><img src="images/voice-1.png"/><br />录音1</div>';
		for(var i=1; i<voiceList.length; i++){
			html += '<div style="text-align:center;display:inline-block;width:64px;height:64px;background:#eee;margin:0px 5px;padding:5px;cursor:pointer" src="'+$(voiceList[i]).val()+'" class="voice"><img src="images/voice.png"/><br />录音'+(i+1)+'</div>';
		}
		html += '<div class="height100"></div>';
		html += '<audio src="'+$(voiceList[0]).val()+'" autoplay controls="controls" style="width:100%;position:absolute;bottom:0px;width:100%;left:0px;background:#000;padding:50px 0px;" id="audio-player"></audio>';
		
		html += '</div>';
		$('body').append(html);

		/*点击播放*/

		$('#voice-overlay .voice').click(function(e){
			
			$('#voice-overlay .voice').find('img').attr('src','images/voice.png');
			$('#voice-overlay .voice').css('background','#eee');
			$('#voice-overlay .voice').css('color','#000');
			
			$(this).find('img').attr('src','images/voice-1.png');
			$(this).css('background','#0091dc');
			$(this).css('color','#ffffff');
			
			e.stopPropagation();
			$('#audio-player').attr('src',$(this).attr('src'));
		});
		
		$('#voice-overlay').click(function(){
			$(this).fadeOut(300,function(){
				$('#voice-overlay').remove();
			});
		});
	});
});

/***
 * 显示抢修单详情
 */

repairOrderController.disRepairOrderDetail = function(){
	var repairOrderId = repairOrderController.repairOrderId;
	repairOrderModel.getRepairOrderBaseInfo(repairOrderId).subscribe(function(res){
		if(res){
			var order = repairOrderModel.orderInfo;
			$('#bug-desc').text(order.problemDesc);
			$('#power-room').text(order.pr.prName);
			$('#power-room-address').text(order.pr.province+' '+order.pr.city+' '+(order.pr.area?order.pr.area:'')+' '+order.pr.address);
			$('#customer-name').text(order.pr.customer.cusName);
			$('#teamer-name').text(order.headName);
			$('#customer-mobile').text(order.pr.customer.lxr1Mobile);
			$('#teamer-mobile').text(order.headMobile);

			//如果已经完成抢修 隐藏消单按钮

			if(order.deleteFlag != '1'){
				$('#destroy-order-btn').css('display','inline-block');
			}

			//显示查勘记录

			repairOrderController.renderSurveyRecord();

			if(order.problemId !== null){
				$('#to-inspection-bug').css('display','inline');
				$('#to-inspection-bug').attr('href','inspection-bug.do?bid='+order.problemId);
			}
			
			if(order.inContact == '0' || order.inContact == null){

				//待定

				$('#repair-programme-con').css('display','none');
				$('#repair-send-btn').css('display','none');
				$('#rdefinitive-btn').css('display','inline-block');
				$('#survey-send-btn').css('display','inline-block');
				$('#repair-status').text('问题确认中...');
			}else if(order.inContact == '1'){

				//合同内

				$('#repair-programme-con').css('display','table-row');
				$('#repair-programme').text(order.qxProgramme);
				$('#rdefinitive-btn').css('display','none');
				$('#survey-send-btn').css('display','none');

				if(repairOrderModel.repairTask == null ){
					$('#repair-send-btn').css('display','inline-block');
					$('#repair-status').text('定性为合同内，等待派遣抢修组...');
				}else if(repairOrderModel.repairTask.isComplete == 0){
					$('#repair-send-btn').css('display','none');
					$('#repair-status').text(repairOrderModel.repairTask.qxPeople+' 正在抢修...');
					$('#repair-status-con').css('display','block');
				}else{
					$('#repair-send-btn').css('display','none');
					$('#repair-status').html('<div>抢修完成</div>');
					$('#repair-status-con').css('display','block');
					$('#repair-excutor').text(order.repairPeople);
					$('#repair-result-tr').css('display','table-row');

					repairOrderController.renderRepairRecord();
				}
			}else{

				//合同外

				$('#repair-status').text('定性为合同外，抢修在线下进行');
				$('#repair-send-btn').css('display','none');
				$('#rdefinitive-btn').css('display','none');
				$('#survey-send-btn').css('display','none');
			}
		}
	});
};

/***
 * 渲染抢修结果
 */

repairOrderController.renderRepairRecord = function(){

	var pics = repairOrderModel.repairTask.picUrl?repairOrderModel.repairTask.picUrl.split(','):[];
	var voices = repairOrderModel.repairTask.recordUrl?repairOrderModel.repairTask.recordUrl.split(','):[];

	var dom = '';
	dom += '<div class="height10"></div>';
	dom += '<div style="display:flex;">';
	dom += '<div style="width:64px;height:64px;overflow:hidden;border:1px solid #ccc;display:flex; align-items:center;">';
	for(var i=0; i<pics.length; i++){
		dom += '<a href="'+pics[i]+'" class="repair-pic" data-fancybox-group="gallery">';
		dom += '<img src="'+pics[i]+'" width="64">';
		dom += '</a>';
	}
	dom += '</div>';
	dom += '<div style="width:20px">';
	dom += '</div>';
	dom += '<div>';
	if(voices.length > 0){
		dom += '<div class="voice">';
		for(var i=0; i<voices.length; i++){
			dom += '<input type="hidden" class="voice-item" value="'+voices[i]+'">';
		}
		dom += '<img src="images/voice.png">';
		dom += '<div>录音</div>';
		dom += '</div>';
	}
	dom += '</div>';
	dom += '</div>';
	dom += '<div class="height10">';
	dom += '</div>';
	dom += '<div>';
	dom += repairOrderModel.repairTask.taskDesc;
	dom += '</div>';
	dom += '<div class="height10">';
	dom += '</div>';
	dom += '</div>';

	$('#repair-result-con').html(dom);
	$('.repair-pic').fancybox();
};

/***
 * 显示查勘记录
 */

repairOrderController.renderSurveyRecord = function(){
	$('#survey-record-con').empty();

	var surveyList =  repairOrderModel.surveyTasks;
	var listLength = surveyList.length;
	var html = '';
	var divWidth = 313;
	var divMinWidth = (940-313)/(listLength-1);

	for(var i=0; i < listLength; i++){
		html  = '';
		if(listLength>3 && i<listLength-1){
			html += '<div style="width:'+divMinWidth+'px" class="survey-record font14 common-record">';
		}else if(listLength>3 && i == listLength-1){
			html += '<div style="width:'+divWidth+'px" class="font14 common-record">';
		}else{
			if(i == 0){
				html += '<div style="overflow:hidden;white-space:nowrap;padding:20px;width:'+divWidth+'px;text-align:center" class=" font14">';
			}else{
				html += '<div style="overflow:hidden;white-space:nowrap;padding:20px;border-left:1px solid #eee;width:'+divWidth+'px;text-align:center" class=" font14">';
			}
		}

		html += '<div>'+surveyList[i].lastModifyTime.slice(0,19)+'</div>';
		html += '<div class="height10"></div>';


		if(surveyList[i].isAccept == '0'){
			html += '<div>';

			html += '已向 '+surveyList[i].qxPeople+' 派遣查勘任务';
			html += '<div class="height10"></div>';
			html += '状态：未接单';

			html += '</div>';
		}else if(surveyList[i].isAccept == '1' && surveyList[i].isComplete == '0'){
			html += '<div>';
			html += '已向 '+surveyList[i].qxPeople+' 派遣查勘任务';
			html += '<div class="height10"></div>';
			html += '状态：已接单，正在查勘';
			html += '</div>';
		}else{

			if(listLength < 3){
				html += '<div style="display:flex;width:'+(parseFloat(divWidth)-80)+'px;justify-content:center">';
			}else{
				html += '<div style="display:flex;width:'+(parseFloat(divWidth)-80)+'px;">';
			}

			/*显示图片*/

			var picList = surveyList[i].picUrl.length>0?surveyList[i].picUrl.split(','):[];
			if(picList.length > 0){
				html += '<div style="width:64px;height:64px;overflow:hidden;border:1px solid #ccc;display:flex; align-items:center;">';
				for(var j=0; j<picList.length; j++){
					html += '<a href="'+picList[j]+'" class="bigpic'+i+'" data-fancybox-group="gallery"><img src="'+picList[j]+'"  width="64"/></a>';
				}
				html += '</div>';
			}

			html += '<div style="width:20px"></div>';
			html += '<div>';

			var voiceList =  surveyList[i].recordUrl.length>0?surveyList[i].recordUrl.split(','):[];
			if(voiceList.length > 0){
				html += '<div class="voice">';
				for(var j=0; j<voiceList.length; j++){
					html += '<input type="hidden" class="voice-item" value="'+voiceList[j]+'">';
				}
				html += '<img src="images/voice.png"/><br/>';
				html += '录音';
				html += '</div>';
			}

			html += '</div>';
			html += '</div>';
			html += '<div class="height10"></div>';
			html += '<div style="width:'+(parseFloat(divWidth)-80)+'px;word-break:normal;white-space:normal">'+surveyList[i].taskDesc+'</div>';
			html += '<div class="height10"></div>';
			html += '<div>执行者：'+surveyList[i].qxPeople+'</div>';

		}


		html += '</div>';

		$('.bigpic'+i).fancybox();

		$('#survey-record-con').append(html);
	}

	$('.survey-record').hover(function(){
		$(this).stop().animate({width:divWidth+'px'},300);},
	function(){
		$(this).stop().animate({width:divMinWidth+'px'},300);}
	);
};
repairOrderController.disSurveyRecord = function(){
	var repairOrderId = repairOrderController.repairOrderId;
	repairOrderModel.getSurveyRecordById(repairOrderId).subscribe(function(result){
		if(result.code == '0'){

			
		}
	});
};


/***
 * 显示查看详情
 */

