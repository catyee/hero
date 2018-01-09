require('../../scss/index.scss');
import {UI} from '../common/ui'

import { Common } from '../common/common';
import {BaseModel} from './web-socket-base-model'

let app = {
    init: {},
    bind: {},
    prList: [],
    pageSize: 100,
    currentPage: 1,
    flag: true
}

app.init = function () {
    this.prPagination = new UI.Pagination('pagination');
    this.bind();
    this.initTableHeader();
    this.initSocket();
}

app.bind = function () {
    //
    $(window).resize( function () {

        if ( timer ){

            clearTimeout( timer );
        }

        let timer = setTimeout( function () {

            app.initTableHeader();


        }, 200)

    });


    //点击tr列表项  改变背景色 显示详情
    $('#pr-list').delegate('tr', 'click', function () {
        $('#pr-list tr').removeClass('bg-hover');
        $(this).addClass('bg-hover');

        //显示顶部详情
        let tds = $(this).children();
        app.showDetail(tds);
    })

    //排列配电室状态
    $('.pr-status').on('click', function () {
        //切换筛选按钮颜色
        $('.arrow-top').toggleClass('top-active');
        $('.arrow-top').toggleClass('top');
        $('.arrow-bottom').toggleClass('bottom-active');
        $('.arrow-bottom').toggleClass('bottom');

        app.prStatusChange();
        $('#pr-list tr').removeClass('bg-hover');
        $($('.pr-item')[0]).addClass('bg-hover');
    })


    // 切换分页
    this.prPagination.change(function (value) {
        app.currentPage = value;
        app.pagination();
        app.renderPageList(value);
    })

}
//显示配电室详情
app.showDetail = function (tds) {
    //配电室运行天数
    let safeDay = $(tds[0]).attr("safeDay");
    $("#days").html(safeDay);
    //配电室状态
    let status = $(tds[2]).css('color');
    $('#alarm-status').css('color',status);
    $('#alarm-status').html($(tds[2]).html());
    //配电室名称
    $('#pr-name').html($(tds[1]).html());
    //当日用电量
    $('#currentEle').html($(tds[3]).html());
    //当月用电量
    $('#monthEle').html($(tds[4]).html());
    //总用电量
    $('#totalEle').html($(tds[5]).html());
    //当月报警总量
    $('#monthAlarm').html($(tds[6]).html());
    //历史报警总量
    $('#historyAlarm').html($(tds[7]).html());
    //巡检次数
    $('#inspectionCount').html($(tds[8]).html());
    //抢修次数
    $('#repairCount').html($(tds[9]).html());
}

//渲染表格宽高
app.initTableHeader = function () {
     let width = $('#pr-list').width();
    let height = $('.table-head').height();
    $('.table-head').css('width', width)
    $('.static-height').css('height', height)
    $('.foot-space').css('height', height * 2)
    let winHeight = $(window).height();
    let documentHeight = $(document).height();
    if(documentHeight <= winHeight || ($(window).height() - 470)/height < 5){
        $('.foot-space').css('display', 'none');
    }else {
        $('.foot-space').css('display', 'block');
    }
}
//初始化websocket 建立连接监听数据变化
app.initSocket = function () {
    let userId = Common.userId;
    let roleId = Common.roleId;
    let url = 'ws://iems.dianwutong.com/edp/home_page/' + userId + '/' + roleId;
    // let url = 'ws://'+location.host+ '/edp/home_page/' + userId + '/'+ roleId;

    this.model = new BaseModel(url);
    this.model.addEventListener('change', app.handleChange)
};
//处理数据发生变化
app.handleChange = function (type, data) {
    switch (type) {
        case 'OPEN':
            app.handleOpen(data);
            break;
        case 'ADD' :
            app.handleDataAdd(data);
            break;
        case 'UPD' :
            app.handleDataUpdate(data);
            break;
        case 'DEL' :
            app.handleDataDelete(data);
            break;
    }
}


//处理成功打开socket
app.handleOpen = function (data) {
    $('#pr-list').children().remove();

    this.handleDataAdd(data);
}
//新增或者删除数据的时候 重新渲染页数

