define(['../baseModel'], function (Base) {
	var model = new Base('takeIdCard model');
	model.locale = {
		'en': {
			'next': 'Continue',
			'reminder': 'Reminder: Please keep your ID card safe, ',
			'please':'Please take your ID card',
			'contact':'and contact our branch staff if you need assistance'
		},
		'zh': {
			'next': '下一步',
			'reminder': '温馨提示：请保管好您的身份证，如需协助请联系银行职员',
			'please':'请取回您的身份证',
			'contact':''
		}
	};

	model.monitor = {
		step:'takeIdCard',//步骤
		systemType:'VTM',//系统类型
		operations:[
			{
				eventType:'window',//如果eventType是window，和华为有关系或硬件
				unique:'xfs',//则unique必有值，espace(华为)或xfs(硬件)回调
				monitorSource:'IDCardReaderAsyncReadRawDataCallBack',//window上绑定的回调事件名称
				action:'take',//操作
				target:'takeIdCard',//目标为null是为了给后台放值
				description:'Take  the ID Card',//描述
				judgeEvent:'WFS_SRVE_IDC_MEDIAREMOVED'//espace(华为情况下判断条件特殊处理)
			}
		]
	};
	return model;
});