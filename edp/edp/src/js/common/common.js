/**
 * 通用
 */

var moni = {
	baseUrl          :  "http://192.168.0.116:8088",          //
	nodeUrl          :  "http://192.168.0.116:8088",
	baiduMapKey      : 'TT0RktRPwhEbTvTRK5I416aW',    //百度地图
	roles			 : {},							  //平台的用户角色
	collectModel	 : {},							  //采集模式
	isIE             : {},                            //监测是否是ie浏览器
	ajax             : {},                            //ajax网络请求
	generalTip       : {},                            //提示
	disPages         : {},                            //生成分页
	emptyTips        : {},                            //查询空记录提示
	playAudio        : {},                            //播放音乐
	getSysPrGrade    : {},                            //获取系统设置中配电室等级的信息
	getAllRepairTeam : {},                            //获取所有抢修组的信息
	getAllPowerRoom  : {},                            //获取所有配电室

	encodeString	 : {},							  //加密字符串
	decodeString	 : {},							  //解密字符串

	zrAddress        : '123.56.185.43:9100',          //旋思Zr90服务器地址
	zrAppName        : 'app1',                        //旋思Zr90应用名
	zrUserName       : 'admin',                       //旋思Zr90用户名
	zrPassword       : 'abc123',                      //旋思Zr90密码

	JKRDTWebsocket   : 'ws://{IP}:8061/GetFrameViewRTDataRapidly',		//获取实时数据的websocket接口



    
};

/***
 * 平台的用户角色
 */

moni.ROLES = {
	'KH'	: -1,	//客户
	'QXBZ'	: 1,	//抢修班长
	'ZTZ' 	: 2,	//巡检组团长
	'AQY'	: 3,	//安全员
	'XJZZ'	: 4,	//巡检组长
	'QXZZ'	: 5,	//抢修组长
	'ZBZ'	: 6,	//值班长
	'ERP_ADMIN'		: 7,	//ERP管理员
	'WLY'			: 8,	//物料员
	'IEMS_ADMIN'	: 9	//IEMS管理员
};

/***
 * 平台的用户角色
 */

moni.POSITIONCLASSIFY = {
	'KH'	: -1,	//客户
	'QXBZ'	: 1,	//抢修班长
	'ZTZ' 	: 2,	//巡检组团长
	'AQY'	: 3,	//安全员
	'XJZZ'	: 4,	//巡检组长
	'QXZZ'	: 5,	//抢修组长
	'ZBZ'	: 6,	//值班长
	'ERP_ADMIN'		: 7,	//ERP管理员
	'WLY'			: 8,	//物料员
	'IEMS_ADMIN'	: 9	//IEMS管理员
};

/***
 * 采集模式
 */

moni.collectModel = {
	'XS'	: 1,	//旋思
	'JK'	: 2,	//杰控
};

/***
 * 监测当前浏览器是否是ie浏览器
 */

moni.isIE = function(){

	//使用userAgent去判断，ie5-ie10有

	var UA = navigator.userAgent;
	if(/Trident/i.test(UA)){
		if(/MSIE (\d{1,})/i.test(UA)){
			return RegExp.$1;
		}else if(/rv:(\d{1,})/i.test(UA)){
			return RegExp.$1;
		}else{
			return false;
		}
	}else{
		return false;
	}
};


/***
 * ajax 网络请求
 */

moni.ajax = function(param){
	
	var json = new Object();
	
	if(typeof param.path != undefined){
		json.url = param.path;
	}else{

		//没有制定接口路径就直接返回

		return {'code':'110','msg':'path undefined'};
	}
	
	//请求参数 可以不传

	if(typeof param.data != undefined){
		json.data = JSON.stringify(param.data);
	}
	
	//success回掉函数必须是函数类型的参数

	if(typeof param.success == 'function'){
		json.success = param.success;
	}
	
	//error必须是函数类型的参数

	if(typeof param.error == 'function'){
		json.error = param.error;
	}
	
	if(typeof param.async != undefined){
		json.async =  param.async;
	}else{
		json.async = true;
	}
	
	json.type        = 'post';
	json.contentType = 'applications/json;charset=UTF-8';
	json.dataType    = 'json';
	
	$.ajax(json);
	
};

