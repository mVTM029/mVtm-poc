define(['../baseModel'], function (Base) {
    var model = new Base('rateExperience model');
    model.locale = {
			'en': {
				'Thank': 'Thank you for choosing our bank',
				'Please': 'Please rate Customer Service Officer',
				'rate':'Please rate your overall experience',
				'Confirm':'Back to Home'
			},
			'zh': {
				'Thank': '谢谢您选择我们银行',
				'Please': '请对客户服务人员进行评价',
				'rate':'请对全部体验进行评价',
				'Confirm':'返回首页'
			}
	};

    return model;
});