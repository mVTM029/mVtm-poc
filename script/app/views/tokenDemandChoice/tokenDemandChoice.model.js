define(['../baseModel'], function (Base) {
    var model = new Base('tokenNeededChoice');
    model.locale = {
			'en': {
				'title':'Take Security Key',
				'tipOnTop': 'Once your account is opened today you will be able to register online for Internet Banking.<br/><br/> To make full-use of this service you will need a Security key. Security key can be used to log on and to access our full range of Online Banking services. It offers a higher level of security, which will help protect you from Online Banking fraud.',
				'tipOnBottom':'Would you like to collect it today?',
				'warning':'Reminder: You are currently at opening internet banking service for your account.',
				'need':'Yes',
				'notNeed':'No',
				'continueTip':'continue'
			},
			'zh': {
				'title':'是否需要密码器？',
				'tipOnTop': '您的账户已成功开通您可以继续注册网上银行。为了充分使用网银，你可以使用密码器登录进入我们全方位的网银服务。该网银安全性极高，可有效保护您的网银安全。 ',
				'tipOnBottom':'今天您是否需要拿到密码器?',
				'warning':'提示:您目前在为您的帐户打开网上银行服务。',
				'need':'是',
				'notNeed':'否',
				'continueTip':'下一步'
			}
	};

	model.monitor = {
		step:'tokenDemandChoice',//步骤
		systemType:'VTM',//系统类型
		operations:[
			{
				eventType:'event',
				monitorSource:'tokenDemandChoice-yes',
				action:'click',
				target:'goToTakeToken',
				description:'yes , go to take token page'
			},
			{
				eventType:'event',
				monitorSource:'tokenDemandChoice-no',
				action:'click',
				target:'goToOtherService',
				description:'no , go to other service'
			}
		]
	};

    return model;
});
