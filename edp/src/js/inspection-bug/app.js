require('../../scss/inspection.bug.scss');

import {Common} from '../common/common'

let app = {

	logId: null,	//巡检日志id
	itemId: null,	//巡检项id
	itemType: null,//巡检项类型	1日常巡检 2复检 3突发

	init: {},

	bind: {},

	getBug: {},
	renderBug: {},

};

$(function () {

	app.init();

});

app.init = function () {

	this.logId = Common.getParameter('logId');
	this.itemId = Common.getParameter('itemId');
	this.itemType = Common.getParameter('itemType');

	this.renderBug()

};

app.getBug = function () {

	let data = {
		"routeId": this.logId,
		"itemId": this.itemId,
		"flag": this.itemType
	};

	let param = {

		data: data,
		path: '/dwt/app/app/get_xj_problem'

	};

	return new Promise(function (resolve, reject) {

		Common.post( param ).subscribe(res => {


			if (res.code == 0) {

				resolve(res);

			} else {

				reject(res.code);
			}

		})

	})
};

app.renderBug = function () {


	this.getBug().then(res => {

		let bug = res.entity;

		$("#power-room").text( bug.prName );
		$("#inspection-grouper").text( bug.xjProple );
		$("#create-time").text( bug.xjTime ?  bug.xjTime.slice( 0, 19 ) : '不详' );
		$("#bug-desc").text( bug.desc );

		let pics = ( bug.pic && bug.pic.length > 0 )? bug.pic.split( ',' ) : [];

		let picsDoms = '';

		for ( let i in pics ){

			if ( pics.hasOwnProperty( i ) ){

				let url = res.prefix + pics[i];

				picsDoms += '<a href="' + url + '" class="gallery-pic" data-fancybox-group="gallery">';
				picsDoms += '<img src="' + url + '" class="pic">';
				picsDoms += '</a>';

			}
		}

		$("#bug-pics").html( picsDoms );

		$('.gallery-pic').fancybox();

		//如果有抢修日志

		if( bug.qxOrderId ){

			$("#repair-log-link").attr( 'href', './repair-log.do?d=' + bug.qxOrderId );
			$("#repair-log").css( 'display', 'table');

		}else{

			$("#repair-log").hide();

		}

	})


};

