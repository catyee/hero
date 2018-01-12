
require('../../scss/pr-check-list.scss');

import { powerRoomCommonController } from '../common/power-room-common-controller';
import { powerRoomModel } from '../common/power-room-model';
import { moni} from '../common/common';
import { commonModel } from '../common/common-model';
import { commonCtrl } from '../common/common-controller';
import { prCheckListModel } from './pr-check-list-model';

require('../common/system-warning-service.js');

var powerRoomCheckListController = {
	init					  : {},					 //初始化页面
	initPowerRoomBaseInfo     : {},                  //初始化配电室基本信息
	initCheckTemplateList     : {},
	initPowerRoomCheckList    : {},                  //初始化巡检列表
	initReCheckList           : {},                  //初始化复检列表
	initEmergencyItemList     : {},                  //初始化突发列表
	saveCheckClass            : {},                  //保存巡检分类
	
	removeCheckItems          : {},                  //删除巡检项
	
	toRemoveItemList          : [],                  //待删除巡检项
	SuccessSavedCheckClassAPI : 0 ,                  //保存巡检共调用3个接口  当3个都调用完成时重新初始化巡检列表   
};

$(function(){
	powerRoomCheckListController.initPagesPath();
	
	powerRoomCheckListController.init();

	//初始化配电室基本信息

	powerRoomCommonController.initPowerRoomBaseInfo();

	//初始化一次接线图按钮

	powerRoomCommonController.initYCJXTButton();
	
	powerRoomCheckListController.initCheckTemplateList();
	powerRoomCheckListController.initReCheckList();
	powerRoomCheckListController.initEmergencyItemList();
	powerRoomCheckListController.initPowerRoomCheckList();
	
	$('.tab-head').click(function(){
		var index = $('.tab-head').index($(this));
		$('.tab-head').removeClass('active');
		$(this).addClass('active');
		
		$('.tab-body').css('display','none');
		$('.tab-body:eq('+index+')').css('display','block');
	});
	
	/***
	 * 添加一个巡检大类
	 */

	$('#add-check-class').click(function(){
		$('#add-check-class-modal').modal();
	});
	
	/**
	 * 确认添加一个大类
	 */
	
	$('#modal-add-check-class').click(function(){
		var checkClassName = $.trim($('#modal-check-class-name').val());
		var powerRoomId    = this.prId;
			
		if(checkClassName.length == 0){
			moni.generalTip('分类名称不能为空');
			return false;
		}
			
		prCheckListModel.addOrUpdateCheckClass(powerRoomId,null,checkClassName).subscribe(function(res){
			if(res.code == '0'){
				$('#add-check-class-modal').modal('hide');
				powerRoomCheckListController.initPowerRoomCheckList();
			}
		});
	});
	
	/**
	 * 选择模板 
	 * 切换日检 周检 月检
	 */

	$('#modal-check-item-type-nav >div').click(function(){
		var index = $(this).index();
		$('#modal-check-item-type-nav >div').removeClass('active');
		$(this).addClass('active');
		$('.template-item-preview').css('display','none');
		$('.template-item-preview').eq(index).css('display','block');
	});
	
	/**
	 * 编辑巡检分类 
	 * 切换日检 周检 月检
	 */

	$('#modal-edit-check-item-type-nav>div').click(function(){
		var index = $(this).index();
		$('#modal-edit-check-item-type-nav>div').removeClass('active');
		$(this).addClass('active');
		$('.edit-item-preview').css('display','none');
		$('.edit-item-preview').eq(index).css('display','block');
	});

	/***
	 * 点击使用模板 弹出模板对话框
	 */

	$('#tab-panel-inspection').delegate('.use-check-template', 'click', function(){
		var classId = $(this).attr('class-id');
		$('#modal-check-class-id').val(classId);
		$('#check-template-modal').modal();
	});
	
	/**
	 * 确认使用模板 
	 */

	$('#modal-use-template-class').click(function(){
		
		var powerRoomId = this.prId;
		var classId     = $('#modal-check-class-id').val();
		
		var checkList = [];
		
		var dailyCheckItem = $('#daily-template-item-preview>table input:checked');
		var weekTr  = $('#week-template-item-preview>table  tr:gt(0)');
		var monthTr = $('#month-template-item-preview>table tr:gt(0)');
		$('#check-template-modal').modal('hide');
	    for(var i=0; i<dailyCheckItem.length; i++){
	    	checkList.push({
	    		'prXjDefineId' : classId,
	    		'xjItem'       : $(dailyCheckItem[i]).attr('item-name'),
	    		'checkType'       : '1'
	    	});
	    }
	    
	    var input = null;
	    for(var i=0; i<weekTr.length; i++){
	    	input = $(weekTr[i]).find('input');
	    	if($(input).is(':checked')){
	    		checkList.push({
		    		'prXjDefineId'  : classId,
		    		'xjItem'        : $(input).attr('item-name'),
		    		'checkType'        : '2',
		    		'weekXjCycle' : $(weekTr[i]).find('select').val()
		    	});
	    	}
	    	
	    }
	    
	    input = null;
	    for(var i=0; i<monthTr.length; i++){
	    	input = $(monthTr[i]).find('input');
	    	if($(input).is(':checked')){
	    		checkList.push({
		    		'prXjDefineId'   : classId,
		    		'xjItem'         : $(input).attr('item-name'),
		    		'checkType'         : '3',
		    		'monthXjCycle' : $(monthTr[i]).find('select').val()
		    	});
	    	}
	    	
	    }
	    
	    prCheckListModel.bacthAddCkeckItems(checkList).subscribe(function(result){
	    	if(result.code == '0'){
	    		powerRoomCheckListController.initPowerRoomCheckList();
	    	}
	    });
	    
	});
	
	/***
	 * 编辑巡检项  如果选择了巡检日期  将isUpdate修改为true
	 */

	$('#edit-check-class-modal').delegate('.modal-edit-item select', 'change', function(){
		$(this).parents('.modal-edit-item').attr('isUpdate', 'true');
	});
	
	
	
	/***
	 * 选择巡检模板
	 * 清空模板
	 * 分类列出巡检项
	 * 默认全选
	 */
	
	$('#select-check-template').change(function(){
		var templateId = $(this).val();
		if(templateId == '-1'){
			return false;
		}
		
		var prveviews = $('.template-item-preview');
		
		for(var i=0; i<prveviews.length; i++){
			$(prveviews[i]).find('table tr:gt(0)').remove();
		}
		
		prCheckListModel.getCheckTemplateById(templateId).subscribe(function(result){
			if(result.code == '0'){
				var dailyItemCount = 0;
				var weekItemCount  = 0;
				var monthItemCount = 0;
				
				var dailyHtml = '';
				var weekHtml  = '';
				var monthHtml = '';
				
				var weekSelect  = '';
				var daySelect   = '';
				
				
				weekSelect += '<select>';
				weekSelect += '<option value="1">周一</option>';
				weekSelect += '<option value="2">周二</option>';
				weekSelect += '<option value="3">周三</option>';
				weekSelect += '<option value="4">周四</option>';
				weekSelect += '<option value="5">周五</option>';
				weekSelect += '<option value="6">周六</option>';
				weekSelect += '<option value="7">周日</option>';
				weekSelect += '</select>';
				
				daySelect  += '<select>';
				for(var i=1; i<=28; i++){
					daySelect += '<option value="'+i+'">'+i+'</option>';
				}
				
				daySelect  += '</select>';
				var checkItemList = result.entity.checkItmeList;
				for(var i=0; i< checkItemList.length; i++){
					switch(checkItemList[i].checkType.toString()){
					case '1' :
						if(dailyItemCount%2 == 0){
							dailyHtml += '<tr>';
							dailyHtml += '<td class="text-align-c"><input type="checkbox" checked="checked" value="'+checkItemList[i].checkItemId+'" item-name="'+checkItemList[i].checkItem+'"/></td>';
							dailyHtml += '<td>'+checkItemList[i].checkItem+'</td>';
						}else{
							dailyHtml += '<td class="text-align-c"><input type="checkbox" checked="checked" value="'+checkItemList[i].checkItemId+'" item-name="'+checkItemList[i].checkItem+'"/></td>';
							dailyHtml += '<td>'+checkItemList[i].checkItem+'</td>';
							dailyHtml += '</tr>';
						}
						dailyItemCount++;
						break;
					case '2' :
							
						weekHtml += '<tr>';
						weekHtml += '<td><input type="checkbox" checked="checked" value="'+checkItemList[i].checkItemId+'"  item-name="'+checkItemList[i].checkItem+'"/></td>';
						weekHtml += '<td>'+checkItemList[i].checkItem+'</td>';
						weekHtml += '<td>'+weekSelect+'</td>';
						weekHtml += '</tr>';
							
						break;
					case '3' :
							
						monthHtml += '<tr>';
						monthHtml += '<td><input type="checkbox" checked="checked" value="'+checkItemList[i].checkItemId+'"  item-name="'+checkItemList[i].checkItem+'"/></td>';
						monthHtml += '<td>'+checkItemList[i].checkItem+'</td>';
						monthHtml += '<td>'+daySelect+'</td>';
						monthHtml += '</tr>';
						break;
					}
					
				}

				/***
				 * 检查日检项  如果为奇数  在后面添加</tr>
				 */
				
				if(dailyItemCount%2 == 1){
					dailyHtml += '<td colspan="2">&nbsp;</td>';
					dailyHtml += '</tr>';
				}
				
				$('#daily-template-item-preview>table').append(dailyHtml);
				$('#week-template-item-preview >table').append(weekHtml);
				$('#month-template-item-preview>table').append(monthHtml);
			}
		});
	});
	
	/***
	 * 点击编辑巡检大类
	 * 1、清空编辑对话框的所有内容
	 * 2、获取分类信息
	 * 3、分类信息显示到编辑对话框
	 */

	$('#tab-panel-inspection').delegate('.edit-check-class', 'click', function(){
		var classId = $(this).attr('class-id');

		$('#edit-daily-item-preview > table tr:gt(0)').remove();
		$('#edit-week-item-preview  > table tr:gt(0)').remove();
		$('#edit-month-item-preview > table tr:gt(0)').remove();
		
		var checkClass =  prCheckListModel.getACheckClass(classId);

		if(checkClass){

			$('#modal-edit-class-name').val(checkClass.defineName);
			$('#modal-edit-class-id').val(checkClass.id);

			/***
			 * 根据checkType分出日检 周检 月检
			 */

			var dailyHtml = '';
			var weekHtml  = '';
			var monthHtml = '';

			var week = ['','周一','周二','周三','周四','周五','周六','周日'];
			var weekOption = [''];
			var weekSelectedOption = [''];

			var monthOption = [''];
			var monthSelectedOption = [''];

			for(var i=1; i<=7; i++){
				weekOption.push('<option value=\"'+i+'\">每'+week[i]+'</option>');
				weekSelectedOption.push('<option value=\"'+i+'\" selected=\"selected\">每'+week[i]+'</option>');
			}

			for(var i=1; i<=28; i++){
				monthOption.push('<option value=\"'+i+'\">每月'+i+'号</option>');
				monthSelectedOption.push('<option value=\"'+i+'\" selected=\"selected\">每月'+i+'号</option>');
			}

			for(var i=0; i<checkClass.list.length; i++){
				weekOption  = [];
				monthOption = [];
				switch(checkClass.list[i].checkType.toString()){
				case '1' : dailyHtml += '<tr item-id="'+checkClass.list[i].id+'" isUpdate="false" class="modal-edit-item">';
						   dailyHtml += '<td class="item-name-con"><span>'+checkClass.list[i].xjItem+'</span><input type="text" value="'+checkClass.list[i].xjItem+'" style="display:none;width:100%;"/></td>';

						   dailyHtml += '<td><a href="javascript:;" class="modal-remove-daily-item color-red" item-id="'+checkClass.list[i].id+'">删除</td>';
						   dailyHtml += '</tr>';
						   break;
				case '2' : weekHtml  += '<tr item-id="'+checkClass.list[i].id+'" isUpdate="false"  class="modal-edit-item">';
						   weekHtml  += ' <td class="item-name-con"><span>'+checkClass.list[i].xjItem+'</span><input type="text" value="'+checkClass.list[i].xjItem+'" style="display:none;width:100%;"/></td>';


						   for(var j=1; j<=7; j++){
							   if(checkClass.list[i].weekInspectCycle == j){
								   weekOption.push('<option value=\"'+j+'\" selected="selected">每'+week[j]+'</option>');
								   continue;
							   }
						weekOption.push('<option value=\"'+j+'\">每'+week[j]+'</option>');
					}

						   weekHtml  += '<td><select>'+weekOption.slice(0,7).join('')+'</select></td>';
						   weekHtml  += '<td><a href="javascript:;" class="modal-remove-daily-item color-red" item-id="'+checkClass.list[i].id+'">删除</td>';
						   weekHtml  += '</tr>';
						   break;
				case '3' : monthHtml  += '<tr item-id="'+checkClass.list[i].id+'" isUpdate="false"  class="modal-edit-item">';
						   monthHtml  += ' <td class="item-name-con"><span>'+checkClass.list[i].xjItem+'</span><input type="text" value="'+checkClass.list[i].xjItem+'" style="display:none;width:100%;"/></td>';

						   for(var j=1; j<=28; j++){
							   if(checkClass.list[i].monthInspectCycle == j){
								   monthOption.push('<option value=\"'+j+'\" selected="selected">每月'+j+'号</option>');
								   continue;

							   }
							   monthOption.push('<option value=\"'+j+'\">每月'+j+'号</option>');
					}

						   monthHtml  += '<td><select>'+monthOption.slice(0,29).join('')+'</select></td>';
						   monthHtml  += '<td><a href="javascript:;" class="modal-remove-daily-item color-red" item-id="'+checkClass.list[i].id+'">删除</td>';
						   monthHtml  += '</tr>';
						   break;
				}
			}

			$('#edit-daily-item-preview > table').append(dailyHtml);
			$('#edit-week-item-preview  > table').append(weekHtml);
			$('#edit-month-item-preview > table').append(monthHtml);

			/***
			 * 打开编辑对话框
			 */

			$('#edit-check-class-modal').modal();
		}

	});
	
	
	/***
	 * 编辑完毕保存巡检
	 * 点击确定按钮
	 * 1 如果toRemoveList.length>0 调用删除接口
	 * 2 调用保存接口
	 * 3 保存分类名
	 * 
	 * powerRoomController.SuccessSavedCheckClassAPI保存着调用成功的接口
	 * 当powerRoomController.SuccessSavedCheckClassAPI == 3时 重新初始化巡检列表
	 */
	
	$('#edit-modal-save-check-class').click(function(){
		var ClassName = $.trim($('#modal-edit-class-name').val());
						
		if(ClassName.length == 0){
			moni.generalTip('分类名不能为空');
			return false;
		}
		var ClassID = $('#modal-edit-class-id').val();
		var PowerRoomID = this.prId;
		$('#edit-check-class-modal').modal('hide');

		var addOrUpdate$ = prCheckListModel.addOrUpdateCheckClass(PowerRoomID, ClassID, ClassName);
		var removeItems$ = prCheckListModel.removePowerRoomCheckItem(powerRoomCheckListController.toRemoveItemList);
		var updateItems$ = powerRoomCheckListController.saveCheckClass();

		Rx.Observable.zip(addOrUpdate$, removeItems$, updateItems$).subscribe(function (res) {
			powerRoomCheckListController.initPowerRoomCheckList();
		});


	});
	
	/***
	 * 添加日检项
	 * item-id = -1
	 */

	$('#modal-new-daily-item-btn').click(function(){
		var content = $.trim($('#modal-new-daily-item').val());

		if(content.length == 0){
			return false;
		}
		var tr ='';
		
		tr  += '<tr item-id="-1" isUpdate="true">';
		tr  += '<td class="item-name-con"><span>'+content+'</span><input type="text" value="'+content+'" style="display:none;width:100%;"/></td>'; 
	   
		tr += '<td><a href="javascript:;" class="modal-remove-daily-item color-red">删除</a></td>';
		tr += '</tr>';
		
		$('#edit-daily-item-preview>table').append(tr);
		$('#modal-new-daily-item').val('');
	});
	
	/***
	 * 添加新的周检
	 */

	$('#modal-new-week-item-btn').click(function(){
		var content = $.trim($('#modal-new-week-item-content').val());
		if(content.length == 0){
			return false;
		}
		var date = $('#modal-new-week-item-week').val();
		
		var week = ['','周一','周二','周三','周四','周五','周六','周日'];
		
		var weekOption = [];
		var weekHtml   = '';
		
		weekHtml  += '<tr item-id="-1" isUpdate="true">';
		weekHtml  += '<td class="item-name-con"><span>'+content+'</span><input type="text" value="'+content+'" style="display:none;width:100%;"/></td>'; 

		for(var j=1; j<=7; j++){
			if(date == j){
				weekOption.push('<option value=\"'+j+'\" selected="selected">每'+week[j]+'</option>');
				continue;
		}
			weekOption.push('<option value=\"'+j+'\">每'+week[j]+'</option>');
		}
		weekHtml  += '<td><select>'+weekOption.slice(0,7).join('')+'</select></td>';
		weekHtml  += '<td><a href="javascript:;" class="modal-remove-week-item color-red" item-id="-1">删除</td>';
		weekHtml  += '</tr>';

		$('#edit-week-item-preview  > table').append(weekHtml);
		
	});
	
	/***
	 * 添加新的月检
	 */

	$('#modal-new-month-item-btn').click(function(){
		var content = $.trim($('#modal-new-month-item-content').val());
		if(content.length == 0){
			return false;
		}
		var date = $('#modal-new-month-item-date').val();
		
		
		var monthOption = [];
		var monthHtml   = '';
		
		monthHtml  += '<tr item-id="-1" isUpdate="true">';
		monthHtml  += '<td class="item-name-con"><span>'+content+'</span><input type="text" value="'+content+'" style="display:none;width:100%;"/></td>'; 

		for(var j=1; j<=28; j++){
			if(date == j){
				monthOption.push('<option value=\"'+j+'\" selected="selected">每月'+j+'号</option>');
				continue;
			}
			monthOption.push('<option value=\"'+j+'\">每月'+j+'号</option>');
		}

		monthHtml  += '<td><select>'+monthOption.slice(0,28).join('')+'</select></td>';
		monthHtml  += '<td><a href="javascript:;" class="modal-remove-month-item color-red" item-id="-1">删除</td>';
		monthHtml  += '</tr>';
		$('#edit-month-item-preview  > table').append(monthHtml);
		
	});
	
	/***
	 * 删除巡检项
	 * 如果item-id!=-1 将id加入toRemoveList
	 */

	$('#edit-check-class-modal').delegate('.edit-item-preview > table .modal-remove-daily-item', 'click',function(){
		var ItemID = $(this).attr('item-id');
		if(ItemID == '-1'){
			return false;
		}
		$(this).parent().parent().remove();
		powerRoomCheckListController.toRemoveItemList.push(ItemID);
	});
	
	/***
	 * 删除巡检分类
	 */
	
	$('#tab-panel-inspection').delegate('.remove-check-class', 'click', function(){
		
		var ClassID = $(this).attr('class-id');
		$('#modal-remove-check-class-id').val(ClassID);
		$('#remove-check-class-modal').modal();
	});
	
	$('#modal-confirm-remove-class').click(function(){
		var ClassID = $('#modal-remove-check-class-id').val();
		prCheckListModel.removePowerRoomCheckClass(ClassID).subscribe(function(res){
			if(res.code == '0'){
				powerRoomCheckListController.initPowerRoomCheckList();
				$('#remove-check-class-modal').modal('hide');
			}
		});
	});
	
	/***
	 * 移除复检项
	 */

	$('#tab-panel-recheck').delegate('.remove-recheck-item', 'click', function(e){
		var reCheckId = $(this).attr('recheck-id');
		var reCheckDom = $(this).parent().parent();
		$('#modal-remove-recheck-id').val(reCheckId);
		$('#remove-recheck-confirm').modal();
	});
	
	/***
	 * 确认移除复检
	 */

	$('#modal-confirm-remove-recheck').click(function(){
		var reCheckId = $('#modal-remove-recheck-id').val();
	
		var dom = $('.recheck-item[id=\''+reCheckId+'\']');
	
		prCheckListModel.removeRecheckItem(reCheckId).subscribe(function(result){
			if(result.code == '0'){
				$(dom).remove();
				$('#remove-recheck-confirm').modal('hide');
				var recheckItemLength = $('.recheck-item').length;
				
				if(recheckItemLength == 0){
					$('#recheck-number').css('display','none');
				}else{
					$('#recheck-number').text(recheckItemLength);
				}
			}
		});
	});
	
	/***
	 * 点击突发项设置为日常巡检按钮
	 */

	$('#tab-panel-emer').delegate('.set-emergency-to-daliy','click',function(){
		var emergencyId = $(this).attr('emergency-id');
		var emergencyDesc = $(this).attr('emergency-desc');
		var classes = prCheckListModel.checkList;
		if(classes.length == '0'){
			moni.generalTip('请先添加巡检分类');
			return false;
		}
		for(var i=0; i<classes.length; i++){
			$('#modal-check-class-select').append('<option value="'+classes[i].id+'">'+classes[i].defineName+'</option>');
		}

		$('#modal-emergency-id').val(emergencyId);
		$('#modal-emergency-desc').text(emergencyDesc);
		$('#modal-daily-title').val('');
		$('#emergency-to-daily-modal').modal();
				

	});
	
	/***
	 * 设置为突发时 选择巡检类型
	 */
	
	$('#modal-check-type-select').change(function(){
		var type = $(this).val().toString();
		 switch(type){
		 case '1' :
			 $('#modal-check-week-select').css('display','none');
			 $('#modal-check-month-select').css('display','none');
			 break;
		 case '2' :
			 $('#modal-check-week-select').css('display','block');
			 $('#modal-check-month-select').css('display','none');
			 break;
		 case '3' :
			 $('#modal-check-week-select').css('display','none');
			 $('#modal-check-month-select').css('display','block');
			 break;
		 }
	});
	
	/***
	 * 提交突发作为日常巡检
	 */
	
	$('#modal-confirm-set-memr-to-daily').click(function(){
		var checkItem = $.trim($('#modal-daily-title').val());
		
		if(checkItem.length == 0){
			$('#modal-daily-title-tip').text('请填写巡检项标题');
			return false;
		}else if(checkItem.length>30){
			$('#modal-daily-title-tip').text('标题字数应在30字以内');
			return false;
		}else{
			$('#modal-daily-title-tip').text('');
		}
		
		var classId = $('#modal-check-class-select').val();
		var checkType = $('#modal-check-type-select').val().toString();
		var weekDay   = null;
		var monthDate = null;
		
		switch(checkType){
		case '2' : weekDay = $('#modal-check-week-select').val();
			break;
		case '3' : monthDate = $('#modal-check-month-select').val();
		
		}
		
		/***
		 * 设置为巡检项
		 * powerRoomId,classId, checkType,checkItem,weekDay,monthDate, callback
		 */

		prCheckListModel.setPowerRoomCheckItem(classId, checkType, checkItem, weekDay, monthDate).subscribe(function(){
			var emergencyItemId = $('#modal-emergency-id').val();

			/***
			 * 设置成功  移除该项
			 */

			prCheckListModel.setIgnoreEmergencyItem(emergencyItemId).subscribe(function(){
				powerRoomCheckListController.initEmergencyItemList();
				powerRoomCheckListController.initPowerRoomCheckList();
				$('#emergency-to-daily-modal').modal('hide');
			});
		});
	});
		
	
	/**
	 * 忽略突发
	 */
	
	$('#tab-panel-emer').delegate('.ignore-emergency-item', 'click',function(){
		$('#ignore-emergency-id').val($(this).attr('emergency-id'));
		$('#ignore-emergency-confirm').modal();
	});
	
	$('#modal-confirm-remove-emer').click(function(){
		var emergencyId = $('#ignore-emergency-id').val();
		prCheckListModel.setIgnoreEmergencyItem(emergencyId).subscribe(function(){
			powerRoomCheckListController.initEmergencyItemList();
			$('#ignore-emergency-confirm').modal('hide');
		});
	});
	
	
	
	
});

