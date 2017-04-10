define(['../baseModel'], function (Base) {
    var model = new Base('takeToken');
    model.locale = {
			'en': {
				'Please': 'Please take your Security Key',
				'Reminder':'Reminder: Please activate your Security Key before using it for the first time',
				'Continue' : 'Continue'
			},
			'zh': {
				'Please': '请取出您的安全令牌',
				'Reminder':'提醒：请在第一次使用之前激活您的安全密钥',
				'Continue' : '继续'
			}
	};

	model.monitor = {
		step:'takeToken',//步骤
		systemType:'VTM',//系统类型
		operations:[
			{
				eventType:'window',//如果eventType是window，和华为有关系或硬件
				unique:'xfs',//则unique必有值，espace(华为)或xfs(硬件)回调
				monitorSource:'DispenseUKeyToExitAsyncCallBack',//window上绑定的回调事件名称
				action:'Take',//操作
				target:'Token',//目标为null是为了给后台放值
				description:'Take the token',//描述
				judgeEvent:'WFS_CMD_CRD_DISPENSE_CARD'//espace(华为情况下判断条件特殊处理)
			}
		]
	};

    return model;
});