(function (window) {
    "use strict"
    var ctrl = {
        init : {},
        bind : {},
    }
    ctrl.init = function () {
        this.bind();
        this.setCompanyAddress();
        
    }
    ctrl.bind = function () {
        //点亮标题
        $('.nav-list li a').removeClass(' nav-border-yellow');
        $('.nav-list .nav-contact a').addClass(' nav-border-yellow');

        //点击查看详细招聘信息
        
        $('.job-name').on('click',function () {
            $(this).parent().find('.detail-content').toggle();
            $(this).toggleClass('default-border');
            $(this).toggleClass('active-border');
            $(this).parent().find('.height17').toggle();
        })
    }
    //设置公司地理位置
    ctrl.setCompanyAddress = function () {
        var map = new BMap.Map("company-address");
        var point = new BMap.Point(116.546499, 39.811132);
        map.centerAndZoom(point, 15);
        var myIcon = new BMap.Icon("../../images/contact/marker.png", new BMap.Size(76,82),{
            anchor:new BMap.Size(38,67),
            imageOffset:new BMap.Size(0,0)
        });
        var marker = new BMap.Marker(point,{icon:myIcon});
        map.addOverlay(marker);
        marker.setAnimation(BMAP_ANIMATION_BOUNCE);
        map.enableScrollWheelZoom(true);



    }
    ctrl.init();
})(window)