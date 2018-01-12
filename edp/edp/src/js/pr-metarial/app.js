/**
 *
 */
require('../../scss/pr-metarial.scss');

import { powerRoomCommonController } from '../common/power-room-common-controller';
import { powerRoomModel } from '../common/power-room-model';
import { moni } from '../common/common';
import { commonModel } from '../common/common-model';
import { commonCtrl } from '../common/common-controller';

require('../common/system-warning-service.js');

var powerRoomMetarialController = {
	initPowerRoomFileList: {},
	initSystemFileList: {},
	initPowerRoomBaseInfo: {},
	sysFileList: [],   //保存系统文件列表
	fileBaseUrl: '',   //保存文件路径的前缀

};
var updateCode = 0;
$(function () {

	powerRoomMetarialController.initPagesPath();

	//初始化配电室基本信息

	powerRoomCommonController.initPowerRoomBaseInfo();

	//初始化一次接线图按钮

	powerRoomCommonController.initYCJXTButton();

	powerRoomMetarialController.initPowerRoomFileList();
	powerRoomMetarialController.initSystemFileList();

	/*添加文件至配电室*/

	$('#system-metarial').delegate('.add-file-to-power-room', 'click', function (e) {
		var fileID = $(this).attr('file-id');
		var dom = $(this).parent().clone();
		$(dom).css('position', 'fixed');
		$(dom).css('z-index', '100');
		$(dom).css('background', 'rgba(0,0,0,0.3)');
		$(dom).css('top', (e.clientY) + 'px');
		$(dom).css('left', (e.clientX - 850) + 'px');
		$('body').append(dom);

		$(dom).animate({
			'top': (e.clientY + 500) + 'px',
			'left': (e.clientX - 580) + 'px',
			'opacity': '0',
			'width': '500px'
		}, function () {
			$(dom).remove();
			powerRoomModel.setFileToPowerRoom(fileID, $('#power-room-id').val()).subscribe(function (result) {

				// console.log(result)

				powerRoomMetarialController.initPowerRoomFileList();
				powerRoomMetarialController.initSystemFileList();
			});
		});


	});

	/*删除配电室文件*/

	$('#power-room-metarial').delegate('.remove-power-room-file', 'click', function () {
		var referID = $(this).attr('refer-id');
		var fileId = $(this).attr('file-id');
		powerRoomModel.setFileOutFromPowerRoom(referID, fileId).subscribe(function (result) {

			powerRoomMetarialController.initPowerRoomFileList();
			powerRoomMetarialController.initSystemFileList();
		});

	});

	// }

	/***
     * 索搜系统文件
     */

	$('#search-material').click(function () {
		powerRoomMetarialController.initSystemFileList(true);
	});
	$('#search-material-keyword').keyup(function (e) {
		if (e.keyCode == 13) {
			powerRoomMetarialController.initSystemFileList(true);
		}
	});

	/*预览文件*/

	$('body').delegate('.material-name', 'click', function () {
		window.open($(this).attr('path'));
	});

	//显示配电室资料提示

	$('#show-pr-file-tips').click(function () {

		$('#pr-file-tips-modal').modal();

	});
});


/**
 * 初始化 扩展信息各个item标题(相关资料，抢修日志，巡检日志，巡检项目)的路径
 */
powerRoomMetarialController.initPagesPath = function () {
	this.prId = moni.getParameter('prid');
	$('#toPrMetarial').attr('href','pr-metarial.html?prid='+this.prId);
	$('#toRepairLog').attr('href','pr-repair-log.html?prid='+this.prId);
	$('#toInspectionLog').attr('href','pr-inspection-log.html?prid='+this.prId);
	$('#toPrCheck').attr('href','pr-check-list.html?prid='+this.prId);
}


/***
 * 初始化配电室信息
 */

powerRoomMetarialController.initPowerRoomBaseInfo = function () {
	var powerRoomId = $('#power-room-id').val();
	powerRoomModel.getPowerRoomBaseInfoById(powerRoomId, function (result) {
		if (result.code == '0') {
			$('#power-room-name').text(result.prName);
			$('#power-room-address').text(result.prProvince + ' ' + result.prCity + ' ' + (result.prArea ? result.prArea : '') + ' ' + result.prAddress);
			$('#power-room-grade').text(result.prGrade + '级');
			$('#power-room-desc').text(result.prDesc);
			$('#customer-name').text(result.cusName);
			$('#customer-contactor').text(result.contactPerson);
			$('#customer-mobile').text(result.contactPersonMobile);
			$('#teamer-name').text(result.headName);
			$('#teamer-mobile').text(result.headMobile);
		}
	});
};

/***
 * 初始化配电室文件列表
 */

