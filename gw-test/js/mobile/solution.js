(function () {
    var ctrl = {
        init: {},
        bind: {},
        initSolutionSwiper: {},
    }
    
    ctrl.init = function () {
        ctrl.initSolutionSwiper();
    }
    
    ctrl.bind = function () {
        
    }
    
    ctrl.initSolutionSwiper = function () {
        var mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            loop: false,
            autoplayStopOnLast:true,

            pagination: '.swiper-pagination'
        })
    }

    $(function () {
        ctrl.init();
    })

})()