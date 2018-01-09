import {Common} from "../common/common";
export let Model ={
    orderId : null,    //反馈id
    comment : null,    //评论
    userId  : Common.userId,    //客户id
    username : Common.userName,
    realName : Common.realName,
    userHead : Common.userHead,
    roleId   : Common.roleId,

    getSuggestDetail: {}, //获取反馈详情
    addComment : {},   //添加一条评论
    removeComment : {},   //删除一条评论

}
/**
 * 获取反馈详情
 */
Model.getSuggestDetail = function () {
    let param = {};
    param.data = {
        orderId : this.orderId
    }
    param.path = '/dwt/edp/workorder/get_work_order_by_id';
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
 * 添加一条评论
 */
Model.addComment = function () {
    let param = {};
    param.data = {
        orderId : this.orderId,
        comment : this.comment,
        userId  : this.userId,
        roleId:    this.roleId
    };
    param.path = '/dwt/edp/workorder/add_comment';
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
 * 删除一条评论
 */
Model.removeComment = function () {
    let param = {};
    param.data = {
        commentId : this.commentId
    }
    param.path = '/dwt/edp/workorder/delete_comment_by_id';
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