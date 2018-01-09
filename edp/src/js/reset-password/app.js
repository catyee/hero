require( '../../scss/reset-password.scss' );

import { helper } from './helper';


let app = {
    init:{},
    bind:{}
}
app.init = function () {
    this.bind();
}

app.bind = function () {
    
    $('#newPassword,#confirmPassword').keyup(function (e) {
        if(e.keyCode == 13){
            $('#confirm').click();
        }
        let newPassword = $.trim($('#newPassword').val());
        let confirmPassword = $.trim($('#confirmPassword').val());
        if(newPassword.length > 0 && confirmPassword.length > 0){

            $('#confirm').addClass('able');
        }else {
            $('#confirm').removeClass('able');
        }
    })
    
    //点击确定按钮
    $('#confirm').click(function () {
        $('#newPasswordTip').text('');
        $('#confirmPassword').text('');

        let newPassword = $.trim($('#newPassword').val());
        let confirmPassword = $.trim($('#confirmPassword').val());

        if(newPassword.length == 0){
            $('#newPasswordTip').text('请输入新密码');

        }else if (confirmPassword.length == 0){
            $('#confirmPasswordTip').text('请确认新密码');
        }else if(newPassword != confirmPassword){
            $('#confirmPasswordTip').text('两次密码不一致');
        }else {
            //提交修改密码
            let id = $.cookie('id');
            helper.resetPassword(newPassword,id)
                .then(function () {
                    window.location.href = 'reset-complete.html';
                })
                .catch(function () {
                    $('#confirmPasswordTip').text('密码修改失败');
                })
        }
    })
    
}

$(function () {
    app.init();
})