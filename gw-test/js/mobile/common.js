(function (window) {
    "use strict"
    var common = {
        init : {},
        bind : {},
    }

    common.init = function () {
        common.bind();
    }

    common.bind = function () {
        $(".common-header .menu").click(function(){
            $(this).toggleClass('active');
            $("#menu-list-panel").fadeToggle(500);
            return false;
        })

        $("#menu-list-panel").bind("touchmove scroll", function (e) {
            e.stopPropagation();
            e.preventDefault();
            return false;
        })

        $("#menu-list-panel").bind("touchmove scroll", function (e) {
            e.stopPropagation();
            e.preventDefault();
            return false;
        })

        $(window).scroll(function (e) {
            var top = $("body").scrollTop();
            top = top/100;
            $(".common-header-con").css("background", "rgba(30,30,30,"+ top +")");

        })

    }

    $(function () {
        common.init();
    })

    window.common = common;
})(window)