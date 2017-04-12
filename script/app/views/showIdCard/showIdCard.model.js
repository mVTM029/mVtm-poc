define([ '../baseModel' ], function(Base) {
	var model = new Base('showIdCard model');
	model.locale = {
		'en' : {
			'Confirm' : 'Confirm',
			'please' : 'Please confirm your ID Card'
		},
		'zh' : {
			'Confirm' : '确认',
			'please' : '请确认您的身份证信息'
		}
	};

	return model;
});
