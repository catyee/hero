require( '../../scss/verify-phone.scss' );

import { helper } from './helper';

let app = {
	init:{},
	bind:{},
	isCountingDown:false,
};
app.init = function () {

	this.bind();
};

app.bind = function () {

	var _this = app;

	//点击获取验证码按钮

	$('#countDown').on('click',function () {
		if(_this.isCountingDown){
			return;
		}

		//验证手机号码是否为空，如果为空，给出提示

		let phoneNumber = $('#phoneNumber').val();
		if(!phoneNumber){
			$('#phoneTip').html('请输入手机号');
			return;
		}else {
			$('#phoneTip').html('');

			//手机号不为空 验证手机号是否正确 如果正确进行倒计时 不正确则给出提示

			_this.verifyPhone(phoneNumber);

		}
	});

	//监听手机号和验证码输入 不为空时改变提交按钮状态

	$('#phoneNumber,#codeNumber').keyup(function (e) {
		if(e.keyCode == 13){
			$('#confirm').click();
		}
		let phoneNumber = $.trim($('#phoneNumber').val());
		let codeNumber  = $.trim($('#codeNumber').val());

		if(phoneNumber.length > 0 && codeNumber.length > 0){
			$('#confirm').addClass('able');
		}else {
			$('#confirm').removeClass('able');
		}

	});

	//点击确定按钮

	$('#confirm').on('click',function () {
		$('#phoneTip').text('');
		$('#codeTip').text('');

		let phoneNumber = $.trim($('#phoneNumber').val());
		let codeNumber = $.trim($('#codeNumber').val());

		if(phoneNumber.length == 0){
			$('#phoneTip').text('请填写手机号');
			return;
		}else if(codeNumber.length == 0){
			$('#phoneTip').text('');
			$('#codeTip').text('请填写验证码');
			return;
		}else{
			helper.verifyPhone(phoneNumber,codeNumber)
				.then(function (res) {

					//存储id

					$.cookie('id',res.id);
					window.location.href = 'reset-password.html';
				})
				.catch(function () {
					$('#codeTip').text('验证码不正确');
				});
		}
	});
};

//验证手机号是否正确 如果正确进行倒计时 不正确则给出提示

app.verifyPhone = function (mobile) {
	let _this = app;
	helper.getCode(mobile)
		.then(function (res) {
			$('#phoneTip').html('');
			_this.countDown();
		})
		.catch(function () {
			$('#phoneTip').html('手机号不正确');
		});
};

//进行倒计时

app.countDown = function () {
	let  _this = app;
	var i = 60;
	_this.isCountingDown = true;
	countdown();
	function countdown() {
		i--;
		if(i <= 0){
			$('#countDown').val('点击获取验证码');
			_this.isCountingDown = false;
			return;
		}
		$('#countDown').val(i+'s');
		if(timer){
			window.clearTimeout(timer);
		}
		var timer = window.setTimeout(countdown,1000);
	}



};
$(function () {
	app.init();
});