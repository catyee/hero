;(function ($) {
  'use strict';
  var win = window;
  var doc = document;
  var $win = $(win); //当前可见区域
  var $doc = $(doc); //整个文档
  $.fn.dropload = function (options) {
    return new MyDropLoad(this,options);
  };
  var MyDropLoad = function (element,options) {
    var _this = this;
    _this.$element = element;
    //上方是否插入DOM
    _this.upInsertDOM = false;
    //loading状态
    _this.loading = false;
    //是否锁定
    _this.isLockUp = false;
    _this.isLockDown = false;
    //是否有数据
    _this.isData = true;
    //滚动条顶部滚动距离
    _this._scrollTop = 0;
    //提前加载的距离
    _this.threshold = 0;
    _this.init(options);
  };


  MyDropLoad.prototype.init = function (options) {
    var _this = this;
    _this.opts = $.extend(true,{},{
      scrollArea : _this.$element,
      domUp : {                                                            // 上方DOM
        domClass   : 'dropload-up',
        domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
        domUpdate  : '<div class="dropload-update">↑释放更新</div>',
        domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
      },
      domDown : {                                                          // 下方DOM
        domClass   : 'dropload-down',
        domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
        domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
        domNoData  : '<div class="dropload-noData">暂无数据</div>'
      },
      autoLoad   : true,                                                      //自动加载
      distance   : 50,                                                        //拉动距离
      threshold  : '',                                                        //提前加载距离
      loadUpFn   : '',                                                        //上方function
      loadDownFn : '',                                                        //下方function

    },options);

    //如果加载下方，事先在下方插入DOM
    if(_this.opts.loadDownFn != ''){
      _this.$element.append('<div class="'+_this.opts.domDown.domClass+'">'+_this.opts.domRefresh+'</div>');
      _this.$domDown = $('.'+ _this.opts.domDown.domClass); //底部提示
    }

    //计算提前加载距离
    if(!!_this.$domDown && _this.opts.threshold === ''){
      //默认滑到加载区2/3处时加载
      _this.threshold = Math.floor(_this.$domDown.height()*1/3);
    }else {
      _this.threshold = _this.opts.threshold;
    }
    //判断滚动区域
    if(_this.opts.scrollArea == win){
      _this.$scrollArea = $win;
      //获取文档高度
      _this._scrollContentHeight = $doc.height();
      //获取win显示高度
      _this._scrollWindowHeight = doc.documentElement.clientHeight;
    }else {
      _this.$scrollArea = _this.opts.scrollArea;
      _this._scrollContentHeight = _this.$element[0].scrollHeight;
      _this._scrollWindowHeight = _this.$element.height();
    }
    fnAutoLoad(_this);
    //窗口调整
    $win.on('resize',function () {
      clearTimeout(_this.timer);
      _this.timer = setTimeout(function () {
        if(_this.opts.scrollArea == win){
          //重新获取win显示区高度
          _this._scrollWindowHeight = win.innerHeight;
        }else {
          _this._scrollWindowHeight = _this.$element.height();
        }
        fnAutoLoad(options);
      },150)
    });
    //绑定触摸
    _this.$element.on("touchstart",function (e) {
      if(!_this.loading){
        fnTouches(e);
        fnTouchstart(e,_this);
      }
    });
    _this.$element.on('touchmove',function (e) {
      if(!_this.loading){
        fnTouches(e);
        fnTouchmove(e,_this);
      }
    });
    _this.$element.on("touchend",function (e) {
      if(!_this.loading){
        fnTouchend(_this);
      }
    });
    //加载下方
    _this.$scrollArea.on('scroll',function () {
      _this._scrollTop = _this.$scrollArea.scrollTop();
      //滚动页面触发加载数据
      if(_this.opts.loadDownFn != ''
          && !_this.loading
          && !_this.isLockDown
          && (_this._scrollContentHeight - _this.threshold) <= (_this._scrollWindowHeight + _this._scrollTop)
        ){
          loadDown(_this);
      }
    });
  };
  //touches
  function fnTouches(e) {
    if(!e.touches){
      e.touches = e.originalEvent.touches;
    }
  }
  //touchstart
  function fnTouchstart(e,_this) {
    _this._startY = e.touches[0].pageY;
    //记住触摸时的scrolltop值
    _this.touchScrollTop = _this.$scrollArea.scrollTop();
  }
  //touchmove
  function fnTouchmove(e,_this) {
    _this._curY = e.touches[0].pageY;

  }
})(window.jQuery || window.Zepto)

