/**
 * 巡检控制器
 */

require('../../scss/inspection-arrange.scss');

import { commonModel } from '../common/common-model';
import { moni } from '../common/common';
import { commonCtrl} from '../common/common-controller';
import { inspectionArrangeModel } from './inspection-arrange-model';

require('../common/system-warning-service.js');

var local = {
	powerRoomList		   	: null,	 	//配电室列表
	groupExpandEnable		: false,	//记录分组是否展开
	prListOffsetTop			: 0,

	init					: {},
	bind				   	: {},		//事件绑定
	initInspectionArrange  	: {},     	//初始化巡检安
	createPowerRoomHtml		: {},		//构建配电室的html
	setInspectionArrange   	: {},     	//保存巡检安排
	initPowerRoomList	   	: {},	 	//初始化配电室列表
	getAPrFromPrList		: {},		//从配电室列表里获取一个配电室
	calculateGroupLayout	: {},		//计算小组的布局情况
	expandAllGroup			: {},		//展开所有分组
	unExpandAllGroup		: {},		//收起所有分组


};
$(function(){
	local.init();


});

/***
 * 初始化
 */

local.init = function () {
	//获取 date
	local.date = moni.getParameter('dt');

	//设置当前巡检安排的时间以及时间选择器当前选定的时间
	$('#current-date').html(this.date);
	$('#selected-date-btn').val(this.date);

	//获取配电室列表距离顶部的高度

	local.prListOffsetTop = $('#power-room-list').offset().top;

	//设置配电室列表的高度位

	var height =  document.body.clientHeight || document.documentElement.clientHeight;
	height -= 200;
	$('#power-room-list').css('maxHeight', height);
	$('#groupContainer').css('minHeight', height);

	local.bind();
	local.initInspectionArrange();
	local.initPowerRoomList();

};

/***
 * 事件绑定
 */

