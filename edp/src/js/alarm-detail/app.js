require('../../scss/alarm-detail.scss');

import { Common } from '../common/common';
import { alarmHelper } from './alarm.helper';

let app = {
	id	 : null,
	init : {},
	bind : {},
};

app.init = function () {

	this.id = Common.getParameter('id');

	alarmHelper.initAlarm( this.id );


};

$(function () {
	app.init();
});

