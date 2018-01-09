import {Common} from "../common/common";
export let Model = {
    userId : Common.userId,           //客户id
    realName : Common.realName,           //客户名字
    title : null,           //反馈标题
    content : null,         //反馈内容 有格式
    content1 : null,        //反馈内容 无格式
    pic : null,             //反馈图片
    visible: 1,             // 是否公开 默认是
    flag: 1,                // 1自己还是 2全部
    keyWord : null,        // 关键字
    orderId :null,         // 反馈id
    pageSize : 10,         // 每页数量
    currentPage : 1,       // 当前页
    isAll: 1,               //是否全部反馈
    updateSuggest : {},    //写反馈 或 更新反馈
    getSuggestList : {},   //获取反馈列表
}
/**
 * 添加一条反馈
 * @param data
 */
Model.updateSuggest = function () {
    let param = {};
    param.data = {
        userId : this.userId,
        orderId : this.orderId?this.orderId:null,
        title : this.title,
        content : this.content,
        content1 : this.content1,
        pic : this.pic,
        visiable : this.visible,
        realName : Common.realName,
    };
    param.path = '/dwt/edp/workorder/add_or_update_work_order';
    return new Promise(function (resolve,reject) {
        Common.post1(param).subscribe(function (res) {
            if(res.code == 0){
                resolve(res);
            }else {
                reject(res.code);
            }
        })
    })
}

/**
 * 分页获取反馈列表
 * @param isAll 是否查询全部反馈
 */
Model.getSuggestList = function () {
    let param = {};
    // 全部反馈 null，我的反馈 userId
    param.data = {
        currentPage : this.currentPage,
        pageSize : this.pageSize,
        userId :  this.userId,
        visiable : this.visible,
        flag　: this.flag,
        keyWord　: this.keyWord,
    }
    param.path = "/dwt/edp/workorder/page_get_work_orders";
    return  new Promise(function (resolve,reject) {
        Common.post1(param).subscribe(function (res) {
            if(res.code == 0){
                resolve(res);
            }else {
                reject(res.code);
            }
        })
    })
}

