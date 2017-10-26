/***
 * 依赖jquery
 */
(function(window){
    "use strict"
    var common = {};

    //基础路径
    common.baseUrl = $("#basePath").val();

    /***
     * ajax 网络请求
     */
    common.ajax = function(param){

        var json = new Object();

        if(typeof param.path != undefined){
            json.url = common.baseUrl + param.path;
        }else{
            //没有制定接口路径就直接返回
            return {"code":"110","msg":"path undefined"};
        }

        //请求参数 可以不传
        if(typeof param.data != undefined){
            json.data = JSON.stringify(param.data);
        }

        //success回掉函数必须是函数类型的参数
        if(typeof param.success == "function"){
            json.success = callback;
        }

        //error必须是函数类型的参数
        if(typeof param.error == "function"){
            json.error = param.error;
        }

        if(typeof param.async != undefined){
            json.async =  param.async;
        }else{
            json.async = true;
        }

        json.type        = "post";
        json.contentType = "applications/json;charset=UTF-8";
        json.dataType    = "json";

        $.ajax(json);

        function callback(res){
            //向数据对象添加get方法
            res && (res.get = get);
            param.success(res);

            function get( attributes ){
                attributes = attributes.replace(/\[/g, ".[").replace(/["|']/g,"");
                attributes = attributes.split(".");
                var length = attributes.length;

                var tmp = this;
                for(var i=0; i<length; i++){

                    if(/^\[(.*)\]$/.test(attributes[i])){
                        var index = RegExp.$1;
                        tmp = tmp[index]
                    }else{
                        tmp = tmp[ attributes[i] ]
                    }

                    if(tmp && i == length - 1){
                        return tmp
                    }else if(!tmp){
                        return undefined;
                    }

                }
            }


        }
    }
    //暴露改对象
    window.common = common;

})(window)
