define(['../BaseModel'], function (Base) {
    var model = new Base('passwordAgain model');
    model.locale = {
			'en': {
				'enter': 'Set personal identification number',
				'uses': 'set password again success',
				'Reminder':'',
				'continue':'Continue'
			},
			'zh': {
				'enter': '设置银行卡密码',
				'uses': '密码设置成功',
				'Reminder':'',
				'continue':'下一步'
			}
	}
    return model;
});