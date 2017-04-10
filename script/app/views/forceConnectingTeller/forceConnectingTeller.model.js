define(['../baseModel'], function (Base) {
    var model = new Base('connectingTeller');
    model.locale = {
			'en': {
				'Connecting': 'Connecting Customer Service officer, please wait...',
				'Reminder':'Reminder: Your conversation will be recorded.',
				'protect':'To protect your privacy, please pick up the handset or plug in your',
				'headphone':'headphone to the ear jack slot before the conversation begin ',
				'next': 'Next',
				'Cancel':'Cancel'
			},
			'zh': {
				'Connecting': '正在连接客户服务主任，请稍等',
				'Reminder':'请注意，为确保服务质量，我们的对话将会被录像及录音',
				'protect':'为了保护您的个人隐私，在通话过程中你可以提起电话听筒，或插入您的耳机',
				'headphone':' ',
				'next': '下一步',
				'Cancel':'取消'
			}
	};
	model.appModel(model.getTitle(), model);
    return model;
});