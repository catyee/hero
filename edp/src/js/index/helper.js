
export let helper = {
    userId:Common.userId,
    roleId:Common.roleId


}


helper.initPr = function () {
    this.getAlarm().then( this.renderAlarm ).catch( ()=>{

    } )
}

/**
 * 获取首页配电室列表
 * **/

helper.getPrList = function () {
    var data = {
        userId:this.userId,
        roleId:this.roleId
    }
    var path = "/dwt/edp/electric/edp_home_page";
    var param = {
        path:path,
        data:data
    };
    return new Promise(function (resolve,reject) {
        Common.post(param).subscribe((res)=>{
            resolve( res );
        })
    })
}
