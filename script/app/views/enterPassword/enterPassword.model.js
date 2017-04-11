define(['../baseModel'], function (Base) {
    var model = new Base('enterPassword');
    model.locale = {
			'en': {
				'enter': 'Set personal identification number',
				'use': 'Please use the keypad to enter your 6-digit PIN, and confirm',
				'Reminder':'Reminder : For your own security, do not use your identity card number, telephone number, mobile number, birthday or any commonly used number sequences',
				'continue':'Continue'
			},
			'zh': {
				'enter': '设置银行卡密码',
				'use': '请使用实体键盘输入6位数字密码, 完成后请按确认键',
				'Reminder':'提示 : 为了您的账户安全，请不要使用您的身份证号码，住宅电话，手机号码，生日或常用数字组合作为密码',
				'continue':'下一步'
			}
	};


    return model;
});