local.bind = function(){

	/***
	 * 可以做些想做的事情
	 */

	$('body').click(function(){
		$('#select-start-work-time-panel').css('display','none');
	});

	/***
	 * 时间选择器
	 * 设置当前日期
	 * 设置截止日期在七天之后
	 */

	var date = local.date;
	console.log(date)
	var dateUtils = new DateUtils();
	dateUtils.addDays(7);
	var endDate = dateUtils.getFomattedDate('yyyy-MM-dd');

	$('#selected-date-btn').datetimepicker({
		format: 'yyyy-mm-dd',
		autoclose: true,
		todayBtn: true,
		startView: 2,
		minView: 2,
		language:'ch',
		initialDate : date,
		endDate :endDate
	}).on('changeDate',function(e){
		console.log( e.date instanceof Date);
		var dateUtils = new DateUtils(e.date);

		var date = dateUtils.getFomattedDate('yyyy-MM-dd');
		window.location =  './inspection-arrange.html?dt='+date;
	});



	/***
	 * 展开和收起分组
	 */

	$('#expand-group').change(function(){
		local.groupExpandEnable = !local.groupExpandEnable;
		if(local.groupExpandEnable){
			local.expandAllGroup();
		}else{
			local.unExpandAllGroup();
		}
	});

	/***
	 * 如果配电室已经巡检完成
	 * 点击配电室可以查看巡检日志
	 */

	$('body').delegate('.is-complete','click',function(){

		var inspectionId = $(this).data('route-id');
		var powerRoomId  = $(this).data('power-room-id');
		window.location.href =  './inspection-log.html?d='+inspectionId+'&prid='+powerRoomId;
	});

	/***
	 * 保存巡检安排之前
	 * 给出提示
	 */

	$('#set-inspection-arrange').click(function(){
		var dateUtils = new DateUtils();

		var today = dateUtils.getFomattedDate('yyyy-MM-dd');
		var date = local.date;
		if(today === date){
			$('#pre-save-tips-modal').modal();
		}else{
			local.setInspectionArrange();
		}
	});

	/***
	 * 如果是当天  保存之前给提示
	 * 点击提示的按钮
	 */

	$('#modal-save-arrange').click(function(){
		local.setInspectionArrange();
		$('#pre-save-tips-modal').modal('hide');
	});

	/***
	 * 页面右侧的配电室列表的配电室可拖动
	 * 当拖动配电室到某一个小组上drop时
	 * 给这个小组新增一个配电室
	 *
	 * 拖拽之前 将被拖拽的配电室id放在dataTransfer对象中
	 * 阻止浏览器默认的dragover，drop事件的默认方法
	 * drop时 从dataTransfer 取出配电室id
	 * 添加配电室到小组巡检列表中
	 */

	$('#power-room-list').delegate('.power-room-item','dragstart',function(e){

		var powerRoomId = $(this).attr('power-room-id');

		e.originalEvent.dataTransfer.setData('text', powerRoomId);
		console.log(e.originalEvent);
	});

	$('#groupContainer').delegate('.group-pr-list','dragover',function(e){
		e.preventDefault();
	});

	/***
	 * 如果.group-pr-list下的配电室为空 则响应drop事件并且添加配电室
	 */

	$('#groupContainer').delegate('.group-pr-list','drop',function(e){
		e.preventDefault();
		if($(this).find('.power-room-item').length == 0){
			var powerRoomId = e.originalEvent.dataTransfer.getData('text');
			var powerRoom = local.getAPrFromPrList(powerRoomId);
			if(powerRoom){
				$(this).append(local.createPowerRoomHtml({pr:powerRoom}, true));
			}
			local.calcContainerHeight();
			local.calcGroupPrCount();
		}

	});

	/***
	 * 插入到触发drop事件的power-room-item的前面
	 */

	$('#groupContainer').delegate('.group-pr-list>.power-room-item','drop',function(e){
		e.preventDefault();

		var powerRoomId = e.originalEvent.dataTransfer.getData('text');
		var powerRoom = local.getAPrFromPrList(powerRoomId);
		if(powerRoom){
			$(this).before(local.createPowerRoomHtml({pr:powerRoom}, true));
		}
		local.calcContainerHeight();
		local.calcGroupPrCount();
	});

	/***
	 * 点击删除一个配电室
	 */

	$('#groupContainer').delegate('.group-pr-list>.power-room-item .remove-icon', 'click', function(){
		$(this).parents('.power-room-item').remove();
		local.calcContainerHeight();
		local.calcGroupPrCount();
	});

	/***
	 * 点击已完成的巡检  跳转到巡检日志
	 */

	$('#groupContainer').delegate('.power-room-item.is-complete', 'click', function(){
		var inspectionId = $(this).attr('inspection-id');
		var prid		 = $(this).attr('power-room-id');
		window.location.href = './inspection-log.html?d='+inspectionId+'&prid='+prid;
	});

	/***
	 * 点击编辑小组的上班时间
	 * 获取点击的位置
	 * 显示时间选择列表
	 * 阻止冒泡 因为body收到点击事件会隐藏掉时间选择面板
	 */

	var selectedTimeSpan = null;
	$('#groupContainer').delegate('.edit-start-work-time', 'click', function(e){
		e.stopPropagation();
		var top = e.clientY + $('body').scrollTop();
		var left = e.clientX + $('body').scrollLeft();
		top = (top+8)+'px';
		left = (left+5)+'px';

		selectedTimeSpan = $(this).prev('span');
		$('#select-start-work-time-panel').css('top', top).css('left', left).css('display','block');
	});

	/***
	 * 点击选择了时间
	 * 获得选择的时间
	 * 将其显示在被选中的span上
	 */

	$('#select-start-work-time-panel button').click(function(e){
		var time = $(this).text();
		selectedTimeSpan.text(time);
		$('#select-start-work-time-panel').css('display', 'none');

	});

	/***
	 * 避免时间冒泡到body
	 */

	$('#select-start-work-time-panel').click(function(e){
		e.stopPropagation();
	});

	var prList = $('#power-room-list');
	$(window).scroll(function (e) {
		var top = $(window).scrollTop();
		$(prList).css('position',((top) > local.prListOffsetTop) ? 'fixed' : 'static');
		$(prList).css('top',((top) > local.prListOffsetTop) ? '5px' : '');

		var bottom = $(window).scrollTop();
	});
};


