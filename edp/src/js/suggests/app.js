require('../../scss/suggests.scss');
import {Model} from './model';
import {Common} from '../common/common';
import {UPLOAD} from '../common/common.enum';
import {UI} from '../common/ui';

let app = {
	pics: [],
	visibleImg: '<img src="//cdn.dianwutong.com/edp/img/partner.png" title="公开" class="isVisible">',
	inVisibleImg: '<img src="//cdn.dianwutong.com/edp/img/lock.png" title="仅自己可见" class="isVisible">',
};
app.init = function () {

	//根据hash判断当前为 写反馈还是查询

	let hash = window.location.hash;

	//切换tab

	app.changeTab(hash);

	//分页

	this.pagination = new UI.Pagination('pagination');

	this.bind();
};

//根据hash或者radio value 切换tab（写反馈或者查询反馈）

app.changeTab = function (type) {
	if (type == '#suggestList'){   //查询反馈
		window.location.hash = '#suggestList';
		$('#create-suggest').prop('checked', false);
		$('#suggest-list').prop('checked', true);
		$('.list-container').css('display', 'block');
		$('.suggest-container').css('display', 'none');

		app.initSuggestList(); //切换到查询反馈面板时，默认显示全部反馈

	}else { //写反馈
		window.location.hash = '#createSuggest';
		$('#create-suggest').prop('checked', true);
		$('#suggest-list').prop('checked', false);
		$('.list-container').css('display', 'none');
		$('.suggest-container').css('display', 'block');

		Model.orderId = null; //切换到写反馈面板，清空orderId
	}
};

//初始化反馈列表 为全部反馈

app.initSuggestList = function () {
	$('.select-btn').removeClass('active');
	$($('.select-btn')[0]).addClass('active');
	Model.flag = 2;
	$('.total').css('display', 'none');
	$('#total-all').css('display', 'block');
	app.getSuggestList();
};
app.bind = function () {
	let _this = this;

	//切换写反馈 或者 查询反馈

	$('.radio-group input').click(function () {

		let type = $(this).val();

		app.changeTab(type);

	});

	//选择是否公开反馈

	$('#isVisible').on('change', function () {
		let visible = $(this).prop('checked');
		if (visible) {
			Model.visible = 1;
		} else {
			Model.visible = 0;
		}
	});

	//点击提交反馈

	$('#submit').on('click', function () {
		Model.title = $('#title').val();
		Model.content = $('#content').html();
		Model.content1 = $('#content').text().replace(/[\s　]+|[\s　]+/g, '');
		_this.saveSuggest();
	});

	//上传图片

	$('#upload').on('change', function (e) {
		var file = e.currentTarget.files[0];
		if (!file) {
			return false;
		}
		var ext = file.type;

		//文件类型检测

		if (ext && (!/(png|jpg|jpeg|gif)/.test(ext) ) || !ext) {
			$('#pic-tip').addClass('color-danger');
			return false;
		} else {
			$('#pic-tip').removeClass('color-danger');
			$('#pic-tip').html('');
		}
		Common.uploadFile(file, UPLOAD.FROM_SUGGEST, 2).subscribe(function (res) {
			if (res.code == '0') {
				var path = res.prefix + res.resultPath;
				app.pics.push(res.resultPath);
				var domImg = `<a href="${path}" class="group-img"><img src="${path}" title="${file.name}"></a>`;
				$('.viewer').append(domImg);
			}
		});


	});


	//图片预览


	//清空图片预览容器

	$('.viewer').empty();

	$('.viewer').delegate('a', 'click', function () {
		$('a.group-img').fancybox({
			'transitionIn': 'elastic',
			'transitionOut': 'elastic',
			'speedIn': 600,
			'speedOut': 200,
			'overlayShow': true,
			'hideOnOverlayClick':true,
			'showCloseButton':true
		});
	});

    
	//切换反馈列表状态

	$('.select-btn').on('click', function () {
		$('.select-btn').removeClass('active');
		$(this).addClass('active');
		let index = $(this).index();
		$('.total').css('display', 'none');
		if (index == 0) {

			//全部反馈

			Model.flag = 2;
			$('#total-all').css('display', 'block');

		} else {

			//我的反馈

			Model.flag = 1;
			$('#total-personal').css('display', 'block');

		}
		_this.search();

	});

	//翻页

	this.pagination.change(function (value) {
		Model.currentPage = value;
		app.getSuggestList();
	});

	//关键字查询

	$('#search-suggest').on('click',function () {
		_this.search();
	});

	//编辑是否可见

	$('#list').delegate('.isVisible', 'click', function (e) {
		e.stopPropagation();
		Model.orderId = $(this).parent().parent().parent().attr('orderId');
		if ($(this).attr('title') == '公开') {

			$(this).replaceWith(app.inVisibleImg);
			Model.visible = 0;
		} else {
			
			$(this).replaceWith(app.visibleImg);
			Model.visible = 1;
		}
		Model.updateSuggest()
			.then(function () {

			})
			.catch();
	});

	//反馈详情

	$('.list').delegate('.item', 'click', function () {
		let orderId = $(this).attr('orderId');
		location.href = './suggest.html?orderId=' + orderId;
	});
};


