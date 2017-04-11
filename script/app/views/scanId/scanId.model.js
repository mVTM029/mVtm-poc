define(['../baseModel'], function (Base) {
	var model = new Base('scanId');

	model.locale = {
		'en': {
			'insert': 'Please insert your ID card',
			'reminder': 'Reminder:Please insert your 2nd generation ID card,please contact our branch staff if you need assistance ',
			'next': 'Continue'
		},
		'zh': {
			'insert': '请插入您的身份证',
			'reminder': '提示:请插入您的第二代身份证,如果您需要帮助请联系我们部门员工',
			'next': '下一步'
		}
	};

	model.monitor = {
		step:'scanId',
		systemType:'VTM',
		operations:[
			{
				unique:'xfs',
				eventType:'window',
				monitorSource:'IDCardReaderAsyncReadRawDataCallBack',
				action:'Insert',
				target:'insertIdCard',
				description:'Insert the ID card',
				judgeEvent:'WFS_EXEE_IDC_MEDIAINSERTED'
			}
		]
	};


	return model;
});