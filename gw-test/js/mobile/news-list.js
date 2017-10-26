(function (window) {
    "use strict"
     var ctrl = {
        pageSize:10,
        currentPage:1,
        init: {},
        bind: {},
        getNewsList:{}
     }
     ctrl.init = function () {
         ctrl.bind();
         ctrl.getNewsList();
     }
     ctrl.bind = function () {

         //获取滚动条当前的位置
         function getScrollTop() {
             var scrollTop = 0;
             if (document.documentElement && document.documentElement.scrollTop) {
                 scrollTop = document.documentElement.scrollTop;
             }
             else if (document.body) {
                 scrollTop = document.body.scrollTop;
             }
             return scrollTop;
         }

         //获取当前可视范围的高度
         function getClientHeight() {
             var clientHeight = 0;
             if (document.body.clientHeight && document.documentElement.clientHeight) {
                 clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
             }
             else {
                 clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
             }
             return clientHeight;
         }

         //获取文档完整的高度
         function getScrollHeight() {
             return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
         }
          // $('.load-tip').hide();
         window.onscroll = function () {
             if (getScrollTop() + getClientHeight() == getScrollHeight()) {
                 // $('.load-tip').stop().fadeIn(1500);
                 ctrl.currentPage++;
                 if(ctrl.currentPage > ctrl.totalPages ){
                    // $('.load-tip').text('没有更多了');
                    // $('.load-tip').stop().fadeOut(1500);
                     return;

                 }else{
                     ctrl.getNewsList();
                     // $('.load-tip').stop().fadeOut(1500);
                 }

             }
         }
     }
    ctrl.getNewsList = function () {
        var data = {
            pageSize:ctrl.pageSize,
            currentPage:ctrl.currentPage
        }
       data = JSON.stringify(data)
        $.ajax({
            type:'post',
            url:'/dwt/basedata/news/page_get_news_list.do',
            dataType:'json',
            data:data,
            success:function (res) {
                var prefix = $('#prefix').val();
                if(ctrl.currentPage==1){
                    $('#news-con').html('');
                }

                if(res.code == 0){
                    ctrl.totalPages = res.pageResult.totalPages;
                    var news = res.pageResult.records;
                    var str = '';
                    for(var i = 0;i < news.length;i++){
                        str += ' <a  href="/news.do?id='+news[i].id+'">';
                        str += ' <div class="news-list">';
                        str += ' <div class="height5"></div>';
                        str += ' <div class="news-title">'+news[i].title+'</div>';
                        str += '<div class="height7"></div>';
                        if(news[i].picture != null && news[i].picture != ''){
                            str += ' <div class="new-pic">'
                            str += '<img src="'+prefix+news[i].picture+'" style="display: block;width: 100%;height: auto" >';
                            str += '<div class="height5"></div>';
                            str += ' </div>';
                        }
                        if(news[i].newsDesc){
                                if(news[i].newsDesc.length > 50){
                                    str += '<div>'+news[i].newsDesc.slice(0,50)+'...'+'</div>';
                                }else{
                                    str += ' <div>'+news[i].newsDesc+'</div>'
                                }
                            }
                        str += '<div class="height5"></div>';
                        str += '<div class="date">'+news[i].lastModifyTime.slice(0, 10)+'</div>';
                        str += '<div class="height9"></div>';
                        str += '</div>';
                        str += '</a>';

                    }
                    $('#news-con').append(str)
                }


            }
        })
    }
    ctrl.init();
})(window)