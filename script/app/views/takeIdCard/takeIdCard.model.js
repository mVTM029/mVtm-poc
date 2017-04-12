define(['../baseModel'], function (Base) {
	var model = new Base('takeIdCard model');
	model.locale = {
		'en': {
			'next': 'Continue',
			'reminder': 'Reminder: Please keep your ID card safe, ',
			'please':'Please take your ID card',
			'contact':'and contact our branch staff if you need assistance'
		},
		'zh': {
			'next': '下一步',
			'reminder': '温馨提示：请保管好您的身份证，如需协助请联系银行职员',
			'please':'请取回您的身份证',
			'contact':''
		}
	};


	return model;
});