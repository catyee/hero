require('../../scss/common/common.scss');
require('../../scss/history-data.scss');

import { POSITIONCLASSIFY,ROLES } from '../common/common.enum';

import {Common} from '../common/common';
import {UI} from '../common/ui';
import {model} from './model';

let app = {

	classifySelector: null,
	dispatchSelector: null,
	intervalSelector: null,
	typeCheckBox: null,
	dataFlexTable: null,

	init: {},				//方法 初始化
	initLayout : {},		//方法 初始化布局
	bind: {},				//方法  事件绑定
	getDispatchMum: {},  	//方法  获取调度号列表
	renderDispatchMum: {}, 	//方法  渲染调度号列表
	initDateRange: {},		//方法 初始化日期区间
	getType: {},			//方法 获取点的类型
	renderType: {},			//方法 渲染点类型列表
	getHistoryData: {},		//方法 获取历史数据
	renderHistoryData: {},	//方法 渲染历史数据
	exportHistoryData: {},	// 导出历史数据

	setDayRangeConfig: {},	//获取日数据的时间选择器的配置
	setHourRangeConfig: {},	//获取日数据的时间选择器的配置
	setHalfHourRangeConfig: {},	//获取日数据的时间选择器的配置
	setMinuteRangeConfig: {},	//获取日数据的时间选择器的配置
	setFiveSecondRangeConfig: {},	//获取日数据的时间选择器的配置

};

$(function () {
	app.init();
});

//初始化

app.init = function () {

	model.prId = Common.getParameter('prid');

	app.initLayout();

	this.classifySelector = new UI.Selector('classify');
	this.dispatchSelector = new UI.Selector('dispatchMum');
	this.intervalSelector = new UI.Selector('select-interval');
	this.typeCheckBox = new UI.CheckBox({
		id: 'type-check-box'
	});

	this.dataFlexTable = new UI.FlexTable({
		id: 'data-flex-table'
	});


	this.classifySelector = new UI.Selector( 'classify' );

	let classify = POSITIONCLASSIFY.slice(1);
	this.classifySelector.update( classify, classify[0].value);

	app.initDateRange( this.intervalSelector.selected );
	app.getDispatchMum();
	app.bind();
	app.isNew = true;

};

//初始化布局

app.initLayout = function () {

	let windowHeight = window.innerHeight;
	let headerPlaceHolderHeight = document.querySelector( '.header-placeholder').offsetHeight;

	let height = windowHeight - headerPlaceHolderHeight;

	document.querySelector( '.container' ).style.height = height - ( headerPlaceHolderHeight / 3 ) + 'px';

};

//事件绑定

app.bind = function () {

	//位置选择器发生变化

	this.classifySelector.change(function () {

		app.getDispatchMum();

	});


	//时间粒度选择器发生变化

	this.intervalSelector.change(function ( value ) {

		app.initDateRange ( value.value );

	});


	//调度号选择器发生变化

	this.dispatchSelector.change(function ( value ) {

		app.getType();

	});


	//点击搜索按钮

	$('#query').on('click', function () {

		app.getHistoryData();

	});

	//监听选择类型的变化
	this.typeCheckBox.change(function (data) {

		console.log(data);

	})
};

//初始化日期区间

app.initDateRange = function ( interval ) {

	interval = parseInt( interval );
	model.duration = interval;

	let dateRangeForDay = $("#date-range-for-day");
	let dateRangeForHour = $("#date-range-for-hour");
	let dateRangeForHalfHour = $("#date-range-for-half-hour");
	let dateTimeForMinute = $("#date-time-for-minute");
	let dateTimeFor5Seconds  = $("#date-time-for-5-seconds");

	dateRangeForDay.hide();
	dateRangeForHour.hide();
	dateRangeForHalfHour.hide();
	dateTimeForMinute.hide();
	dateTimeFor5Seconds.hide();

	switch ( model.duration ){

		case model.types.day :  dateRangeForDay.show(); this.setDayRangeConfig(); break;
		case model.types.hour :  dateRangeForHour.show(); this.setHourRangeConfig(); break;
		case model.types.halfHour : dateRangeForHalfHour.show(); this.setHalfHourRangeConfig();  break;
		case model.types.minute :  dateTimeForMinute.show(); this.setMinuteRangeConfig(); break;
		case model.types.fiveSecond : dateTimeFor5Seconds.show(); this.setFiveSecondRangeConfig(); break;

	}

};

