require('../../scss/tickets.scss');

import {UI} from '../common/ui'
import {Common} from '../common/common'
import {model} from './model'

let app = {
    init: {},
    bind: {},
    search : {},
    renderTickets  : {},       //渲染日志列表
    getTicketDom   : {},       //获取日志DOM
};

$(function () {

    app.init();

});

//初始化
app.init = function () {
    model.prId = Common.getParameter( 'prid' );
    this.operTicketPagination= new UI.Pagination('pagination');
    this.operTicketButtonGroup = new UI.ButtonGroup('status-btn')
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

    if( state.status ){

		model.status = state.status;
        this.operTicketButtonGroup.set( state.status );

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

    state.status = this.operTicketButtonGroup.selected;


    Common.pushState(state);
};



//事件绑定
app.bind = function () {

    let _this = this;
    //翻页
    _this.operTicketPagination.change(function (value) {

        model.page = value;
        _this.search();

    });

    //绑定状态选择器 status-btn
    _this.operTicketButtonGroup.change(function (value) {

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
            let values = value.split('至');
            model.startDate = $.trim(values[0])?$.trim(values[0]):null;
            model.endDate = $.trim(values[1])?$.trim(values[1]):null;
            model.page = 1;
            _this.search();
        }
    });



    //跳转到详情
    $("#ticket-list").delegate(".ticket", "click", function () {

        let id = $(this).data("id");
        app.setState();
        window.location.href = "operation-ticket.html?d="+id+"&prid="+model.prId;

    })
};

//搜索操作票

app.search = function () {
    model.search().subscribe(function (res) {
        if(res){
            app.renderTickets();
        }
    })
};

//渲染操作票列表

app.renderTickets = function () {

    $("#ticket-list").empty();
    if(model.totalPage == 0){
        Common.emptyTips("ticket-list", "搜索不到日志");
    }else{
        this.operTicketPagination.update( model.totalPage, model.page);
    }

    let ticketList = model.ticketList;
    let length = ticketList.length;
    for(let i=0; i<length; i++){
        $("#ticket-list").append(this.getTicketDom(ticketList[i]));
    }
};

//获取操作票DOM

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
                <div class="noSpill">${item.fileNum}</div>
                <div class="status ${item.staus.slice(-1) == 0?'bg-red':'bg-green'}">${item.staus.slice(-1) == 0?'未完成':'已完成'}</div>
                </div>
        
                
                </div>
                </div>
            </div>`;

};

