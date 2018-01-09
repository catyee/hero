require('../../scss/suggest.scss');
import {Common} from '../common/common';
import {Model} from './model';
import {UI} from '../common/ui';

let app = {
	userIcon: '//cdn.dianwutong.com/edp/img/user.png',
	init: {},
	bind: {},
};

app.init = function () {

	//获取反馈id

	Model.orderId = Common.getParameter('orderId');
	this.bind();

	//获取反馈详情

	this.getSuggestDetail();
};
app.bind = function () {

	//点击进入写反馈 或我的反馈

	$('.radio-group input').on('click', function () {
		var type = $(this).val();
		if (type == 'suggestList') {
			window.location.href = './suggests.do#suggestList';
		} else {
			window.location.href = './suggests.do#createSuggest';
		}

	});

	//点击进入反馈列表

	$('#suggests').on('click', function () {
		window.location.href = './suggests.do#suggestList';
	});

	//点击回复按钮

	$('#comments-list').delegate('.reply-btn', 'click', function () {
		$(this).parent().next().next().toggle(200);
	});

	//发表回复

	$('#comments-list').delegate('.save', 'click', function () {
		Model.comment = null;
		let comment = $(this).parent().find('.comments-content').val();
		if (!comment) {
			$(this).prev().css('display', 'block');
			return;
		} else {
			$(this).prev().css('display', 'none');
			Model.comment = comment;
			$(this).parent().parent().parent().find('.reply').css('display', 'none');
		}
		app.addComment();
	});

	//发表评论

	$('#comments-input').delegate('.save','click',function () {
		let comment = $('#comment').val();
		if(!comment){
			$('#comment-tip').css('display','block');
			return;
		}else {
			$('#comment-tip').css('display','none');
			Model.comment = comment;
		}
		app.addComment();
	});

	//图片预览

	$('#pic-container').delegate('a', 'click', function () {
		$('a.group-img').fancybox({
			'transitionIn': 'elastic',
			'transitionOut': 'elastic',
			'speedIn': 600,
			'speedOut': 200,
			'overlayShow': false
		});
	});

	$('#comments-list').delegate('.delete', 'click', function () {
		let commentId = $(this).parent().parent().parent().attr('commentId');
		Model.commentId = commentId;
		let options = {};
		options.tip = '您确定删除本条回复吗？';
		options.rightBtnClick = function () {
			app.removeComment();
		};
		UI.confirm(options);

	});
};


//删除一条评论

app.removeComment = function () {
	Model.removeComment()
		.then(function (res) {
			if(res.code == 0){
				window.location.reload();
			}
		});
};

//添加一条评论

app.addComment = function () {
	Model.addComment()
		.then(function (res) {
			window.location.reload();
		})
		.catch();
};

//获取反馈详情

app.getSuggestDetail = function () {
	Model.getSuggestDetail()
		.then(function (res) {
			Model.data = res.entity;
			Model.prefix = res.prefix; //前缀
			app.renderDetail();
		})
		.catch(function () {

		});
};

//反馈详情

app.renderDetail = function () {
	let data = Model.data;
	$('#pic-container').empty();
	$('#comments-list').empty();

	//反馈详情

	$('#title').html('【'+data.title+'】'); //反馈标题
	$('#user').html(data.realName); //反馈者名字
	$('#time').html(data.lastModifyTime.slice(0, 19));//反馈日期
	$('#commentCount').html(data.commentCount ? data.commentCount : 0); //当前反馈的评论数
	$('#content').html(data.content); //反馈内容

	//反馈内容上传的图片

	if(data.pic){
		let pics = data.pic.split(',');
		for (var i = 0; i < pics.length;i++){
			var path = Model.prefix + pics[i];

			var domImg = `<a href="${path}" class="group-img"><img src="${path}" ></a>`;

			//图片查看器查看

			$('#pic-container').append(domImg);
		}
	}

	//当前用户（即当前登录者 可以发表评论）

	$('#userName').html(Model.realName); //当前用户

	//从cookie取出当前用户头像

	let userHead = Model.userHead.split('/');
	userHead = userHead[3];
	userHead = userHead && userHead != 'null'? userHead : app.userIcon;
	var userIconDom = `<div class="user-head" style="background-image: url('${userHead}')" ></div>`;
	$('#userIcon').html(userIconDom); //当前用户



	let userIcon = app.getUserIcon(data);
	var commentIconDom = `<div class="user-head" style="background-image: url('${userIcon}')" ></div>`;
	$('#suggestIcon').html(commentIconDom); //反馈详情的icon




	//评论列表

	let comments = data.comments;
	if(!comments.length){
		return;
	}
	for (let i in  comments) {
		var item = comments[i];
		$('#comments-list').append(app.renderComments(item));

	}

};
app.getUserIcon = function (data) {
	let userIcon = data.img ? (Model.prefix + data.img) : app.userIcon;
	return userIcon;
};

app.renderComments = function (item) {
	var userIcon = app.getUserIcon(item);
	let dom = `<div class="item" commentId = ${item.commentId}>
                    <div class="user-icon">
                    <div class="user-head" style="background-image: url('${userIcon}')"></div>
                    </div>
                    <div class="comments-area">
                        <div class="user-name">${item.userName}<span class="time">${item.lastModifyTime.slice(0, 19)}</span></div>
                        <div class="content">${item.comment}</div>
                        <div class="operate">
                            <span class="pointer reply-btn" >回复</span>
                            <span class="pointer delete" >${item.userId == Model.userId?'删除':''}</span>
                        </div>
                        <div class="height20"></div>
                        <div class="reply" style="display: none">
                            <textarea placeholder="写下你的回复" class="comments-content input-border"></textarea>
                            <div class="height5"></div>
                            <div class="color-danger reply-tip" style="display: none">请输入回复内容</div>
                            <div class="save pointer"><div>发表回复</div></div>
                            
                        </div>
                    </div>
                </div>`;
	return dom;
};

$(function () {
	app.init();
});