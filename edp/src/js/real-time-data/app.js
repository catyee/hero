require('../../scss/common/common.scss');
import { POSITIONCLASSIFY,ROLES } from '../common/common.enum';

import { Common } from '../common/common'
import { RTDModel } from './real-time-data-model';
import { UI } from '../common/ui';

let app = {
	prId: null,				//配电室id
	serverAddress: null,
	RTDSocket: null,		//属性 获取实时数据的websocket
	searchType: 'AI',
	dataCells : [],			//保存显示实时值的td
	classifySelector : null,//分类选择器
	dispatchSelector : null,//调度号选择器
	typeBtnGroup :	null,	//AI/DI按钮组
	messageTimer : null,	//与socket对话的定时器

	getRealData: {},
	init: {},				//方法 初始化
	bind: {},				//方法  事件绑定
	getDispatchMum: {},     //方法  获取调度号列表
	getTagList: {},			//方法  获取标签列表
	initRTDSocket: {},		//方法 初始化获取实时数据的websocket
	renderDispatchMum: {},	//方法 渲染调度号列表
	updateData: {},			//方法 更新数据
};

$(function () {
	app.init()
});

//初始化

app.init = function () {

	app.prId = Common.getParameter('prid');

	app.classifySelector = new UI.Selector( 'classify' );

	let classify = POSITIONCLASSIFY.slice(1);
	app.classifySelector.update( classify, classify[0].value);

	app.dispatchSelector = new UI.Selector( 'dispatchMum' );
	app.typeBtnGroup = new UI.ButtonGroup( 'tag-type-btn-group' );

	app.initRTDSocket();

	app.bind();

};

//事件绑定

app.bind = function () {

	let _this = this;

	$('#classify').on('change', function () {

		app.getDispatchMum();

	});

	$('#dispatchMum').on('change', function (e) {

		app.getTagList();

	});

	$('#data-panel .btn').on('click', function () {
		app.searchType = $(this).attr('search-type');
		$(".which").removeClass("btn-success");
		$(this).addClass("btn-success");
		switch (app.searchType.toString()) {
			case "AI":
				$("#AI-panel .select").css("display", "flex");
				break;
			case "DI":
				$("#AI-panel .select").css("display", "none");
				break;

		}
		app.getTagList();
	});

	//绑定分类选择器

	app.classifySelector.change( function () {

		_this.getDispatchMum();

	});

	//绑定调度号选择器

	app.dispatchSelector.change( function () {

		_this.getTagList()

	});

	//绑定DI/AI按钮组

	app.typeBtnGroup.change( function ( value ) {

		_this.getTagList();

		let unitTitle = $("#unit-title");

		if ( value === 'DI' ){

			unitTitle.hide();

		}else{

			unitTitle.show();

		}

	})


};

/*获取调度号列表*/

app.getDispatchMum = function () {

	let ct = this.classifySelector.selected;

	RTDModel.getDispatchMum(app.prId, ct).subscribe(function (res) {

		if (res) {

			app.renderDispatchMum();

			app.getTagList();

		}

	})

};

//获取标签列表

app.getTagList = function () {

	let t = app.typeBtnGroup.selected;
	let ct = app.classifySelector.selected;
	let ddN = app.dispatchSelector.selected;

	RTDModel.getTagList(app.prId, t, ct, ddN).subscribe(function (res) {

		if ( app.messageTimer ){

			clearTimeout( app.messageTimer );

		}

		$("#DDN-desc").text( '' );

		if (res.code == 0) {

			$('#empty-tips').empty();

			if (res.list.length) {

				$('#thead').show();

				$('#real-list').empty();

				let indexes = [];
				app.dataCells = [];

				let DDNDesc;

				for (let i = 0; i < res.list.length; i++) {

					let item = res.list[i];

					let strs = item.cn && item.cn.split( ' ' );

					if ( !DDNDesc ){

						DDNDesc = strs[0];
					}

					let tr = document.createElement( 'tr' );
					let indexTd = document.createElement( 'td' );
					let tagNameTd = document.createElement( 'td' );
					let RTDataTd = document.createElement( 'td' );
					let unitTd = document.createElement( 'td' );

					indexTd.innerText = ( i+1 );
					tagNameTd.innerText = strs[1];
					unitTd.innerText = item.un;

					app.dataCells.push( RTDataTd );

					tr.appendChild( indexTd );
					tr.appendChild( tagNameTd );
					tr.appendChild( RTDataTd );

					if ( app.typeBtnGroup.selected === 'AI' ){

						tr.appendChild( unitTd );

					}

					app.list = res.list;
					let obj = {};
					obj.index = res.list[i].i;
					obj.type = res.list[i].t;

					indexes.push(obj);

					$('#real-list').append( tr );
				}

				$("#DDN-desc").text( DDNDesc );

				let param = {};
				param.Indexs = indexes;
				param.code = 0;
				app.socket.send(JSON.stringify(param));

			} else {
				$('#real-list').children().remove();
				if (app.socket) {
					app.socket.send(JSON.stringify({
						Indexs : [],
						code : 0
					}));
				}

				$('#thead').hide();
				Common.emptyTips('empty-tips', '没有数据');
			}

		}

	})
};

//渲染调度号列表

app.renderDispatchMum = function () {

	let dispatchMumList = RTDModel.dispatchMum;
	let length = dispatchMumList.length;
	let data = [];

	for (let i = 0; i < length; i++) {

		data.push({
			value : dispatchMumList[i].ddN,
			content : dispatchMumList[i].ddN
		})

	}

	let selected;

	if ( length > 0){

		selected = dispatchMumList[0].ddN;
	}

	app.dispatchSelector.update( data, selected );

};

//初始化获取实时数据的websocket

app.initRTDSocket = function () {

	/*获取serverAddress*/

	RTDModel.getPrById(app.prId).subscribe(function (res) {

		let getRealData = function () {

			if (app.socket) {
				app.socket.close();
			}

			app.socket = new WebSocket(RTDModel.JKRDTWebsocket.replace("{IP}", app.serverAddress));

			app.socket.onopen = function () {

				app.getDispatchMum();

			};

			app.socket.onmessage = function (res) {

				let data = JSON.parse(res.data);
				app.updateData(data);

				app.messageTimer = setTimeout(function () {

					let param = {code: 1};
					app.socket && app.socket.send(JSON.stringify(param));

				}, 5000)

			};

			app.socket.onerror = function () {

				setTimeout( function () {

					app.initRTDSocket();

				}, 5000)

			}

		};
		if (res.code == 0) {
			app.serverAddress = res.entity.server.serverAddress;
			getRealData();
		}
	});

};

//更新数据

app.updateData = function (data) {

	data = data.Values;

	let dataCells = this.dataCells;

	for (let i in dataCells ) {

		let value = data[i];

		if (value == null || value == undefined) {

			value = '-';

		}else if( this.typeBtnGroup.selected == "DI" ){

			value = ( value == 1 ? '合' : '分' );

		}else{

			value = value.toFixed(2);

		}

		dataCells[i].innerText = value;

	}

};