/***
 * 普通提示
 * @param text  提示内容
 */

moni.generalTip = function(text, type){
	
	var types = {
		'success' : '#03b679',
		'warning' : '#E7604A'
	};
	
	var background = types[type];
	
	(!background)&&(background = types['success']);
	
	var dom = '';
	dom += '<div style="height:40px;line-height:40px;background:'+background+';position:fixed;z-index:9999;bottom:-50px;color:#fff;margin-left:auto;margin-right:auto;left:0px;right:0px;text-align:center;padding:5px;opacity:0.9" id="moni-general-tip">';
	dom += text;
	dom += '<div>';
	
	if(document.getElementById('moni-general-tip')){
		if(typeof(tipTimeOut) != 'undefined'){
			clearTimeout(tipTimeOut);
		}
		$('#moni-general-tip').remove();
		
	}
		
	$('body').append(dom);
	
	$('#moni-general-tip').animate({'bottom' : '0px'},400,'swing',function(){
		if(typeof(tipTimeOut) != 'undefined'){
			clearTimeout(tipTimeOut);
		}
		
		var tipTimeOut = setTimeout(function(){
			$('#moni-general-tip').animate({
				'bottom' : '-50px'
			},800,'swing',function(){
				$('#moni-general-tip').remove();
			});
		},3000);
	});
};

/***
 * 生成分页
 * @param domId       承载分页的ul的id
 * @param totalPage   总页数
 * @param currentPage 当前页面
 */

moni.disPages = function(domId, totalPage, currentPage){
	if(totalPage == '0'){
		$('#'+domId).css('display','none');
	}else{
		$('#'+domId).css('display','');
	}
	
	var start    = (currentPage-2)>1?(currentPage-2):2;
	var end      = (currentPage+3)>totalPage?totalPage:(currentPage+3);
	var prePage  = (currentPage-1)>1?(currentPage-1):1;
	var nextPage = (currentPage+1)>totalPage?totalPage:(currentPage+1);
	
	var dom = '';
	if(currentPage == 1){
		dom += '<li class="disabled" page="'+prePage+'"><a href="#">&laquo;</a></li>';
		dom += '<li class="active" page="1"><a href="#">1</a></li>';
	}else{
		dom += '<li page="'+prePage+'"><a href="#">&laquo;</a></li>';
		dom += '<li page="1"><a href="#">1</a></li>';
	}
	
	if(currentPage > 4){
		dom +='<li class="disabled"><a href="#">...</a></li>';
	}
	
	for(var i=start; i<end; i++){
		if(i == currentPage){
			dom += '<li class="active" page="'+i+'"><a href="#">'+i+'</a></li>';
		}else{
			dom += '<li  page="'+i+'"><a href="#">'+i+'</a></li>';
		}
	}
	
	if((currentPage+3)<totalPage){
		dom +='<li class="disabled"><a href="#">...</a></li>';
	}
	
	if(currentPage == totalPage && totalPage!=1){
		dom += '<li class="active" page="'+totalPage+'"><a href="#">'+totalPage+'</a></li>';
		dom += '<li class="disabled" page="'+nextPage+'"><a href="#">&raquo;</a></li>';
	}else if(totalPage!=1){
		dom += '<li  page="'+totalPage+'"><a href="#">'+totalPage+'</a></li>';
		dom += '<li  page="'+nextPage+'"><a href="#">&raquo;</a></li>';
	}else{
		dom += '<li class="disabled"  page="'+nextPage+'"><a href="#">&raquo;</a></li>';
	}
	
	$('#'+domId).html(dom);
};

/**
 * 加载中提示
 * @param tips 提示内容
 * @param dom 将提示信息添加到的dom的id
 */

moni.loadingTip = function(tips,dom){
	if($('#'+dom) && $('#'+dom).find('#loading-tips').length != 0){
		return false;
	}
	var html = '';
	html += '<div style="width:400px;margin:100px auto 0 auto;" id="loading-tips">';
	html += '<div style="display:inline-block;width: 300px;;vertical-align: bottom">';
	html += '<img src="'+moni.baseUrl+'/images/waiting.gif" width="300px">';
	html += '</div>';
	html += '<div class="color-gray-b" style="text-align:center;width:300px;font-size:16px;text-shadow: 0px 2px 5px #ccc">';
	html += '<span style="display: inline-block">'+tips+'<br /><br/><br/></span>';
	html += '</div>';
	html += '</div>';

	$('#'+dom).append(html);

};