/***
 * 初始化巡检安排
 * 1、 根据日期和组团长id获取某一天的安排路线  
 * 若获取成功 展现出来  
 * 2、 若未安排 则获取组团长下辖所有配电室及其小组
 * 将配电室平均分配给每个小组
 * 3、当天的巡检安排不可编辑
 *
 */

local.initInspectionArrange = function(){
	var date = local.date;
	var teamerId = $.cookie('roleId');

	//如果日期格式不正确 给出提示

	if(!/\d{4}-\d{2}-\d{2}/.test(date)){
		$('#groupContainer').empty();
		moni.emptyTips('错误的日期','groupContainer');
		$('#view-route').css('display', 'none');
		local.calculateGroupLayout(false);
		return false;
	}

	//计算传递进来的日期是历史日期，当前日期，还是未来日期

	var dateUtils = new DateUtils();
	var FormattedDate = new Date(date.slice(0,10).replace(/-/g,'/'));
	var dateFlag = dateUtils.getDateDistance(FormattedDate); 	 //日期标记 <0 表示昨天以及历史 ==0 表示当天 >0 表示明天以及以后

	inspectionArrangeModel.getInspectionArrange(date).subscribe(function(result){
		if(result.code == '0'){
			$('#groupContainer').empty();

			var emptyListCount = 0;
			var groupCount = result.list.length;

			var groupTpl  = '<div class="group" group-order="{groupOrder}"  grouper-id="{grouperId}">';
			groupTpl += '<div class="group-title">';
			groupTpl += '<span>{grouperName}组</span>';
			groupTpl += '<span class="color-gray-a">';
			groupTpl += '<span class="start-work-time">{startWorkTime}</span><i class="iconfont font18 edit-start-work-time">&#xe618;</i>&nbsp;&nbsp;';
			groupTpl += '<span class="total-power-room"></span><i class="iconfont font18">&#xe606;</i>';
			groupTpl +=	'</span>';
			groupTpl += '</div>';
			groupTpl += '<div id="{grouperDomId}" class="group-pr-list">';
			groupTpl += '{prDomList}';
			groupTpl += '</div>';

			var group = null;
			var html  = '';
			var prDomList = '';

			for(var i=0; i<result.list.length; i++){
				
				group = result.list[i];

				if(group.routes == null || group.routes.length == 0){
					emptyListCount++;
				}
				prDomList = '';
				for(var j=0; group.routes!=null&& j<group.routes.length; j++) {
					prDomList += local.createPowerRoomHtml(group.routes[j]);
				}

				let startWorkTime = result.list[i].xjTime;

				html = groupTpl
					.replace(/{startWorkTime}/, startWorkTime)
					.replace(/{groupOrder}/, i)
					.replace(/{grouperDomId}/, 'group'+i)
					.replace(/{grouperName}/, group.xjzzName)
					.replace(/{grouperId}/, group.xjzzUserId)
					.replace(/{prDomList}/, prDomList);

				$('#groupContainer').append(html);

			}

			//所有组的安排均为空 并且日期为今天及以后
			//调用获取配电室的接口  随机分配

			if(emptyListCount == result.list.length && dateFlag >= 0){
				inspectionArrangeModel.getPowerRoomByTeamerId().subscribe(function(result){
					if(result.code == '0'){
						var groups = $('.group-pr-list');
						var groupCount = groups.length;
						var loop=0;
						var dom = 0;
						var times = 0;
						for(var i=0; i<result.list.length; i++){
							times = result.list[i].prGrade.xjCount;
							while(times--){
								dom = local.createPowerRoomHtml({pr:result.list[i]});
								$('#group'+loop).append(dom);
								loop++;
								loop %= groupCount;
							}
						}
					}
					local.calculateGroupLayout(true);
					local.calcContainerHeight();
					local.calcGroupPrCount();

				});
			}else if(emptyListCount == result.list.length){

				//如果日期是历史日期，没有安排的话显示当日未安排

				$('#groupContainer').empty();
				moni.emptyTips('没有安排巡检','groupContainer');
				$('#view-route').css('display', 'none');
			}

			/***
			 * 控制显示效果
			 * 如果不是当天，不展开分组
			 */

			if(dateFlag > 0 || (dateFlag == 0 && emptyListCount == groupCount)){
				$('#set-inspection-arrange').css('display','inline');
				$('#view-route').css('display','none');

				/***
				 * 组内配电室的排序 组间配电室的移动
				 */

				for(var i=0; i<groupCount; i++){
					new Sortable(document.getElementById('group'+i), {
						handle: '.power-room-item',
						draggable: '.power-room-item',
						group:'powerRoom',
						onUpdate:function(){
							local.calcGroupPrCount();
						}
					});

				}

				$('#menu-bar').removeClass('hide');
				local.calculateGroupLayout(true);
				local.calcContainerHeight();
				local.calcGroupPrCount();


			}else if(dateFlag == 0){

				/***
				 * 如果是日期是当天  且有安排记录   则不能再安排
				 * 展开记录
				 */

				$('#set-inspection-arrange').css('display','none');
				$('#view-route').css('display','inline');
				$('.edit-start-work-time').replaceWith('<i class="iconfont font16">&#xe614;</i>');
				setTimeout(local.initInspectionArrange, 30000);
				local.calculateGroupLayout(false);
				local.calcGroupPrCount();
			}else if(dateFlag < 0){
				$('#set-inspection-arrange').css('display','none');
				$('#view-route').css('display','inline');
				$('.edit-start-work-time').replaceWith('<i class="iconfont font16">&#xe614;</i>');
				local.groupExpandEnable = true;
				local.calculateGroupLayout(false);
				local.calcGroupPrCount();
			}

		}
	});

};


