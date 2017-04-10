define(['../baseModel'], function (Base) {
    var model = new Base('triggerWait model');
    model.locale = {
			'en': {
				'Processing': 'Customer Service Officer is in operation, please wait...',
				'currently':'We are currently verifying your application'
			},
			'zh': {
				'Processing': '正在处理…请稍侯 ',
				'currently':'我们正在核对你的申请'
			}
	};

	model.monitor = {
		step:'scanId',
		systemType:'VTM',
		operations:[
			{
				unique:'xfs',
				eventType:'window',
				monitorSource:'callBackPDFControlType',
				action:'Click',
				target:'clickArea',
				description:'',
				judgeEvent:'OpenSignBox'
			},
			{
				unique:'xfs',
				eventType:'window',
				monitorSource:'callBackPDFControlType',
				action:'Click',
				target:'clickDoneButton',
				description:'',
				judgeEvent:'SignName'
			},
			{
				unique:'xfs',
				eventType:'window',
				monitorSource:'callBackPDFControlType',
				action:'Click',
				target:'clickConfirmButton',
				description:'',
				judgeEvent:'SignComplete'
			}
		]
	};

    return model;
});