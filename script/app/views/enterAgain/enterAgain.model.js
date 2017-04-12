define(['../baseModel'], function (Base) {
    var model = new Base('enterAgain');
    model.locale = {
			'en': {
				'enter': 'Confirm personal identification number',
				'again': 'Please enter your PIN again, and confirm',
				'Reminder':'Reminder : For your own security, do not use your identity card number, telephone number, mobile number, birthday or any commonly used number sequences',
				'continue':'Continue'
			},
			'zh': {
				'enter': '确认银行卡密码',
				'again': '请再次输入密码，完成后请按确认键',
				'Reminder':'提示 : 为了您的账户安全，请不要使用您的身份证号码，住宅电话，手机号码，生日或常用数字组合作为密码',
				'continue':'下一步'
			}
	};


    return model;
});