/***
 * 构建配电室的html
 * @param pr
 */

local.createPowerRoomHtml = function(route, editable){

	var editableClass = '';
	var inspectionStatusHtml = '';
	var powerRoomTpl  = '<div data-power-room-id="{powerRoomId}" data-route-id="{routeId}" class="power-room-item {isCompleteClass} {editableClass}" inspection-id="{inspctionId}">';
	powerRoomTpl += '<div><i class="iconfont font24 power-room-icon">&#xe606;</i></div>';
	powerRoomTpl += '<div>';
	powerRoomTpl += '<div>{prName}[{prGrade}]</div>';
	powerRoomTpl += '<div class="color-gray-b power-room-address">{prAddress}</div>';
	powerRoomTpl += '{inspectionStatusHtml}';
	powerRoomTpl += '</div>';
	powerRoomTpl += '<div class="overlay"><i class="iconfont remove-icon">&#xe628;</i></div>';
	powerRoomTpl += '</div>';
	var pr = route.pr;
	var prAddress  = (pr.province)?pr.province:'';
	prAddress += ('&nbsp;&nbsp;'+((pr.city)?pr.city:''));
	prAddress += ('&nbsp;&nbsp;'+((pr.area)?pr.area:''));
	prAddress += pr.address;

	var isCompleteClass = '';
	if(route.isComplete == 1){
		if(route.ycCount > 0){
			inspectionStatusHtml = '<div class="color-red">巡检已完成 复检:'+route.fjCount+' 突发:'+route.tfCount+' 异常:'+route.ycCount+'</div>';
		}else{
			inspectionStatusHtml = '<div class="color-green">巡检已完成 复检:'+route.fjCount+' 突发:'+route.tfCount+' 异常:'+route.ycCount+'</div>';
		}
		isCompleteClass = 'is-complete';
	}else{
		inspectionStatusHtml = '';
	}

	if(editable){
		editableClass = 'editable';
	}

	return powerRoomTpl
		.replace(/{isCompleteClass}/, isCompleteClass)
		.replace(/{powerRoomId}/, pr.id)
		.replace(/{inspctionId}/, pr.routeId)
		.replace(/{prName}/, pr.prName)
		.replace(/{prGrade}/, pr.prGrade?pr.prGrade.grade:'')
		.replace(/{prAddress}/, prAddress)
		.replace(/{inspectionStatusHtml}/, inspectionStatusHtml)
		.replace(/{editableClass}/, editableClass)
		.replace(/{routeId}/, route.id);


};

