define(['../baseModel'], function (Base) {
    var model = new Base('forceConnectedTeller');
    model.locale = {
			'en': {
				'connected': 'You are now connected to our Customer Service Officer',
				'Reminder':'Reminder: Your conversation will be recorded.',
				'Cancel':'Cancel'
			},
			'zh': {
				'connected': '连接成功',
				'Reminder':'请注意，为确保服务质量，我们的对话将会被录像及录音',
				'Cancel':'取消'
			}
	};

    return model;
});