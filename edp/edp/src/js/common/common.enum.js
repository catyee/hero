
//报警类型

export var ALARM_TYPES = {
	'1' : '设备预警',
	'2' : '设备报警',
	'3' : '事故报警',
};

//角色

export let ROLES = {
	'KH': -1,	// 客户
	'QXBZ': 1,	//抢修班长
	'ZTZ': 2,	//巡检组团长
	'AQY': 3,	//安全员
	'XJZZ': 4,	//巡检组长
	'QXZZ': 5,	//抢修组长
	'ZBZ': 6,	//值班长
	'ERP_ADMIN': 7,	//ERP管理员
	'WLY': 8,	//物料员
	'IEMS_ADMIN': 9	//IEMS管理员
};

// 位置分类

export let POSITIONCLASSIFY  = [
	'',
	{content: '高压侧', value: 1},
	{content: '低压侧', value: 2},
	{content: '变压器', value: 3},
	{content: '直流屏', value: 4},
	{content: '信号屏', value: 5},
	{content: '其他', value: 6},
];

/***
 * 上传文件
 * @param file 文件对象
 * @param from 1、配电室  2、操作票  3、工作票、 4.反馈
 * @param type 1、文件   2、图片
 */

export let UPLOAD = {
	FROM_PR : 1,
	FROM_OPER_RICKET : 2,
	FROM_WORK_TICKET : 3,
	FROM_SUGGEST: 4,

	TYPE_FILE 	: 1,
	TYPE_IMG	: 2
};