/***
 * 保存巡检安排
 */

local.setInspectionArrange = function(){
	var teamerId = $.cookie('roleId');
	var date = local.date;
	var routeList = [];
	
	var groups = $('.group');

	for(var i=0; i<groups.length; i++){
		var grouperId 	= $(groups[i]).attr('grouper-id');

		//var groupOrder	= $(groups[i]).attr("group-order");

		var inspectTime = $(groups[i]).find('.start-work-time').text();

		var route = '';
		var powerRoomList = $(groups[i]).find('.power-room-item');
		for(var j=0; j<powerRoomList.length; j++){
			route += $(powerRoomList[j]).data('power-room-id')+',';
		}
		if(route.length > 0){
			route = route.slice(0, -1);
		}
		routeList.push({'xjzzUserId':grouperId, 'prIds':route, 'xjTime': inspectTime});

	}

	inspectionArrangeModel.setInspectionArrange(teamerId, date, routeList).subscribe(function(result){
		if(result.code == '0'){
			$('#success-tips-modal').modal();

			/*如果是当天 则刷新页面*/

			var dateUtils = new DateUtils();
			var today = dateUtils.getFomattedDate('yyyy-MM-dd');
			var date = local.date;
			if(today === date){
				window.location.reload();
			}else{
				setTimeout(function(){
					$('#success-tips-modal').modal('hide');
				},2000);
			}

		}
	});
};

/***
 * 初始化配电室列表
 * 为了临时添加巡检次数需要，将配电室列表列出来
 * 如果想要为某一个配电室临时添加一次巡检，则从配电室列表里拖拽该配电室到某一小组的巡检列表里
 * 首先获取到配电室列表，然后遍历配电室列表 将配电室append到页面上
 */

local.initPowerRoomList = function () {
	var powerRoomTpl = '<div power-room-id="{powerRoomId}" class="power-room-item {isFinishClass} {editableClass}" inspection-id="{inspctionId}" draggable="true">';
	powerRoomTpl += '<div><i class="iconfont font24">&#xe606;</i></div>';
	powerRoomTpl += '<div>';
	powerRoomTpl += '<div>{prName}[{prGrade}]</div>';
	powerRoomTpl += '<div class="color-gray-b power-room-address">{prAddress}</div>';
	powerRoomTpl += '</div>';
	powerRoomTpl += '</div>';
	commonModel.getAllPowerRoom().subscribe(function (res) {
		if (res.code == '0') {
			var length = res.list.length;
			var prDomList = '';
			var prAddress = '';
			var powerRoom = null;
			for (var i = 0; i < length; i++) {
				powerRoom = res.list[i];
				prAddress = (powerRoom.province) ? powerRoom.province : '';
				prAddress += ('&nbsp;&nbsp;' + ((powerRoom.city) ? powerRoom.city : ''));
				prAddress += ('&nbsp;&nbsp;' + ((powerRoom.area) ? powerRoom.area : ''));
				prAddress += powerRoom.address;

				prDomList += powerRoomTpl
					.replace(/{powerRoomId}/, powerRoom.id)
					.replace(/{prName}/, powerRoom.prName)
					.replace(/{prGrade}/, powerRoom.prGrade.grade)
					.replace(/{prAddress}/, prAddress);
			}

			$('#power-room-list').html(prDomList);

			//把配电室列表存在powerRoomList里

			local.powerRoomList = res.list;
		}
	});
};

/***
 * 从配电室列表中搜索一个配电室
 * @param prId
 */

local.getAPrFromPrList = function(prId){
	var prList = local.powerRoomList;
	var prListLength = prList.length;
	for(var i=0; i<prListLength; i++){
		if(prId == prList[i].id){
			return prList[i];
		}
	}
	return false;
};