/**
 * 初始化 扩展信息各个item标题(相关资料，抢修日志，巡检日志，巡检项目)的路径
 */
powerRoomCheckListController.initPagesPath = function () {
	this.prId = moni.getParameter('prid');
	$('#toPrMetarial').attr('href','pr-metarial.html?prid='+this.prId);
	$('#toRepairLog').attr('href','pr-repair-log.html?prid='+this.prId);
	$('#toInspectionLog').attr('href','pr-inspection-log.html?prid='+this.prId);
	$('#toPrCheck').attr('href','pr-check-list.html?prid='+this.prId);
}


powerRoomCheckListController.init = function(){
	
	/***
	 * 如果url有锚点  跳转到锚点
	 */

	console.log(window.location.hash);
	if(/occur/.test(window.location.hash)){
		var index = 2;
		$('.tab-head').removeClass('active');
		$('.tab-head:eq('+index+')').addClass('active');
		
		$('.tab-body').css('display','none');
		$('.tab-body:eq('+index+')').css('display','block');
	}
};

/**
 * 初始化配电室信息
 */

powerRoomCheckListController.initPowerRoomBaseInfo = function(){
	var powerRoomId = this.prId;
	powerRoomModel.getPowerRoomBaseInfoById(powerRoomId, function(result){
		if(result.code == '0'){
			$('#power-room-name').text(result.prName);
			$('#power-room-address').text(result.prProvince+' '+result.prCity+' '+(result.prArea?result.prArea:'')+' '+result.prAddress);
			$('#power-room-grade').text(result.prGrade+'级');
			$('#power-room-desc').text(result.prDesc);
			$('#customer-name').text(result.cusName);
			$('#customer-contactor').text(result.contactPerson);
			$('#customer-mobile').text(result.contactPersonMobile);
			$('#teamer-name').text(result.headName);
			$('#teamer-mobile').text(result.headMobile);
		}
	});
};

