define(['../baseModel'], function (Base) {
    var model = new Base('takeCardBefore');
    model.locale = {
        'en': {
            'title-one-1': 'Your account is now opened ,',
            'title-one-2':' press Continue to get your debit card',
            'title-two-1':'You can continue to register',
            'title-two-2':'for the following banking services',
            'mobile':'Mobile banking',
            'internet':'Internet banking',
            'phone':'Phone banking',
            'wechat':'Wechat banking',
            'takeCard':'Take card',
            'continue':'Continue'
        },
        'zh': {
            'title-one-1': '您的账户已开通成功，点击“下一步”取卡',
            'title-one-2':'',
            'title-two-1':'取卡后可继续开通如下业务',
            'title-two-2':'',
            'mobile':'手机银行',
            'internet':'网上银行',
            'phone':'电话银行',
            'wechat':'微信银行',
            'takeCard':'完成取卡',
            'continue':'下一步'
        }
    };

    model.monitor = {
        step:'takeCardBefore',//步骤
        systemType:'VTM',//系统类型
        operations:[
            {
                eventType:'event',
                monitorSource:'takeCardBefore-next',
                action:'click',
                target:'goToTakeCard',
                description:'go to take card page'
            }
        ]
    };

    return model;
});