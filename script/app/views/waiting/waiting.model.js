define(['../baseModel'], function (Base) {
    var model = new Base('waiting model');
    model.locale = {
			'en': {
				'scanning': 'ID card scanning, please wait...',
				'next':'Continue'
			},
			'zh': {
				'scanning': '身份证扫描中，请稍等……',
				'next':'下一步'
			}
	}
    return model;
});