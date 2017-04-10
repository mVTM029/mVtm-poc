define(['../baseModel'], function (Base) {
    var model = new Base('home');
    model.locale = {
        'en': {
            'logo': 'logo',
            'switch-to': 'switch-zh',
            'addressSpan': 'addressSpan-en',
            'welcome': 'Welcome to HSBC',
            'itemLang': 'itemLang-en',
            'switch': '切换',
            'language': '中文',
            'remote': 'Customer Service',
            'teller': 'Officer',
            'opennewacct': 'Open Bank Account',
            'title': 'Eligibility',
            'card-icon': 'Have ID card with you',
            'resident-ico': 'National resident only',
            'address-ico': 'Have a proof of address',
            'citizenship-ico': 'Not Holding multiple nationalities'
        },
        'zh': {
            'logo': 'logo logo-zh',
            'switch-to': 'switch-en',
            'addressSpan': 'addressSpan-zh',
            'itemLang': 'itemLang-zh',
            'welcome': '欢迎使用汇丰银行 VTM',
            'switch': 'Switch to ',
            'language': 'English',
            'remote': '客户服务',
            'teller': '主任',
            'opennewacct': '开通账户',
            'title': '使用本机开户您需要符合以下条件',
            'card-icon': '携带身份证',
            'resident-ico': '国家居民',
            'address-ico': '携带地址证明',
            'citizenship-ico': '非多重国籍人士'
        }
    };

    model.monitor = {
        step: 'home',
        systemType: 'VTM',
        operations: [
            {
                eventType: 'event',
                monitorSource: 'open-account-btn',
                action: 'click',
                target: 'openAccount',
                description: 'Open Account Button'
            },
            // {//test Data
            //     eventType: 'event',
            //     monitorSource: 'open-account-btn1',
            //     action: 'click',
            //     target: 'openAccount1',
            //     description: 'Open Account Button1'
            // }
        ]
    };

    model.BIZ_TYPE = "";
    model.appModel(model.getTitle(), model);
    return model;
});