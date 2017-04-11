define(['../baseModel'], function (Base) {
    var model = new Base('takeCard');
    model.locale = {
			'en': {
				'take': 'Please take your debit card',
				'continue':'Continue'
			},
			'zh': {
				'take': '请取出您的银行卡',
				'continue':'下一步'
			}
	};


    return model;
});