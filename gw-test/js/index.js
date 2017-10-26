(function (window) {
    "use strict"
    var ctrl = {
        init:{},
        bind:{},
        changeNews:{}
    };
    ctrl.init = function () {
        ctrl.disNumber();
        ctrl.bind();
        ctrl.changeNews();
        ctrl.swiper = new Swiper ('#banner-swiper', {
            loop: true,
            autoplay: 5000,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            followFinger: true,
            onSlideChangeStart: function(swiper){
                if(swiper.activeIndex == 3 || swiper.activeIndex == 0){
                    $('.slider3-right-m img').hide();
                    $('.slider3-right-m img').fadeIn(2000);
                }
                if(swiper.activeIndex == 1 || swiper.activeIndex == 4){
                    ctrl.disNumber();
                }
            }
        })
    }
        ctrl.swiperSection5 = new Swiper('#section5-swiper',{
             loop: true,
             slidesPerView: "auto",
             spaceBetween: 42,
             autoplay:1,
             speed:10000,
        })
    ctrl.bind = function () {
        //点亮标题
        $('.nav-list li a').removeClass(' nav-border-yellow');
        $('.nav-list .nav-index a').addClass(' nav-border-yellow');

        //显示电力数据总量描述
        $('#number').on('mousemove',function () {
            $('.number-desc').removeClass('hide');
        })
        $('#number').on('mouseleave',function () {
            $('.number-desc').addClass('hide');
        })
        //鼠标移入banner图停止自动播放，鼠标移出重新自动播放
        $('.swiper-container').mouseenter(function () {
            ctrl.swiper.stopAutoplay();
            $('.btn').removeClass('hide');
        })
        $('.swiper-container').mouseleave(function () {
            ctrl.swiper.startAutoplay();
            $('.btn').addClass('hide');
        })
        // //鼠标移入banner1区域发生移动
        $('.banner1').on('mousemove',function (e) {
            var ax = -($('.banner1').innerWidth()/2- e.pageX)/200;
            var ay = ($('.banner1').innerHeight()/2- e.pageY)/100;
            $('.left-panel-1').attr("style", "transform: rotateY("+ax+"deg) rotateX("+ay+"deg);-webkit-transform: rotateY("+ax+"deg) rotateX("+ay+"deg);-moz-transform: rotateY("+ax+"deg) rotateX("+ay+"deg)");
        })
        $('#slider2').on('mousemove',function (e) {
            var ax = -($('#slider2').innerWidth()/2- e.pageX)/180;
            var ay = ($('#slider2').innerHeight()/2- e.pageY)/75;
            $('#slider2-right').attr("style", "transform: rotateY("+ax+"deg) rotateX("+ay+"deg);-webkit-transform: rotateY("+ax+"deg) rotateX("+ay+"deg);-moz-transform: rotateY("+ax+"deg) rotateX("+ay+"deg)");
        })
        //news
        $('.news-icon').mouseenter(function () {
            $(this).removeClass('.news-normal');
            $(this).addClass('.news-pressed');
        })
        $('.news-icon').mouseleave(function () {
            $(this).removeClass('.news-pressed');
            $(this).addClass('.news-normal');
        })

        //section4
        $('.section4-item').on('mouseenter',function () {
            $(this).find('.bottom').addClass('toBottom');
            $(this).find('.middle').addClass('toMiddle');
            $(this).find('.top').addClass('toTop');
        })
        $('.section4-item').on('mousemove',function () {
            $(this).find('.bottom').addClass('bottomShowed');
            $(this).find('.middle').addClass('middleShowed');
            $(this).find('.top').addClass('topShowed');
            $(this).addClass('scale');
        })
        $('.section4-item').on('mouseleave',function () {
            $(this).find('.bottom').removeClass('toBottom');
            $(this).find('.bottom').removeClass('bottomShowed');
            $(this).find('.middle').removeClass('toMiddle');
            $(this).find('.middle').removeClass('middleShowed');
            $(this).find('.top').removeClass('toTop');
            $(this).find('.top').removeClass('topShowed');
            $(this).removeClass('scale');
        })

        //案例介绍
        $('#section5').on('click',function () {
            window.location.href = "./cases.do";
        })

        this.marquee('marquee');
    }

    //新闻滚动切换
    ctrl.changeNews = function () {
        if(newsTimer){
            window.clearInterval(newsTimer);
        }
        var newsTimer = window.setInterval(function () {
            $('.news-panel-con').find("#news-wrap:first").animate({
                opacity: 0
            }, 500, function() {
                $(this).find(".news-row:first").appendTo(this);
                $(this).animate({
                    opacity: 1
                }, 500)
            });
        },5000)
    }
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
    ctrl.marquee = function(id){
        try{document.execCommand("BackgroundImageCache", false, true);}catch(e){};
        var container = document.getElementById(id),
            original = container.getElementsByTagName("dt")[0],
            clone = container.getElementsByTagName("dd")[0],
            speed = arguments[1] || 100;
        clone.innerHTML=original.innerHTML;
        var rolling = function(){
            if(container.scrollLeft == clone.offsetLeft){
                container.scrollLeft = 0;
            }else{
                container.scrollLeft+= 2;
            }
        }
        var timer = setInterval(rolling,20);

    }

    ctrl.init();


})(window)