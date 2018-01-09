
require( '../../scss/repair-log.scss' );

import {Common} from '../common/common';
import {model} from './model';

let app = {
	init: {},
	getLog: {},
	renderLog: {},
};

$(function () {
	
	app.init();
	
});

app.init = function () {
	
	model.id = Common.getParameter('d');
	model.prId = Common.getParameter('prid');
	app.getLog();
	
};

app.getLog = function () {
	
	model.getLog().subscribe(function (res) {
		if (res) {
			app.renderLog();
		}
	});
	
};

app.renderLog = function () {
	let log = model.log;

	//体验账号替换掉配电室名字

	log.problemDesc = log.problemDesc? log.problemDesc:'';
	if( Common.isExperience ){
		let replaceStr = Common.replaceStr;
		for(let i = 0;i < replaceStr.length; i++){
			log.problemDesc = log.problemDesc.replace( RegExp(replaceStr[i],'g'), Common.realName);
		}
	}
	let prName = Common.isExperience ? Common.experiencePrName : log.pr.prName;

	$('#title').text(prName + '巡检日志');
	$('#power-room-name').text(prName);
	$('#alarm-time').text(model.alarmTime);
	$('#alarm-content').text(log.problemDesc);
	$('#repair-programme').text(log.qxProgramme ? log.qxProgramme : '没有制定抢修方案');

	$('#repair-proccess').empty();
	let proccessHtml = '';
	let timeHtml = '';

	timeHtml += '<div>' + model.alarmTime + '</div>';

	proccessHtml += '<div class="circle-success"><div class="check"></div></div>';
	proccessHtml += '<div class="bar-success" style="margin-left:-2px;"></div>';
	proccessHtml += '<div class="circle-success" style="margin-left:-2px;"><div class="check"></div></div>';

	timeHtml += '<div>' + model.startSurveyTime + '</div>';

	proccessHtml += '<div class="bar-success"  style="margin-left:-2px;"></div>';
	proccessHtml += '<div class="circle-success"  style="margin-left:-2px;"><div class="check"></div></div>';
	timeHtml += '<div>' + model.startRepairTime + '</div>';


	proccessHtml += '<div class="bar-success"  style="margin-left:-2px;"></div>';
	proccessHtml += '<div class="circle-success"  style="margin-left:-2px;"><div class="check"></div></div>';
	timeHtml += '<div>' + model.completeRepairTime + '</div>';


	$('#repair-proccess').html(proccessHtml);
	$('#repair-proccess-time').html(timeHtml);
	
	let repairTask = model.repairTask;

	let dom = '';

	if (repairTask) {

		dom = '<div class="height10"></div>';
		dom += '<div>';
		dom += repairTask.taskDesc;
		dom += '</div>';
		dom += '<div style="display:flex;">';
		let pics = repairTask.picUrl.length > 0 ? repairTask.picUrl.split(',') : [];
		if (pics.length > 0) {

			dom += '<div style="width:64px;height:64px;overflow:hidden;border:1px solid #ccc;display:flex; align-items:center;">';

			for (let i = 0; i < pics.length; i++) {
				dom += '<a href="' + model.prefix + pics[i] + '" class="repair-pic" data-fancybox-group="gallery">';
				dom += '<img src="' + model.prefix + pics[i] + '" width="64" class="pic">';
				dom += '</a>';
			}
			dom += '</div>';
		}
		dom += '<div style="width:20px">';
		dom += '</div>';
		dom += '</div>';
		dom += '<div class="height10">';
		dom += '</div>';
		dom += '<div class="height10">';
		dom += '</div>';
		dom += '</div>';

	} else {

		dom = '无抢修记录';

	}

	$('.repair-pic').fancybox();
	$('#repair-result').html(dom);
};