powerRoomMetarialController.initPowerRoomFileList = function (powerRoomId) {
	var powerRoomId = this.prId;
	powerRoomModel.getPowerRoomFileList(powerRoomId).subscribe(function (result) {
		if (result.code == '0') {
			powerRoomMetarialController.prefix = result.prefix;
			$('#power-room-metarial').empty();
			var fileTpl = '<div class="materal-item">';
			fileTpl += '<div class="material-name" path="{fileUrl}" title="{fileFullName}">{fileName}</div>';
			fileTpl += '<div>{date}上传</div>';
			fileTpl += '{removeDiv}';
			var dom = '';
			updateCode = 0;
			var roleType = commonModel.privilege;

			//console.log(roleType)

			if (roleType != null) {
				if ('IEMS_PR_UPDATE' in roleType) {
					updateCode = 1;

				}
			}

			var length = result.list.length;
			for (var i = 0; i < length; i++) {

				var fileFullName = result.list[i].sysFile.fileName;
				var fileName = (fileFullName.length > 20) ? (fileFullName.slice(0, 19) + '...') : fileFullName;
				var date = result.list[i].lastModifyTime ? result.list[i].lastModifyTime.slice(0, 19) : '未知时间';
				var fileId = result.list[i].sysFile.id;
				var referId = result.list[i].id;
				var fileUrl = result.prefix + result.list[i].sysFile.fileUrl;
				var removeDiv = '';
				if (updateCode) {
					removeDiv = '<div file-id="' + fileId + '" class="remove-power-room-file" refer-id="' + referId + '"><i class="iconfont font15">&#xe77b;</i>删除</div>';
				} else {
					removeDiv = '<div ></div>';
				}

				dom = fileTpl.replace('{fileUrl}', fileUrl)
					.replace('{fileFullName}', fileFullName)
					.replace('{fileName}', fileName)
					.replace('{date}', date)
					.replace('{removeDiv}', removeDiv);

				$('#power-room-metarial').append(dom);
			}
		}
	});
};

if ($('#upload-power-room-file-btn').length > 0) {

	var ajaxupload = new AjaxUpload($('#upload-power-room-file-btn'), {
		action: 'http://' + location.host + '/file_upload.do',
		type: 'POST',
		data: {
			from: 1,
			type: 1
		},
		autoSubmit: false,
		responseType: 'json',
		name: 'file',
		onChange: function (file, ext) {

			//文件类型检测

			if (ext && (/^(png)$/.test(ext))) {

			}
			ajaxupload.submit();

		},

		onComplete: function (file, result) {
			if (result.code == '0') {
				powerRoomModel.addSystemFile(result.resultPath, file).subscribe(function (result) {
					if (result.code == 0) {
						powerRoomModel.setFileToPowerRoom(result.id, $('#power-room-id').val()).subscribe(function (result) {
							powerRoomMetarialController.initPowerRoomFileList();
							powerRoomMetarialController.initSystemFileList();
						});
					}
				});

			}
		}
	});

}

/***
 * 初始化系统文件列表
 * 如果sysFileList为空 或者forceUpdate == true 这调取api获取
 * 否则直接显示sysFileList里的数据
 */

powerRoomMetarialController.initSystemFileList = function (forceUpdate) {
	var powerRoomId = $('#power-room-id').val();
	var fileName = $.trim($('#search-material-keyword').val());
	if (fileName.length == 0) {
		fileName = null;
	}

	powerRoomModel.getSystemFileList(powerRoomId, fileName).subscribe(function (result) {
		if (result.code == '0') {
			powerRoomMetarialController.sysFileList = result.list;
			powerRoomMetarialController.fileBaseUrl = result.prefix;
			createTableContent();
		}
	});



	function createTableContent() {
		var fileList = powerRoomMetarialController.sysFileList;
		var baseUrl = powerRoomMetarialController.fileBaseUrl;
		$('#system-metarial').empty();
		var fileTpl = '<div class="materal-item">';
		fileTpl += '<div class="material-name" path="{fileUrl}" title="{fileFullName}">{fileName}</div>';
		fileTpl += '<div>{date}上传</div>';
		fileTpl += '{AddFileDiv}';

		var dom = '';
		var roleType = $.cookie('roleType');
		var length = fileList.length;
		for (var i = 0; i < length; i++) {

			var fileFullName = fileList[i].fileName;
			var fileName = (fileFullName.length > 20) ? (fileFullName.slice(0, 19) + '...') : fileFullName;
			var date = fileList[i].lastModifyTime ? fileList[i].lastModifyTime.slice(0, 19) : '未知时间';
			var fileId = fileList[i].id;
			var fileUrl = baseUrl + fileList[i].fileUrl;
			var flag = fileList[i].flag;

			//if(updateCode) {

			var AddFileDiv = '<div file-id="' + fileList[i].id + '" class="add-file-to-power-room"><i class="iconfont font15">&#xe616;</i>添加</div>';
			if (flag == '1') {
				AddFileDiv = '<div class=\'color-gray-b\'>已添加</div>';
			}
			dom = fileTpl.replace('{fileUrl}', fileUrl)
				.replace('{fileFullName}', fileFullName)
				.replace('{fileName}', fileName)
				.replace('{date}', date)
				.replace('{AddFileDiv}', AddFileDiv);

			// }else {
			/* dom = fileTpl.replace('{fileUrl}', fileUrl)
                    .replace('{fileFullName}', fileFullName)
                    .replace('{fileName}', fileName)
                    .replace('{date}', date)
                    .replace('{AddFileDiv}', ' ');*/
			//  }

			$('#system-metarial').append(dom);
		}

	}
};

