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

	model.monitor = {
		step:'showIdCard',//步骤
		systemType:'VTM',//系统类型
		operations:[
			{
				eventType:'event',
				monitorSource:'showIdCard-next',
				action:'click',
				target:'selectLanguage',
				description:'open select Language dialog'
			},
			{
				eventType:'event',
				monitorSource:'js-language-en',
				action:'click',
				target:'selectEn',
				description:'select en Language'
			},
			{
				eventType:'event',
				monitorSource:'js-language-can',
				action:'click',
				target:'selectZh',
				description:'select zh Language'
			},
			{
				unique:'continueButton',
				eventType:'event',
				monitorSource:'select-language-next',
				action:'click',
				target:'connectButton',
				description:'click connected button'
			}
		]
	};

	return model;
});
