require('../../scss/work-ticket.scss');

import { Common } from '../common/common';

let app = {
	id: null,
	prId: null,
	ticket: null,
	prefix: null,
	init: {},
	getTicket: {},
	renderTicket: {},
};

$(function () {

	app.init();

});

app.init = function () {

	this.id = Common.getParameter('d');
	this.prId = Common.getParameter('prid');
	app.getTicket();

};


app.getTicket = function () {

	let param = {
		'path': '/dwt/iems/bussiness/gzp/get_gzp_by_id',
		'data': {
			id: this.id
		}
	};

	Common.post(param).subscribe(function (res) {
		if (res.code == '0') {
			app.ticket = res.entity;
			app.prefix = res.prefix;
			app.renderTicket();
		} else {

		}
	});
};

app.renderTicket = function () {

	let ticket = app.ticket;

	let content = ticket.gzpContent.replace(/\\"/g, '"');

	if ( Common.isExperience ){
		let replaceStr = Common.replaceStr;
		for(let i = 0;i < replaceStr.length; i++){
			content = content.replace( RegExp(replaceStr[i],'g'), Common.realName);
		}
		$('#content').html( content );

	}else{

		var snapshot = new Image();
		snapshot.src = app.prefix + ticket.snapshot;
		snapshot.onload = function () {
			$('#snapshot').append(snapshot);
		};

		snapshot.onerror = function () {
			$('#content').html( content );
		};

	}



	//工作结果

	let result = '';
	let prefix = app.prefix;

	if (ticket.qxzzPic && ticket.qxzzPic != 'null' && ticket.qxzzPic.length > 0) {
		let pics = ticket.qxzzPic.split(',');
		for (let j = 0; j < pics.length; j++) {
			result += '<a class="pic" rel="group" href="' + prefix + pics[j] + '"><img style="height:100%" src="' + prefix + pics[j] + '"></a>';
		}
	} else {
		result = '没有上传工作结果';
	}

	$('#work-result').html(result);
	$('.pic').fancybox();

};

