define(['../baseModel'], function (Base) {
    var model = new Base('enterAgain');
    model.locale = {
			'en': {
				'enter': 'Confirm personal identification number',
				'again': 'Please enter your PIN again, and confirm',
				'Reminder':'Reminder : For your own security, do not use your identity card number, telephone number, mobile number, birthday or any commonly used number sequences',
				'continue':'Continue'
			},
			'zh': {
				'enter': '确认银行卡密码',
				'again': '请再次输入密码，完成后请按确认键',
				'Reminder':'提示 : 为了您的账户安全，请不要使用您的身份证号码，住宅电话，手机号码，生日或常用数字组合作为密码',
				'continue':'下一步'
			}
	};

	//model.monitor = {
	//	step:'enterAgain',//步骤
	//	systemType:'VTM',//系统类型
	//	operations:[
	//		{
	//			eventType:'window',//如果eventType是window，和华为有关系或硬件
	//			unique:'xfs',//则unique必有值，espace(华为)或xfs(硬件)回调
	//			monitorSource:'PinpadGetDataAsyncCallBack',//window上绑定的回调事件名称
	//			action:'enter',//操作
	//			target:'secondEnterForCard',//目标为null是为了给后台放值
	//			description:'second enter is finished',//描述
	//			judgeEvent:'WFS_CMD_PIN_GET_DATA'//espace(华为情况下判断条件特殊处理)
	//		}
	//	]
	//};
    //
	//model.ansiNewPinBlock= null;//密码
	//model.CardNumber= null;//卡号
	//model.appModel(model.getTitle(), model);
    return model;
});