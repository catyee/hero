/**
 * Created by VENN on 2017/6/16.
 */
(function () {
   "use strict"

    var ctrl = {
       init : {},
       bind : {}
    }

    ctrl.init = function () {
        ctrl.bind();
    }

    ctrl.bind = function () {

       //点击特色服务的展开收起箭头
        $(".value-added-service .service-head").on("touchend", function () {
            $(this).parent().toggleClass("active");
        })

    }

    ctrl.init();
})()