/**
 * 搜索空记录提示
 * @param  tips 提示内容
 * @param  dom  将提示信息添加到的dom的id
 */

moni.emptyTips = function(tips,dom){
	if($('#'+dom) && $('#'+dom).find('#empty-tips').length != 0){
		return false;
	}
	var html = '';
	html += '<div style="width:400px;margin:100px auto 0 auto;" id="empty-tips">';
	html += '<div style="display:inline-block;width:120px;vertical-align: bottom">';
	html += '<img src="'+moni.baseUrl+'/images/empty.png" width="100px">';
	html += '</div>';
	html += '<div class="color-gray-b" style="display:inline-block;width:200px;font-size:16px;text-shadow: 0px 2px 5px #ccc">';
	html += '<span>'+tips+'<br /><br/><br/></span>';
	html += '</div>';
	html += '</div>';
	
	$('#'+dom).append(html);
	
};


/***
 * 播放音频
 * @param src  音频的路径
 */

moni.playAudio = function(src){
	
	if(document.getElementById('moni-common-audio')){
		$('#moni-common-audio').remove();
	}
	
	var dom = '';
	dom += '<div class="am-u-lg-12" style="width:100%;position: fixed;z-index: 100;bottom: -10px; background:#111;" id="moni-common-audio">';
	dom += '<audio src="'+src+'" autoplay controls="controls" style="width:100%;"></audio>';
	dom += '</div>';
	
	$('body').append(dom);
	
	$('#moni-common-audio>audio').on('ended',function(){
		$('#moni-common-audio').remove();
	});
};

/***
 * 获取系统设置中配电室等级的信息
 * @param callback 获取成功的回掉函数
 */

moni.getSysPrGrade = function(callback){
	$.ajax({
		'url' : moni.baseUrl+'/rt/ap/v1/admin/get_all_pr_grade',
		'contentType' : 'application/json;charset=UTF-8',
		'type' : 'post',
		'dataType' : 'json',
		'success' : callback,
		'error' : function(result){
			
		}
	});
};

/***
 * 获取所有抢修组的信息
 * @param callback 获取成功的回调函数
 */

moni.getAllRepairTeam = function(callback){
	$.ajax({
		'url' : moni.baseUrl+'/rt/ap/v1/repdispatch/get_all_repair_team_status',
		'contentType' : 'application/json;charset=UTF-8',
		'type' : 'post',
		'dataType' : 'json',
		'success' : callback,
		'error' : function(result){
			
		}
	});
};

/***
 * 获取所有配电室
 * @param callback                               
 */

moni.getAllPowerRoom = function(callback){
	var param = {
		'userId' : $.cookie('roleType'),
		'roleId'   : $.cookie('roleId')
	};
	$.ajax({
		'url' : moni.baseUrl+'/dwt/iems/basedata/pr/get_pr_list',
		'contentType' : 'application/json;charset=UTF-8',
		'type' : 'post',
		'dataType' : 'json',
		'success' : callback,
		'data' : JSON.stringify(param),
		'error' : function(result){
			
		}
	});
};

/***
 * 对字符串加密
 * @param str
 * @returns {string}
 */

moni.encodeString = function(str){
	var length = str.length;
	var code = '';

	for(var i = 0; i < length; i++){
		console.log(((+i)+(+str.charAt(i))));
		code += String.fromCharCode(str.charCodeAt(i)+(i-length));
	}
	return code;
};

/***
 * encodeString的逆序操作
 * @param code
 * @returns {string}
 */

moni.decodeString = function(code){
	var length = code.length;
	var str = '';

	for(var i = 0; i < length; i++){
		str += String.fromCharCode(code.charCodeAt(i)-(i-length));
	}
	return str;
};

/***
 * 从url上获取一个参数
 * @param name
 * @returns {*}
 */

moni.getParameter = function (name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
	var r = window.location.search.substr(1).match(reg);
	if (r != null)return RegExp.$2;
	return null;
};

exports.moni = moni;