//处理选中日期的事件

app.handleDateChange = function ( startLine, endLine ) {

	//只有选择分钟和5秒的时候没有endline

	if ( endLine.year ){

		startLine = (new Date(startLine.year,
			startLine.month - 1,
			startLine.date,
			0,
			0,
			0)).getTime();

		endLine = (new Date(endLine.year,
			endLine.month - 1,
			endLine.date,
			23,
			59,
			59)).getTime();

	}else {

		startLine = (new Date(startLine.year,
			startLine.month - 1,
			startLine.date,
			startLine.hours,
			0,
			0)).getTime();

		endLine = startLine + ( 60 * 60 * 1000 );
	}

	model.ranges[model.duration].startLine = startLine;
	model.ranges[model.duration].endLine = endLine;


};

/*获取调度号列表*/

app.getDispatchMum = function () {

	let ct = this.classifySelector.selected;

	model.getDispatchMum(model.prId, ct).subscribe(function (res) {
		if (res) {
			app.renderDispatchMum();
			app.getType();
		}
	})
};

//渲染调度号列表

app.renderDispatchMum = function () {

	let dispatchMumList = model.dispatchMum;
	let length = dispatchMumList.length;

	let list = []

	for (let i = 0; i < length; i++) {

		list.push({
			value: dispatchMumList[i].ddN,
			content: dispatchMumList[i].ddN
		});

	}

	let selected;

	if (length > 0) {

		selected = dispatchMumList[0].ddN;

	}

	this.dispatchSelector.update(list, selected);


};

/*获取点的类型*/

app.getType = function () {

	let ct = this.classifySelector.selected;
	let ddN = this.dispatchSelector.selected;
	let t = model.searchType;

	let _this = this;

	model.getType(model.prId, ct, ddN, t).subscribe(function (res) {

		if (res) {

			let list = [];
			let types = model.type;

			for (let i in types) {

				list.push({

					value: types[i].id.toString(),
					content: types[i].typeName

				})

			}

			_this.typeCheckBox.update({

				data: list,
				defaultChecked: 6

			});

			_this.getHistoryData();

		}

	})
};

/*渲染点的类型*/

app.renderType = function () {

	$('#checkType').children().remove();
	let res = model.type;
	let typeStr = '';
	for (let i = 0; i < res.length; i++) {
		typeStr += '<label style="margin-left: 10px"><input class="check-type" type="checkbox" value="' + res[i].id + '">' + res[i].typeName + '</label>'
	}
	$('#checkType').append(typeStr);

	if (app.isNew) {
		app.getHistoryData();
	} else {
		app.isNew = false;
	}

}

/*获取历史数据*/

app.getHistoryData = function () {

	UI.showProgress();

	let prId = model.prId;
	let ddN = this.dispatchSelector.selected;
	let initBeginTime = model.ranges[ model.duration ].startLine;//开始时间
	let initEndTime = model.ranges[ model.duration ].endLine;//结束时间

	if (new Date().getTime() < initBeginTime) {

		initBeginTime = new Date().getTime();

	}

	if (new Date().getTime() < initEndTime) {

		initEndTime = new Date().getTime();

	}

	model.typeIds = this.typeCheckBox.checked;

	app.typeIds = [];

	model.getHistoryData(prId, ddN, initBeginTime, initEndTime, model.duration, model.typeIds).subscribe(function (res) {

		let dataTable = $("#data-flex-table");
		let emptyTip  = $("#empty-tips");

		if (res.code == 0 && res.list.length && res.timeList.length) {

			dataTable.show();
			emptyTip.hide();
			app.renderHistoryData(res);

		} else {

			dataTable.hide();
			emptyTip.show();
			emptyTip.empty();
			Common.emptyTips( 'empty-tips', '该时段内没有数据' );
			UI.hideProgress();

		}
	})
};

/*渲染历史数据*/

