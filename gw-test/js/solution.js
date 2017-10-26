(function () {
    "use strict"
    
	//
	// function Gallery( option ) {
	//
     //    this.holder = $("#" + option.id);
	//
	// 	this.holder.css("position", "relative");
	//
     //    this.items = this.holder.find('.item');
	//
	// 	this.items.css("position", "absolute");
	//
     //    this.itemWidth = option.itemWidth;
	//
     //    this.change( option.defaultIndex || option.defaultIndex == 0 ? option.defaultIndex : this.items.length / 2 );
	//
	// }
	//
	// Gallery.prototype.change = function ( index ) {
	//
	// 	var length = this.items.length;
	//
	// 	if (length == 0 ){
	//
	// 		return false;
	//
	// 	}
	//
	// 	//计算每倾斜的图片显示部分的宽度
	//
	// 	var showWidth = this.holder.width() / length;
	//
	// 	for ( var i = 0; i < length; i++ ){
	//
	// 	    if ( i < index ){
	//
	// 	        var left = i * showWidth;
	// 			$(this.items[i]).css("left", left + 'px');
	// 			$(this.items[i]).css("z-index", i);
	//
	// 			this.animate( this.items[i], 30 );
	//
	//
     //        }else if ( i == index ){
	//
	// 			var left = i * showWidth;
	//
	// 			$(this.items[i]).css("left", left + 'px');
	// 			$(this.items[i]).css("z-index", length);
	// 			this.animate( this.items[i], 0 );
	//
     //        }else{
	// 			var left = i * showWidth;
	// 			$(this.items[i]).css("left", left + 'px');
	// 			$(this.items[i]).css("z-index", length - i);
	// 			this.animate( this.items[i], -30 );
	//
	//
	//
	// 		}
	//
     //    }
	//
	//
	// };
	//
	// Gallery.prototype.animate = function ( item, degree ) {
	//
	//     //获取旋转之前的角度
	//
     //    var transform = $(item).css('transform');
	//
	// 	var preDegree = 0;
	//
     //    if ( $(item).data('degree') ){
	// 		preDegree = $(item).data('degree');
     //    }
	//
     //    var step = ( degree - preDegree )/100;
	//
     //    var transitionDegree = preDegree;
	//
     //    var t = setInterval( function () {
	//
	// 		transitionDegree += step;
	//
	// 		$(item).css("transform", "perspective(600px) rotateY(" + transitionDegree + "deg) scale(0.9)");
	//
	// 		if ( Math.abs( degree - transitionDegree ) <= Math.abs( step ) ){
	//
	// 			$(item).css("transform", "perspective(600px) rotateY(" + degree + "deg) scale(0.9)");
	// 			$(item).data('degree', degree);
	// 			clearInterval( t )
	// 		}
	//
	// 	}, 600/100)
	//
	//
	//
	// };
	//
    var ctrl = {
        init : {},
        bind : {},

        exchange : {},

    };


    ctrl.init = function () {

        this.bind();

	};


    ctrl.bind = function () {

        var _this = this;


        $(".buttons button").click( function () {

            var index = $(this).attr('index');

            _this.exchange( index );



		})

		$(".item").click( function () {

			if ( $(this).hasClass('center')){
				return false;
			}

			var index = $(this).attr( 'index' );
			_this.exchange( index );

		})
	};

	var animating = false;

	ctrl.exchange = function ( index ) {

	    if (animating){

	        return false;
        }

		animating = true;

		var centerPage = $("#center");
		var itemPage = $(".item[index='"+index+"']");
		var centerOldImg = centerPage.find('img:eq(0)');
		var centerClonedImg = centerOldImg.clone();

		$(".buttons button").removeClass( 'active' );
		$(".buttons button[index='" + index + "']").addClass( 'active' );

		$(".app-desc .desc").hide();
		$(".app-desc .desc[index='" + index + "']").show();

		var itemOldImg = itemPage.find('img:eq(0)');
		var itemClonedImg = itemOldImg.clone();

		itemClonedImg.css('opacity', '0');
		centerClonedImg.css('opacity', '0');

		centerPage.append( itemClonedImg );

		itemPage.append( centerClonedImg );

		var opacity = 0;
        var t = setInterval( function () {
			opacity += 0.05;

			itemClonedImg.css( 'opacity', opacity );
			centerClonedImg.css( 'opacity', opacity );

			itemOldImg.css( 'opacity', 1-opacity );
			centerOldImg.css( 'opacity', 1-opacity );

			if (Math.abs( opacity - 1 ) <= 0.05){

			    clearInterval(t);

				itemOldImg.remove();
				centerOldImg.remove();
				animating = false;

				//交换index
				var itemIndex = itemPage.attr( 'index' );
				var centerIndex = centerPage.attr( 'index' );

				centerPage.attr( 'index', itemIndex );
				itemPage.attr( 'index', centerIndex );

				itemClonedImg.css( 'opacity', 1 );
				centerClonedImg.css( 'opacity', 1 );

            }

		}, 30)

	};

    $(function () {
        ctrl.init();
    })

})()