/**
 * 初始化巡检模板列表
 */

powerRoomCheckListController.initCheckTemplateList = function(){
	prCheckListModel.getCheckTemplateList().subscribe(function(result){
		if(result.code == '0'){
			var templateList = result.list;
			$('#select-check-template>option:gt(0)').remove();
			for(var i=0; i<templateList.length; i++){
				$('#select-check-template').append('<option value="'+templateList[i].id+'">'+templateList[i].tplName+'</option>');
			}
		}
	});
};

/***
 * 初始化配电室巡检列表
 */

powerRoomCheckListController.initPowerRoomCheckList = function(){
	var powerRoomId = this.prId;
	prCheckListModel.getPowerRoomCheckList().subscribe(function (res) {
		if(res){
			var classes = prCheckListModel.checkList;
			$('#tab-panel-inspection div.check-class').remove();
			var checkType = ['','日检','周检','月检'];
			var week      = ['', '周一','周二','周三','周四','周五','周六','周日'];
			var html = '';
			var table = '';

			if(classes.length == 0){
				moni.emptyTips('该配电室未设置巡检分类', 'inspection-empty-tips-container');
			}else{
				$('#inspection-empty-tips-container').empty();
			}
			for(var i=0; i<classes.length; i++){

				html = '';
				table = '';

				html += '<div class="check-class">';
				html += '<div class="byq">';
				html += '<div class="byq-head-1">'+classes[i].defineName+'</div>';
				html += '<span class="byq-head-2 use-check-template" class-id="'+classes[i].id+'">使用模板</span>';
				html += '<span class="byq-head-3 edit-check-class" class-id="'+classes[i].id+'">编辑</span>';
				html += '<span class="byq-head-4 color-red remove-check-class" class-id="'+classes[i].id+'">删除</span>';
				html += '</div>';

				table += '<table class="table table-bordered font14">';
				table += '<tr>';
				table += '<td width="10%">序号</td>';
				table += '<td  width="70%">巡检项</td>';
				table += '<td  width="10%">类型</td>';
				table += '<td  width="10%">检查日期</td>';
				table += '</tr>';

				for(var j=0; j<classes[i].list.length; j++){
					table += '<tr>';
					table += '<td>'+(j+1)+'</td>';
					table += '<td>'+classes[i].list[j].xjItem+'</td>';
					table += '<td>'+checkType[classes[i].list[j].checkType]+'</td>';

					switch(classes[i].list[j].checkType.toString()){
					case '1' : table += '<td>每天</td>';break;
					case '2' : table += '<td>每'+week[classes[i].list[j].weekXjCycle]+'</td>';break;
					case '3' : table += '<td>每月'+classes[i].list[j].monthXjCycle+'号</td>';
					}
					table += '</tr>';
				}

				table += '</table>';

				html += table;
				html += '</div>';

				$('#tab-panel-inspection-tail').before(html);
			}
		}
	});
};

