/**
 * 用户控制器
 */

var userController = {
	checkIn       :  {},           //用户登录
	loginOut      :  {},           //退出登录
	initUserInfo  :  {},           //初始化用户信息
}

$(function(){
	userController.initUserInfo();
	/***
	 * 点击登录按钮
	 */
	$("#check-in-btn").click(function(){
		var account = $.trim($("#moni-username").val());
		var password = $("#moni-password").val();
		userController.checkIn(account, password);
		return false;
	})
	
	$("#moni-account,#moni-password").keyup(function(e){
		if(e.keyCode == 13){
			$("#check-in-btn").click();
		}
	})
	
	//确认退出系统
	$("#logout-button").click(function(){
		$('#logout-confirm').modal();
	})
	
	$("#logout-confirm-button").click(function(){
		$('#logout-confirm').modal('hide');
		userController.loginOut();
	})
})


/***
 * 用户登录
 * @param account 用户名
 * @param password 密码
 */
userController.checkIn = function(account, password){
	$("#account-tips").text("")
	$("#password-tips").text("")
	userModel.checkIn(account,password,function(result){
		if(result.code == "0"){
			if(!(result.role == "20" || result.role == "30" || result.role == "40" || result.role == "50" || result.role == "60" || result.role == "90")){
				$("#account-tips").text("用户不存在")
				console.log("不允许该用户类型登陆")
				return false;
			}
			var isRemember = $("#moni-remember").is(":checked");
			
			var param = null;
			
			if(isRemember){
				param = {"path":"/",expires: 30}
			}else{
				param = {"path":"/"}
			}
			
			$.cookie("roleType",result.role,param);
			$.cookie("roleId",result.roleId,param);
			$.cookie("account",account,param); //账号
			$.cookie("username",result.roleName,param);  //
			window.location.href=moni.baseUrl+"/index.do";
		}else if(result.code == "425"){
			$("#password-tips").text("密码错误")
		}
	})
}

/***
 * 退出系统
 */
userController.loginOut = function(){
	$.cookie("roleType",null,{"path":"/"});
	$.cookie("roleId",null,{"path":"/"});
	$.cookie("account",null,{"path":"/"});
	window.location.href= moni.baseUrl+"/login.do";
	
}

/***
 * 初始化用户信息
 */
userController.initUserInfo = function(){
	if(/login/.test(window.location.pathname)){
		return false;
	}
	if($.cookie("roleId") == null || $.cookie("roleId") == "undefined"){
		window.location.href = moni.baseUrl+"/login.do";
		return false;
	}
	
	$("#user-name").text($.cookie("account").length>8?$.cookie("account").slice(0,8)+"...":$.cookie("account"));
}