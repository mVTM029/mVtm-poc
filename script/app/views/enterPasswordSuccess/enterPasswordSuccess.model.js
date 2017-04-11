define(['../BaseModel'], function (Base) {
    var model = new Base('enterPasswordSuccess model');
    model.locale = {
			'en': {
				'enter': 'Set personal identification number',
				'use': 'set password success',
				'Reminder':'',
				'continue':'Continue'
			},
			'zh': {
				'enter': '设置银行卡密码',
				'use': '密码设置成功',
				'Reminder':'',
				'continue':'下一步'
			}
	}
    return model;
});