app.renderHistoryData = function ( res ) {

	if (res.list.length) {


		let header = [];
		let body = [];
		let firstCol;

		let list = res.list;

		//时间

		firstCol = res.timeList;


		/*构造表头*/

		for (let i = 0; i < list.length; i++) {

			if (list[i].varTypes.length) {

				let item = {

					content : list[i].typeName,
					children : []

				};

				for (let j = 0; j < list[i].varTypes.length; j++) {

					let unit = (list[i].varTypes[j].unit ? '(' + list[i].varTypes[j].unit + ')' : '');
					item.children.push( list[i].varTypes[j].type +  unit);

				}

				header.push(item);
			}
		}


		/*构造表的内容*/

		$('#history-value').children().remove();

		for (let i = 0; i < res.timeList.length; i++) {

			body[i] = [];

			for (let j = 0; j < list.length; j++) {


				if (list[j].varTypes.length) {

					let length = list[j].varTypes.length;

					for (let k = 0; k < length; k++) {

						let value = parseFloat( list[j].varTypes[k].values[i] );
						value = ( !isNaN( value ) && ( value || value == 0 ) ) ? value.toFixed( 2 ) : '-' ;
						body[i].push( value );

					}
				}
			}
		}

		this.dataFlexTable.update({
			title: ['项目', '时间'],
			header: header,
			firstColumns: firstCol,
			data: body
		});

		UI.hideProgress();

	}

}

/*导出历史数据*/

app.exportHistoryData = function () {

	$('#export').on('click', function () {
		$("#history-table").table2excel({
			name: "历史数据",
			filename: "历史数据"
		});
	})

};

//设置日数据的配置

app.setDayRangeConfig = function () {

	if ( this.dateRangeForDay ){
		return false;
	}

	let _this = this;

	let dateUtils = new DateUtils();

	let today = dateUtils.getFomattedDate('yyyy-MM-dd');

	let endLine = dateUtils.getMillisecondOfDate() + 86400000;

	dateUtils.subDays( 31 );

	let startLine = dateUtils.getMillisecondOfDate();

	let before = dateUtils.getFomattedDate('yyyy-MM-dd');

	let defaultRange = before + ' 至 ' + today;

	$("#date-range-for-day").val(defaultRange);

	model.ranges[ model.duration ] = {

		startLine : startLine,
		endLine : endLine

	};

	_this.dateRangeForDay = laydate.render({
		elem: '#date-range-for-day',
		theme: '#e9be3b',
		type: 'date',
		max: today,
		format: 'yyyy-MM-dd',
		range: '至',
		value: defaultRange,
		btns:['confirm'],
		done: function (value, date, endDate) {

			_this.handleDateChange( date, endDate );

		},
		change: function(value, date, endDate){

			let startLine = (new Date(date.year,
				date.month - 1,
				date.date,
				0,
				0,
				0)).getTime();

			let endLine = (new Date(endDate.year,
				endDate.month - 1,
				endDate.date,
				23,
				59,
				59)).getTime();

			console.log( 'range:'+_this.range + ',endLine - startLine='+(endLine - startLine));

			if( endLine - startLine > 31536000000 ){

				_this.dateRangeForDay.hint( '不能超过365天');
				return false;

			}

		}

	});

};

//获取时数据的配置

app.setHourRangeConfig = function () {

	if ( this.dateRangeForHour ){

		return false;

	}

	let _this = this;

	let dateUtils = new DateUtils();

	let today = dateUtils.getFomattedDate('yyyy-MM-dd');

	let endLine = dateUtils.getMillisecondOfDate() + 86400000;

	dateUtils.subDays( 7 );

	let startLine = dateUtils.getMillisecondOfDate();

	let before = dateUtils.getFomattedDate('yyyy-MM-dd');

	let defaultRange = before + ' 至 ' + today;

	$("#date-range-for-hour").val(defaultRange);

	model.ranges[ model.duration ] = {

		startLine : startLine,
		endLine : endLine

	};

	_this.dateRangeForHour = laydate.render({
		elem: '#date-range-for-hour',
		theme: '#e9be3b',
		type: 'date',
		max: today,
		format: 'yyyy-MM-dd',
		range: '至',
		value: defaultRange,
		btns:['confirm'],
		done: function (value, date, endDate) {

			_this.handleDateChange( date, endDate );

		},
		change: function(value, date, endDate){

			let startLine = (new Date(date.year,
				date.month - 1,
				date.date,
				0,
				0,
				0)).getTime();

			let endLine = (new Date(endDate.year,
				endDate.month - 1,
				endDate.date,
				23,
				59,
				59)).getTime();

			if ( endLine - startLine > 604800000 ){

				_this.dateRangeForHour.hint( '建议时间区间不超过7天');
				return false;

			}

		}

	});

};