/**
 * 初始化复检列表
 */

powerRoomCheckListController.initReCheckList = function(){
	var powerRoomId = $('#power-room-id').val();

	prCheckListModel.getRecheckItemList().subscribe(function(result){
		if(result.code == '0'){
			$('#tab-panel-recheck').empty();
			var recheckList = result.list;
			var length = recheckList.length;
			if( length == 0){
				moni.emptyTips('该配电室暂时没有复检', 'tab-panel-recheck');
			}else{
				$('#recheck-number').text(length);
				$('#recheck-number').css('display','block');
			}

			var dom='';
			for(var i=0; i<length; i++){
				dom = '';
				
				dom += '<div class="recheck-item" id="'+recheckList[i].id+'">';
				dom += '<div class="height55"></div>';
				dom += '<div style="display:flex;">';
				dom += '<div>';
				dom += '<div class="xiangmu-body-1-1">复检标题</div>';
				dom += '<div class="xiangmu-body-1-1">复检描述</div>';
				dom += '<div class="xiangmu-body-1-2">开始时间</div>';
				dom += '</div>';
				dom += '<div>';
				dom += '<div class="xiangmu-body-2-1">'+recheckList[i].fjItem+'</div>';
				dom += '<div class="xiangmu-body-2-1">'+recheckList[i].fjDesc+'</div>';
				dom += '<div class="xiangmu-body-2-2">'+recheckList[i].createTime.slice(0,10)+'</div>';
				dom += '</div>';
				dom += '<div class="xiangmu-body-3"><span class="remove-recheck-item" recheck-id="'+recheckList[i].id+'">移除</span></div>';
				dom += '</div>';
				dom += '</div>';
				
				$('#tab-panel-recheck').append(dom);
			}
		}
	});
};

