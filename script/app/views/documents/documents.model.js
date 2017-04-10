define(['../baseModel'], function (Base) {
    var model = new Base('documents model');
    model.locale = {
			'en': {
				'reminder': 'Reminder: Relevant content should face up, please contact our branch staff if you need assistance',
				'please':'Please place your document into the scan box',
				'next': 'Continue'
			},
			'zh': {
				'reminder': 'Reminder: Relevant content should face up, please contact our branch staff if you need assistance',
				'please':'Please place your document into the scan box ',
				'next': 'ÏÂÒ»²½'
			}
	}
    return model;
});