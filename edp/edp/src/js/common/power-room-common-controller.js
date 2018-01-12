/**
 * 配电室公用信息 
 */
import { moni } from './common';
import { powerRoomModel } from './power-room-model';

var powerRoomCommonController = {

	/*初始化配电室的基本信息*/

	initPowerRoomBaseInfo : null,
	
	/*初始化一次接线图按钮*/

	initYCJXTButton : null,
	
	/*配电室基本信息*/

	baseInfo : null,
	
	isUp : false
};

/***
 * 初始化配电室信息
 */

powerRoomCommonController.initPowerRoomBaseInfo = function(callback){

	powerRoomModel.getPowerRoomBaseInfo().subscribe(function(res){
		if(res.code == '0'){
			var baseInfo = res.entity;
			powerRoomCommonController.prefix = res.prefix;
			$('#toYCJXTpage').attr('collect-mode',baseInfo.collectMode);
			$('#toYCJXTpage').attr('power-room-id');
			$('#power-room-name').text(baseInfo.prName);
			$('#power-room-address').text(baseInfo.province+' '+baseInfo.city+' '+(baseInfo.area?baseInfo.area:'')+' '+baseInfo.address);
			$('#power-room-grade').text(baseInfo.prGrade.grade+'级');
			$('#power-room-desc').text(baseInfo.prDesc);
			$('#customer-name').text(baseInfo.customer.cusName);
			$('#customer-contactor').text(baseInfo.customer.lxr1);
			$('#customer-mobile').text(baseInfo.customer.lxr1Mobile);
			$('#teamer-name').text(baseInfo.ztzUser.realName?baseInfo.ztzUser.realName:'不详');
			$('#teamer-mobile').text(baseInfo.ztzUser?baseInfo.ztzUser.lxMobile:'不详');

			if(typeof callback === 'function'){
				callback();
			}
		}
	});
};

/***
 * 初始化一次接线图按钮
 */

powerRoomCommonController.initYCJXTButton = function(){
	$('#toYCJXTpage').click(function(){
		if(!moni.isIE()){
			$('#notIETips').modal();
			return false;
		}
		var powerRoomId = $('#power-room-id').val();

		window.open('./jkviewer.html?prid='+powerRoomId);
	});
};


/***
 * 隐藏 和 出现
 */

$('#base-info-panel').click(function () {
	
	if(powerRoomCommonController.isUp == false){
		$('#base-info-panel').slideUp(500);
		powerRoomCommonController.isUp = true;
	}
});

$('#base-info-header').click(function () {
	if(powerRoomCommonController.isUp == true){
		
		$('#base-info-panel').slideDown(500);
		powerRoomCommonController.isUp = false;
	}else{
		$('#base-info-panel').slideUp(500);
		powerRoomCommonController.isUp = true;
		
	}

});

exports.powerRoomCommonController = powerRoomCommonController;










