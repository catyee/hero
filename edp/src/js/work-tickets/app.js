require('../../scss/tickets.scss');
import {UI} from '../common/ui'

import {Common} from '../common/common';
import {model} from './model';

let app = {
    init: {},
    bind: {},
    search : {},
    renderTickets  : {},       //渲染日志列表
    getTicketDom   : {},       //获取日志DOM
};

$(function () {
   app.init();
})

//初始化
app.init = function () {

    model.prId = Common.getParameter('prid');

    this.workTicktPagination = new UI.Pagination('pagination');
    this.workTicktButtonGroup = new UI.ButtonGroup('status-btn');

    this.initState();
    this.bind();
    this.search();

};

//初始化状态

app.initState = function () {

    let state = Common.popState();
    if (state.page) {
        model.page = state.page;
    }

    if (state.startDate && state.endDate) {
        model.startDate = state.startDate;
        model.endDate = state.endDate;

        $("#date-range").val(state.startDate + ' 至 ' + state.endDate);
    }

    if ( state.status ){

        model.status = state.status;
		this.workTicktButtonGroup.set( state.status );

    }


};

//存储状态

app.setState = function () {
    let state = {
        page: model.page
    };

    if (model.startDate) {
        state.startDate = model.startDate;
    }

    if (model.endDate) {

        state.endDate = model.endDate;

    }

    state.status = this.workTicktButtonGroup.selected;

    Common.pushState(state);
};


//事件绑定
app.bind = function () {
    var _this = this;

    //翻页

    _this.workTicktPagination.change(function (value) {
        model.page = value;
        _this.search();
    });

    //绑定状态选择器 status-btn
    _this.workTicktButtonGroup.change(function (value) {

        model.status = value == 'null'?null:value;
        model.page = 1;
		_this.search();

    });

    //时间选择器

    laydate.render({
        elem: '#date-range',
        range: '至',
        theme:'#e9be2b',
        done:function (value,date) {
            var values = value.split('至');
            model.startDate = $.trim(values[0])?$.trim(values[0]):null;
            model.endDate = $.trim(values[1])?$.trim(values[1]):null;
            model.page = 1;
            _this.search();
        }
    });

    //跳转到详情

    $("#ticket-list").delegate(".ticket", "click", function () {

        var id = $(this).data("id");
        app.setState();
        window.location.href = "work-ticket.html?d="+id+"&prid="+model.prId;

    })
};

//搜索工作票

app.search = function () {

    var _this = this;
    model.search().subscribe(function (res) {
        if(res){
            _this.renderTickets();
        }
    })

}

//渲染工作票列表

app.renderTickets = function () {

    $("#ticket-list").empty();
    if(model.totalPage == 0){
        Common.emptyTips("ticket-list", "搜索不到日志");
    }else{
        this.workTicktPagination.update(model.totalPage, model.page)
    }

    var ticketList = model.ticketList;
    var length = ticketList.length;
    for(var i=0; i<length; i++){
        $("#ticket-list").append(this.getTicketDom(ticketList[i]));
    }

};

//获取工作票DOM

app.getTicketDom = function (item) {
    return `<div class="ticket" data-id="${item.id}">
                <div class="main">
                <div class="left-circle"><div></div></div>
                <div class="left-con"></div>
                <div class="right-con">
                <div class="head">
                <div class="pr-name">${Common.isExperience ? Common.experiencePrName : item.pr.prName}</div>
                <div class="date">${item.createTime.slice(0,10)}</div>
            </div>

            <div class="footer">
                <div class="noSpill">${item.gzpNum}</div>
                <div class="status ${item.staus.slice(-1) == 0?'bg-red':'bg-green'}">${item.staus.slice(-1) == 0?'未完成':'已完成'}</div>
                </div>
        
                
                </div>
                </div>
            </div>`
}

