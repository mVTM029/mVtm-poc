define(['../baseModel'], function (Base) {
	var model = new Base('selectCardType model');
	model.locale = {
		'en': {
			'HKIdCard':'HK ID Card',
			'HKPassport':'HK Passport',
			'Non-hkPassport':'Non HK Passport',
			'next': 'Continue',
			'please': 'Please select your ID card type'

		},
		'zh': {
			'HKIdCard':'香港身份证',
			'HKPassport':'香港护照',
			'Non-hkPassport':'非香港护照',
			'next': '下一步',
			'please':'请选择您的证件类型'

		}
	}
	return model;
});