/***
 * 初始化突发列表
 */

powerRoomCheckListController.initEmergencyItemList = function(){
	var powerRoomId = $('#power-room-id').val();
	prCheckListModel.getEmergencyItemList().subscribe(function(result){
		if(result.code == '0'){
			
			$('#tab-panel-emer').empty();
			
			if(result.list.length == '0'){
				moni.emptyTips('该配电室运行正常', 'tab-panel-emer');
				$('#occur-number').css('display','none');
			}else{
				$('#no-emergency-panel').css('display','none');
				$('#occur-number').text(result.list.length);
				$('#occur-number').css('display','block');
			}
			
			var dom = '';
			for(var i=0; i<result.list.length; i++){
				dom = '';
				
				dom += '<div class="emer-item">';
				dom += '<div style="display:flex;font-size:14px;">';
				dom += '<div>';
				dom += '<div class="tufa-1-1">突发描述</div>';
				dom += '<div class="tufa-1-2">开始时间</div>';
				dom += '</div>';
				dom += '<div>';
				dom += '<div class="tufa-2-1">'+result.list[i].tfItem+'</div>';
				dom += '<div class="tufa-2-2">'+result.list[i].createTime.slice(0,10)+'</div>';
				dom += '</div>';
				dom += '<div class="tufa-3">';

				//dom += '<div class="tufa-3-1">处理</div>';

				dom += '<div class="height10"></div>';
				dom += '<span href="javascript:;" class="tufa-3-1 set-emergency-to-daliy" emergency-id="'+result.list[i].id+'" emergency-desc="'+result.list[i].tfItem+'">设为日常巡检</span>';
				dom += '<div class="height10"></div>';
				dom += '<span href="javascript:;" class="ignore-emergency-item pointer" style="color:#ff8c11" emergency-id="'+result.list[i].id+'">忽&nbsp略</span>';
				
				
				dom += '</div>';
				dom += '</div>';
				dom += '</div>';
				
				$('#tab-panel-emer').append(dom);
			}
			$('.am-dropdown').dropdown();
		}
	});
};