app.saveSuggest = function () {
	if (!Model.title || !Model.title.length) {
		$('#title-tip').html('请输入标题');
		return;
	}
	if (Model.title.length && Model.title.length > 50) {
		$('#title-tip').html('标题输入限制50个字符');
		return;
	}
	if (this.pics && this.pics.length) {
		Model.pic = this.pics.join(',');
	}
	Model.updateSuggest()
		.then(function (res) {
			UI.alert({
				'content': '反馈提交成功',
				'btn': '知道了',
				'callback': function () {
					window.location.reload();
				}
			});

		})
		.catch(function () {
			UI.alert({
				'content': '反馈提交失败，请重新操作',
				'btn': '知道了',
				'callback': function () {
				}
			});
		});
};

app.search = function () {
	Model.currentPage = 1;
	let keyword = $('#search-suggest').prev().val();
	Model.keyWord =  keyword ? keyword : null ; //关键字搜索
	app.getSuggestList();
};

//获取反馈列表

app.getSuggestList = function () {

	Model.getSuggestList()
		.then(function (res) {
			app.render(res);
		})
		.catch(function () {

		});
};

//渲染反馈列表

app.render = function (res) {
	$('#list').empty();

	/*重新渲染分页组件*/

	let totalPage = res.pageResult.totalPages;
	let page = res.pageResult.currentPage;
	let total = res.pageResult.totalCount;
	$('.total .color-danger').html(total);

	this.pagination.update(totalPage, page);
	let list = res.pageResult.records;
	Model.prefix = res.prefix; //前缀
	if (!list || list.length == 0) {
		Common.emptyTips('list', '搜索不到反馈记录');
	} else {
		for (var i in list) {
			$('#list').append(app.getSuggestDom(list[i]));
		}
	}

};

app.getSuggestDom = function (item) {
	let img,userIcon;
	if (item.visiable) {

		img = app.visibleImg;
	} else {
		img = app.inVisibleImg;

	}
	userIcon = item.img ? (Model.prefix + item.img) : '//cdn.dianwutong.com/edp/img/user.png';

	let dom = `<div class="item " orderId="${item.orderId}">
                    <div class="user-icon">
                       <div class="user-head" style="background-image: url('${userIcon}') "></div>
                    </div>
                    <div class="desc">
                        <div class="title">${item.title ? '【'+item.title+'】' : ''}</div>
                        <div class="height5"></div>
                        <div class="about-user">
                            &nbsp;<span class="font14 color-black user">${item.realName ? item.realName : ''}</span> <span class="font12 time">发布时间:<span>${item.lastModifyTime.slice(0, 19)}</span></span> <span class="font12 ">评论：<span>${item.comments.length ? item.comments.length : 0}</span></span>
                            ${Model.flag == 2 ? '' : img}
                        </div>
                        <div class="height5"></div>
                       <div class="suggest-desc font14"> ${item.content1 ? item.content1 : ''}</div>
                    </div>
                </div>`;
	return dom;
};

$(function () {
	app.init();
});