//处理新增数据
app.handleDataAdd = function (data) {
    //获取prList
    this.handleModelData();
    var length = this.prList.length;
    var totalPage = Math.ceil(length / this.pageSize);
    if (totalPage > 1) {
        //页数大于1 分页 按页渲染列表
        this.pagination();
        this.renderPageList(1);
    } else {
        //页数一页 直接插入增加元素
        for (var i = 0; i < data.length; i++) {
            data[i].index = i+1;
            let dom = app.createPrDom(data[i]);
            $('#pr-list').append(dom);
        }
        //渲染表头高度
        this.initTableHeader();
        //配电室详情显示列表第一行信息
        let tds = $($('.pr-item')[0]).children();
        $('#pr-list tr').removeClass('bg-hover');
        $($('.pr-item')[0]).addClass('bg-hover');
        this.showDetail(tds);
    }

}

//处理删除数据
app.handleDataDelete = function (data) {
    //获取prList
    this.handleModelData();
    var length = this.prList.length;
    var totalPage = Math.ceil(length / this.pageSize);
    if (totalPage > 1) {
        //页数大于1 分页 按页渲染列表
        this.pagination();
        this.renderPageList(1);
    } else {
        //页数一页 直接删除元素
        for (var i = 0; i < data.length; i++) {
            $('.pr-item[prId=' + data[i] + ']').remove();
        }
    }

}

//处理数据改变
app.handleDataUpdate = function (data) {
    for (var i in  data) {
        if (data.hasOwnProperty((i))) {
            var prDom = $('.alarm-item[prId="' + data[i].prId + '"]');
        }
        if (prDom) {
            prDom.replaceWith(app.createPrDom(data[i]));
        }
    }
}


app.handleModelData = function () {
    //重新更新列表数组
    this.prList = [];
    for (var i in this.model.data) {
        if (this.model.data.hasOwnProperty(i)) {
            this.prList.push(this.model.data[i]);
        }
    }
    //更新配电室数量
    let count = 0;
    count = this.prList.length ? this.prList.length : 0;
    $('#prCount').html(count)
}

//重新分页
app.pagination = function () {
    var length = this.prList.length;
    var totalPage = Math.ceil(length / this.pageSize);
    if (totalPage == 1) {
        //如果只有一页 不进行分页
        return;
    }
    this.prPagination.update(totalPage, app.currentPage);
}


//渲染每一页的内容
app.renderPageList = function (currentPage) {

    this.pageList = this.prList.slice((currentPage - 1) * this.pageSize, this.pageSize * currentPage);
    $('#pr-list').children().remove();
    for (var i = 0; i < this.pageList.length; i++) {
        this.pageList[i].index = i + 1;
        let dom = this.createPrDom(this.pageList[i]);
        $('#pr-list').append(dom);
    }
    //渲染表头高度
    this.initTableHeader();
    //配电室详情显示列表第一行信息
    let tds = $($('.pr-item')[0]).children();
    this.showDetail(tds);
}

//创建每一条的dom

app.createPrDom = function (item) {
    if (Common.isExperience) {
        item.prName = Common.experiencePrName;
    }
    return `<tr class="pr-item">
					<td class="col-4" safeDay="${item.safeDay ? item.safeDay :0}">${item.index}</td>
					<td class="col-11">${item.prName}</td>
					<td class="col-10 ${item.status == 1?'color-red':'color-green'}">${item.status == 1 ? '异常' : '正常'}</td>
					<td class="col-11">${item.currentEle}</td>
					<td class="col-11">${item.monthEle}</td>
					<td class="col-13">${item.totalEle}</td>
					<td class="col-10">${item.monthBjCount}</td>
					<td class="col-10">${item.totalBjCount}</td>
					<td class="col-10">${item.xjCount}</td>
					<td class="col-10">${item.qxCount}</td>
				</tr>`
}

//切换配电室状态
app.prStatusChange = function () {
    app.flag = !app.flag;
    let normalArr = app.prList.filter(function (item) {
        return item.status == 0;
    })
    let abNormalArr = app.prList.filter(function (item) {
        return item.status == 1;
    })
    if (app.flag) {
        app.prList = abNormalArr.concat(normalArr);
    } else {
        app.prList = normalArr.concat(abNormalArr);
    }


    this.pagination();
    this.renderPageList(1);
}

$(function () {
    app.init();
})