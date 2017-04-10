define(['../baseModel'], function (Base) {
    var model = new Base('phoneBankNumberAgain');
    model.locale = {
			'en': {
				'Register': 'Set personal identification number',
				'Please': 'Please enter your PIN again , and confirm',
				'Reminder':'Reminder : For your own security, do not use your identity card number, telephone number, mobile number, birthday or any commonly used number ',
				'warning-label':'Reminder : You are currently at opening phone banking service for your account',
				'continue':'Continue'
			},
			'zh': {
				'Register': '设置个人识别号码',
				'Please': '请再次输入您的密码，并确认',
				'Reminder':'提示 : 为了您的自身安全,请不要使用您的身份证号码、电话号码、手机号码、生日或任何常用的号码 ',
				'warning-label':'提示:您目前在为您的帐户打开电话银行服务。',
				'continue':'下一步'
			}
	};

	model.monitor = {
		step:'phoneBankNumberAgain',//步骤
		systemType:'VTM',//系统类型
		operations:[
			{
				eventType:'window',//如果eventType是window，和华为有关系或硬件
				unique:'xfs',//则unique必有值，espace(华为)或xfs(硬件)回调
				monitorSource:'PinpadGetDataAsyncCallBack',//window上绑定的回调事件名称
				action:'enter',//操作
				target:'secondEnterForPhoneBank',//目标为null是为了给后台放值
				description:'second enter is finished',//描述
				judgeEvent:'WFS_CMD_PIN_GET_DATA'//espace(华为情况下判断条件特殊处理)
			}
		]
	};

	model.ansiNewPinBlock= null;//密码
    return model;
});