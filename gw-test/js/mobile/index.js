(function (window) {
    "use strict"
    var ctrl = {
        init:{},
        bind:{}
    }
    ctrl.init = function () {

        ctrl.swiper = new Swiper ('.swiper-container', {
            loop: true,
            autoplay: 5000,
            followFinger: true,
            onSlideChangeStart: function(swiper){
                ctrl.disCount();
                ctrl.disNumber();
            }
        })

        ctrl.bind();
        ctrl.disCount();
        ctrl.disNumber();
        ctrl.changeNews();
    }
    ctrl.bind = function () {
        $('.tech-list').on('touchend',function () {
           $(this).find('.show-detail').toggleClass('tech-arrow');
            $(this).find('.show-detail').toggleClass('tech-arrow-click');
           $(this).next().toggleClass('hide');
           // $(this).toggleClass('bg-grey');
           if($(this).hasClass('cloud-computing-list')){
               $('.cloud-computing-icon').toggleClass('cloud-computing');
               $('.cloud-computing-icon').toggleClass('cloud-computing-click');
               $('.cloud-computing-icon').parent().toggleClass('icon-bg-yellow');
           }
            if($(this).hasClass('BGS-list')){
                $('.BGS-icon').toggleClass('BGS');
                $('.BGS-icon').toggleClass('BGS-click');
                $('.BGS-icon').parent().toggleClass('icon-bg-yellow');
            }
            if($(this).hasClass('IOM-list')){
                $('.IOM-icon').toggleClass('IOM');
                $('.IOM-icon').toggleClass('IOM-click');
                $('.IOM-icon').parent().toggleClass('icon-bg-yellow');
            }
            if($(this).hasClass('DATA-SERVICE-list')){
                $('.DATA-SERVICE-icon').toggleClass('DATA-SERVICE');
                $('.DATA-SERVICE-icon').toggleClass('DATA-SERVICE-click');
                $('.DATA-SERVICE-icon').parent().toggleClass('icon-bg-yellow');
            }
        })
    }
    //新闻滚动切换
    ctrl.changeNews = function () {
        if(newsTimer){
            window.clearInterval(newsTimer);
        }
        var newsTimer = window.setInterval(function () {
            $('.news-panel').find(".news-panel-con").animate({
                marginTop: "-3.666rem"
            }, 1000, function() {
                $(this).css({marginTop:"0rem"}).find(".news-list:first").appendTo(this);
            });
        },5000)
    }
    //显示全球用户数和全球运营中心数
    ctrl.disCount = function () {
        // $('.slider3-right-m').hide();
        // $('.slider3-right-m').fadeIn(2000)
        var cusNumber = $('#cus-value').val();
        var prNumber  = $('#pr-value').val();
        var i = 0,j = 0;
        var cusTime = 1000/cusNumber;
        var prTime = 1000/prNumber;
        if(cusTimer){
            window.clearInterval(cusTimer);
        }
        var cusTimer = window.setInterval(function(){
            if(i > cusNumber){
                window.clearInterval(cusTimer);
                return false;
            }
            $('.cusNumber').html(i)
            i++;
        },cusTime)
        if(prTimer){
            window.clearInterval(prTimer);
        }
        var prTimer = window.setInterval(function(){
            if(j > prNumber){
                window.clearInterval(prTimer);
                return false;
            }
            $('.prNumber').html(j)
            j++;
        },prTime)
    }

    //显示电力数据总量
    ctrl.disNumber = function () {
        if(socket){
            socket.close();
        }
        var baseUrl = location.host;
        var socket = new WebSocket('ws://'+baseUrl+'/influxstats');
        socket.onopen = function () {
            socket.send('1');
        }
        socket.onmessage = function (res) {
            var data = res.data;
            $('.num').html(data)
        }
        if (timer) {
            window.clearInterval(timer);
        }
        var timer = window.setInterval(function () {
            socket.send('1');
        },10000)
    }
    ctrl.init();
})(window);