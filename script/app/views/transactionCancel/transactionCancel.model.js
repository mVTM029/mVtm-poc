define(['../baseModel'], function (Base) {
    var model = new Base('transactionCancel');
    model.locale = {
        'en': {
            'backToHome': 'Back to Home',
            'cancelTitle':'Transaction is canceled',
            'cancelContent':'Please  put your headset back or un-plug headphone',
            'cancelFooter':'Thanks for using account opening banking service',
            '20sec':'Redirect to home page in 20sec'
        },
        'zh': {
            'backToHome': '回到主页',
            'cancelTitle':'交易已取消',
            'cancelContent':'请将耳机放回或拔下耳机',
            'cancelFooter':'感谢您使用开户银行服务',
            '20sec':'20秒后回到主页'
        }
    };

    model.monitor = {
        step:'transactionCancel',//步骤
        systemType:'VTM',//系统类型
        operations:[
            {
                eventType:'event',
                monitorSource:'js-exit-cancel',
                action:'Return',
                target:'Home Page',
                description:'go to home from Transaction Cancel'
            }
        ]
    };

    return model;
});