//设置半小时数据的时间选择器的配置

app.setHalfHourRangeConfig = function () {

	if ( this.dateRangeForHalfHour ){

		return false;

	}

	let _this = this;

	let dateUtils = new DateUtils();

	let today = dateUtils.getFomattedDate('yyyy-MM-dd');

	let endLine = dateUtils.getMillisecondOfDate() + 86400;

	dateUtils.subDays( 7 );

	let startLine = dateUtils.getMillisecondOfDate();

	let before = dateUtils.getFomattedDate('yyyy-MM-dd');

	let defaultRange = before + ' 至 ' + today;

	$("#date-range-for-half-hour").val( defaultRange );

	model.ranges[ model.duration ] = {

		startLine : startLine,
		endLine : endLine

	};

	_this.dateRangeForHalfHour = laydate.render({
		elem: '#date-range-for-half-hour',
		theme: '#e9be3b',
		type: 'date',
		max: today,
		format: 'yyyy-MM-dd',
		range: '至',
		value: defaultRange,
		btns:['confirm'],
		done: function (value, date, endDate) {

			_this.handleDateChange( date, endDate );

		},
		change: function(value, date, endDate){

			let startLine = (new Date(date.year,
				date.month - 1,
				date.date,
				0,
				0,
				0)).getTime();

			let endLine = (new Date(endDate.year,
				endDate.month - 1,
				endDate.date,
				23,
				59,
				59)).getTime();

			if ( endLine - startLine > 604800000 ){

				_this.dateRangeForHalfHour.hint( '建议时间区间不超过7天');
				return false;

			}

		}

	});

};

//设置1分钟数据的时间选择器

app.setMinuteRangeConfig = function () {


	if ( this.dateTimeForMinute ){

		return false;

	}

	let range = 60 * 60 * 1000;

	let _this = this;

	let dateUtils = new DateUtils();

	let endLine = dateUtils.getMillisecond();

	//取整分钟

	endLine  = parseInt( endLine/3600000 ) * 3600000;

	//限制在1个小时

	let startLine = endLine - range;

	dateUtils.setDate( startLine );

	let before = dateUtils.getFomattedDate('yyyy-MM-dd hh时');

	$("#date-time-for-minute").val( before );


	model.ranges[ model.duration ] = {

		startLine : startLine,
		endLine : endLine

	};

	this.dateTimeForMinute = laydate.render({
		elem: '#date-time-for-minute',
		theme: '#e9be3b',
		type: 'datetime',
		max: endLine,
		format: 'yyyy-MM-dd HH时',
		value: before,
		btns:['confirm'],
		done: function (value, date, endDate) {

			_this.handleDateChange( date, endDate );

		}

	});


};

//设置5s数据的时间选择器

app.setFiveSecondRangeConfig = function () {

	if ( this.dateTimeFor5Seconds ){

		return false;

	}

	let range = 60 * 60 * 1000;

	let _this = this;

	let dateUtils = new DateUtils();

	let endLine = dateUtils.getMillisecond();

	//取整分钟

	endLine  = parseInt( endLine/3600000 ) * 3600000;

	//限制在1个小时

	let startLine = endLine - range;

	dateUtils.setDate( startLine );

	let before = dateUtils.getFomattedDate('yyyy-MM-dd hh时');

	$("#date-time-for-5-seconds").val( before );


	model.ranges[ model.duration ] = {

		startLine : startLine,
		endLine : endLine

	};

	this.dateTimeFor5Seconds = laydate.render({
		elem: '#date-time-for-5-seconds',
		theme: '#e9be3b',
		type: 'datetime',
		max: endLine,
		format: 'yyyy-MM-dd HH时',
		value: before,
		btns:['confirm'],
		done: function (value, date, endDate) {

			_this.handleDateChange( date, endDate );

		}

	});

};