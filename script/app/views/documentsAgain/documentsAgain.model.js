define(['../baseModel'], function (Base) {
    var model = new Base('documentsAgain model');
    model.locale = {
			'en': {
				'reminder': 'Reminder: Relevant content should face up, please contact our branch staff if you need assistance',
				'please':'Please place your document into the drop box'
			},
			'zh': {
				'reminder': 'Reminder: Relevant content should face up, please contact our branch staff if you need assistance',
				'please':'Please place your document into the drop box'
			}
	}
    return model;
});