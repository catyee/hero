
require('../../scss/work-ticket.scss');

import {Common} from '../common/common';

let local = {
	id: null,
	prId: null,
	ticket: null,
	prefix: null,
	init: {},
	getTicket: {},
	renderTicket: {},
};

$(function () {

	local.init();

});

local.init = function () {

	this.id = Common.getParameter('d');
	this.prId = Common.getParameter('prid');
	local.getTicket();

};

local.getTicket = function () {
	let param = {
		'path': '/dwt/iems/bussiness/czp/get_czp_by_id',
		'data': {
			id: this.id
		}
	};

	Common.post(param).subscribe(function (res) {
		if (res.code == '0') {
			local.ticket = res.entity;
			local.prefix = res.prefix;
			local.renderTicket();
		} else {

		}
	});
};

local.renderTicket = function () {

	let ticket = local.ticket;

	let content = ticket.content.replace(/\\"/g, '"');

	if ( Common.isExperience ){
		let replaceStr = Common.replaceStr;

		for(let i = 0;i < replaceStr.length; i++){
			content = content.replace( RegExp(replaceStr[i],'g'), Common.realName);
		}

		$('#content').html( content );

	}else{

		var snapshot = new Image();
		snapshot.src = local.prefix + ticket.snapshot;
		snapshot.onload = function () {
			$('#snapshot').append(snapshot);
		};

		snapshot.onerror = function () {
			$('#content').html( content );
		};

	}


	//工作结果

	let result = '';
	let prefix = local.prefix;

	if (ticket.xjzzCzpPic && ticket.xjzzCzpPic != 'null' && ticket.xjzzCzpPic.length > 0) {

		let pics = ticket.xjzzCzpPic.split(',');

		for (let j = 0; j < pics.length; j++) {

			result += `<a class="pic" rel="group" href="${ prefix + pics[j] }"><img style="height:100%" src="${ prefix + pics[j] }"></a>`;

		}

	} else {

		result = '没有上传工作结果';

	}

	$('#work-result').html(result);
	$('.pic').fancybox();
};

