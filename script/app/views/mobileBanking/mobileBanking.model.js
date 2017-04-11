define(['../baseModel'], function (Base) {
	var model = new Base('mobileBanking model');
	model.locale = {
		'en': {
			'Mobile': 'Get Mobile Banking app',
			'Take': 'Take out your mobile phone and download  applications ',
			'TakeMobile':'Our Mobile Banking supports Android,iPhone and iPad devices',
			'IOS':'Apple',
			'Android':'Android',
			'please':'Please visit our website to download our applications :',
			'address':'www.ourbank.com/download/mobileapp/',
			'Continue':'Continue'
		},
		'zh': {
			'Mobile': '移动银行应用',
			'Take': '拿出您的手机下载应用程序 ',
			'TakeMobile':'我们的手机银行支持安卓，苹果手机和苹果平板电脑系统',
			'IOS':'苹果',
			'Android':'安卓',
			'please':'请访问我们的网站下载我们的应用程序:',
			'address':'www.ourbank.com/download/mobileapp/',
			'Continue':'下一步'
		}
	};

	return model;
});