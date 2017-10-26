// function initSwiperHeight(id) {
//     var caseContainers = $("#"+ id + " .case-container");
//     var swiperHeight = 0;
//     for (var i = 0; i < caseContainers.length; i++) {
//         var contianer = $(caseContainers[i]);
//         if (contianer.height() > swiperHeight) {
//             swiperHeight = contianer.height();
//         }
//     }
//     for (var i = 0; i < caseContainers.length; i++) {
//         var contianer = $(caseContainers[i]);
//         contianer.height(swiperHeight);
//     }
//     console.log(swiperHeight);
//     $(".swiper-container").height(swiperHeight + 40);
// }

// function bindImgLoadEvent(id) {
//     var swiperImages = $("#" + id + " .case-img");
//     for (var i = 0; i < swiperImages.length; i++) {
//         var img = swiperImages[i];
//         img.onload = function () {
//             initSwiperHeight(id);
//         }
//     }
// }

$(function () {
    // bindImgLoadEvent("car-case");
    // initSwiperHeight("car-case");

    var swiper = new Swiper('#car-case .swiper-container', {
        pagination: '#car-case .swiper-pagination',
        paginationClickable: true,
        autoplay: 5000,
        spaceBetween: 30,
    });

    var swiper = new Swiper('#edu-case .swiper-container', {
        pagination: '#edu-case .swiper-pagination',
        paginationClickable: true,
        autoplay: 5000,
        spaceBetween: 30,
    });

    var swiper = new Swiper('#medicine-case .swiper-container', {
        pagination: '#medicine-case .swiper-pagination',
        paginationClickable: true,
        autoplay: 5000,
        spaceBetween: 30,
    });

    var swiper = new Swiper('#data-case .swiper-container', {
        pagination: '#data-case .swiper-pagination',
        paginationClickable: true,
        autoplay: 5000,
        spaceBetween: 30,
    });
});

