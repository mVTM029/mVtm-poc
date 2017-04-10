define(['../baseModel'], function (Base) {
    var model = new Base('takeCard');
    model.locale = {
			'en': {
				'take': 'Please take your debit card',
				'continue':'Continue'
			},
			'zh': {
				'take': '请取出您的银行卡',
				'continue':'下一步'
			}
	};

	model.monitor = {
		step:'takeCard',//步骤
		systemType:'VTM',//系统类型
		operations:[
			{
				eventType:'window',//如果eventType是window，和华为有关系或硬件
				unique:'xfs',//则unique必有值，espace(华为)或xfs(硬件)回调
				monitorSource:'IDCCardReaderAsyncEjectCardCallBack',//window上绑定的回调事件名称
				action:'take',//操作
				target:'Bank Card',//目标为null是为了给后台放值
				description:'take the bank card',//描述
				judgeEvent:'WFS_SRVE_IDC_MEDIAREMOVED'//espace(华为情况下判断条件特殊处理)
			}
		]
	};

    return model;
});