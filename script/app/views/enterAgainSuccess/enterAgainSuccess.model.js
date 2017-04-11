define(['../BaseModel'], function (Base) {
    var model = new Base('enterAgainSuccess model');
    model.locale = {
			'en': {
				'enter': 'Set personal identification number',
				'use': 'set password Again success',
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