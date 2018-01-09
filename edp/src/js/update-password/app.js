require('../../scss/update-password.scss');

import { Common } from '../common/common';
import {UI} from '../common/ui';

 let local = {
        username:null,
        originPwd:null,
        newPwd:null
    };
    $(function () {
        local.init();
    });
    local.init = function () {
        this.username = Common.userName;
        this.realName = Common.realName;
        $('#username').html(this.username);
        $('#realName').html(this.realName);
        local.bind();
    };
    local.bind = function () {
        $('#newPwd').on('keyup',function (e) {
            if(e.keyCode == 13){
                $("#submit").click();
            }
        })
        $('#newPwdConfirm').on('keyup',function (e) {
            if(e.keyCode == 13){
                $("#submit").click();
            }
        })
        $('#submit').click(function () {
            $('#pwdTip').html('');
            $('#newPwdTip').html('');
            var pwd = $('#pwd').val();
            var newPwd = $('#newPwd').val();
            var newPwdConfirm = $('#newPwdConfirm').val();
            if(!pwd){
                $('#pwdTip').html('原密码不能为空');
                return;
            }
            if(!newPwd){
                $('#newPwdTip').html('新密码不能为空');
                return;
            }
            if(!newPwdConfirm){
                $('#newPwdConfirmTip').html('请确认密码');
                return;
            }
            if(newPwd != newPwdConfirm){
                $('#newPwdConfirmTip').html('两次密码不相同');
                return;
            }

            if(newPwd && pwd && newPwd == newPwdConfirm ){
                $('#pwdTip').html('');
                $('#newPwdTip').html('');
                $('#newPwdConfirmTip').html('');

                var param = {};
                var data = {
                    username:Common.userName,
                    password: pwd,
                    newPassword:newPwd
                }
                param.data = data;
                param.path = "/dwt/privilege/edit_password";
                Common.post(param).subscribe(function (res) {
                    if(res.code == 0){
                        UI.alert({
                            'content': "密码已修改成功，请重新登录",
                            'btn': '知道了',
                            'callback': function () {
                                //退出登录
                                $.cookie('edp_user_name', null);
                                $.cookie('edp_real_name', null);
                                $.cookie('edp_user_head', null);
                                $.cookie('edp_user_id', null);
                                $.cookie('edp_role_id', null);
                                window.sessionStorage.removeItem('edp_privilege');
                                window.parent.location.href = Common.baseUrl + '/analysis/login.html';
                                return;
                            }
                        })



                    }else{
                        $('#pwdTip').html('原密码不正确');
                    }
                })

            }
        })
    }