/**
 * 保存巡检大类
 */

powerRoomCheckListController.saveCheckClass = function(){
	var ClassID   = $('#modal-edit-class-id').val();
	
	var DailyItems = $('#edit-daily-item-preview>table tr[isUpdate=\'true\']');
	var WeekItems  = $('#edit-week-item-preview>table  tr[isUpdate=\'true\']');
	var MonthItems = $('#edit-month-item-preview>table tr[isUpdate=\'true\']');
	var ItemID     = null;
	
	var ItemList = [];
	for(var i=0; i<DailyItems.length; i++){
		ItemID = $(DailyItems[i]).attr('item-id');
		
		(ItemID == '-1') && (ItemID = null);
		
		ItemList.push({
			prXjDefineId : ClassID,
			id              : ItemID,
			xjItem       : $.trim($(DailyItems[i]).find('.item-name-con > input').val()),
			checkType       : '1'
		});
	}
	
	for(var i=0; i<WeekItems.length; i++){
		
		ItemID = $(WeekItems[i]).attr('item-id');
		
		(ItemID == '-1') && (ItemID = null);
		
		ItemList.push({
			prXjDefineId  : ClassID,
			id               : ItemID,
			xjItem        : $.trim($(WeekItems[i]).find('.item-name-con > input').val()),
			weekXjCycle : $(WeekItems[i]).find('select').val(),
			checkType        : '2'
		});
	}
	
	for(var i=0; i<MonthItems.length; i++){
		
		ItemID = $(MonthItems[i]).attr('item-id');
		
		(ItemID == '-1') && (ItemID = null);
		
		ItemList.push({
			prXjDefineId   : ClassID,
			id                : ItemID,
			xjItem         : $.trim($(MonthItems[i]).find('.item-name-con > input').val()),
			monthXjCycle : $(MonthItems[i]).find('select').val(),
			checkType         : '3'
		});
	}

	return prCheckListModel.bacthAddCkeckItems(ItemList);
};