/****
 * 计算小组的布局情况
 * 如果是不能更改的安排 则隐藏掉右侧的配电室列表 让groupContainer填充配电室列表的位置
 * 让所有group平铺开来 且配个group 占宽度的1/3
 * 如果是可以更改的安排	则绝对定位每个group  且只显示每个group的第一个配电室
 * 当鼠标移动到或者拖拽到group上的时候展开该group
 * 是否可以修改
 */

local.calculateGroupLayout = function(enableChanged){

	if(!enableChanged){
		$('#power-room-list-con').remove();
		$('#groupContainer').removeClass('col-md-8').addClass('col-md-12');
		$('#groupContainer .group').css('position','relative').css('height','auto');

	}else{
		if(local.groupExpandEnable){
			local.expandAllGroup();
		}else{
			local.unExpandAllGroup();
		}
	}
};

local.unExpandAllGroup = function(){

	$('#groupContainer').find('.group').attr('style','');
	var groups = $('#groupContainer').find('.group');
	var groupsLength = groups.length;
	var colspan = 380;
	var rowspan = 120;
	var line    = 0;
	var top 	= 0;
	var left	= 0;

	//editable 说明可编辑

	$('#groupContainer').find('.power-room-item').addClass('editable');

	//拖拽到group 上时 展开本group 收起其他group

	$('#groupContainer').delegate('.group', 'dragover', function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');

	});

	$('#groupContainer').delegate('.group', 'mouseenter', function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	});

	$('#groupContainer').delegate('.group', 'mouseleave', function(){
		$(this).removeClass('active');
	});


	for(var i=0; i<groupsLength;){
		line = parseInt(i/2);
		top  = line*rowspan;
		$(groups[i++]).css('left', 20).css('top', top+'px');
		$(groups[i++]).css('left', colspan+20).css('top', top+'px');
	}

	local.calcContainerHeight();

};

local.expandAllGroup = function(){
	$('#groupContainer').find('.group')
		.css('height', 'auto')
		.css('position','relative')
		.css('display','inline-block')
		.css('width','355px')
		.css('left','0px')
		.css('top','0px');

	$('#groupContainer').css('height', 'auto');
};

/***
 * 计算每组配电室的数量
 * 然后显示在title上
 */

local.calcGroupPrCount = function(){
	var groups = $('#groupContainer').find('.group');
	var groupsLength = groups.length;
	var prLength = 0;

	for(var i=0; i<groupsLength; i++){
		prLength = $(groups[i]).find('.power-room-item').length;
		$(groups[i]).find('.total-power-room').text(prLength);
	}

};

/***
 * 计算groupContainer的高度
 * 由于可编辑状态的group的position为absolute 当group展开后可能会超出groupContainer的边界
 * 所以每当group的内容发生变化时  重新计算groupContainer的高度
 * 首先 用height 记录power-room-list-con的高度
 * 遍历所有group 计算出每个group里的所有配电室的高度的总和 加上本group之上的所有group的初始高度的总和 记为 newHeight
 * 比较所有newheight 和 height 得到一个最大值
 * 将最大height作为groupContainer的高度
 */

local.calcContainerHeight = function(){
	if(local.groupExpandEnable){
		return false;
	}
	var groups = $('#groupContainer').find('.group');
	var groupsLength = groups.length;
	var prLength = 0;
	var powerRooms = null;
	var line = 0;

	var height = $('#power-room-list-con').height(); //记录计算后的 groupContainer的高度 认为height 等于配电室列表的高度
	var lineHeight = 140;						 //group没有展开时的高度
	var powerRoomHeight = 62;					 //每个配电室的高度
	var newHeight = 0;
	for(var i=0; i<groupsLength; i++){
		powerRooms = $(groups[i]).find('.power-room-item');
		prLength = powerRooms.length;
		$(groups[i]).find('.total-power-room').text(prLength);
		line = parseInt(i/2);

		//配电室的总高度+group本身以及他上面的行的总高度+groupd的title的宗法高度

		newHeight = prLength*powerRoomHeight+line*lineHeight;
		if(height < newHeight){
			height = newHeight;
		}

	}
	$('#groupContainer').css('height', height);
};