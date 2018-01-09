import {Common} from '../common/common';
export let helper = {
    resetPassword:{}
}
helper.resetPassword = function (password,id) {
    let param = {};
    param.data = {
        password:password,
        id:id
    }
    param.path = "/dwt/app/app/forget_password";
    return new Promise(function (resolve,reject) {
        Common.post(param).subscribe(function (res) {
            if(res.code == 0){
                resolve(res);
            }else {
                reject(res.code);
            }
        })
    })
}