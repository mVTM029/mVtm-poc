define(['../baseModel'], function (Base) {
    var model = new Base('faceToface model');
    model.locale = {
			'en': {
				'teller': 'Our officer will ask you a few more questions',
				'Reminder': 'In order to protect your privacy, please pick the handset or use earphone in progress. Your conversation will be recorded.',
				'Continue':'Continue'
			},
			'zh': {
				'teller': '客户服务主任将会询问您一些问题',
				'Reminder': '为了保护您的个人隐私，在通话过程中您可以提起电话听筒，或插入您的耳机。<br>请注意，为确保服务质量，我们的对话将会被录音及录像。',
				'Continue':'下一步'
			}
	}
    return model;
});