define(['../baseModel'], function (Base) {
    var model = new Base('electronBanking');
    model.appModel(model.getTitle(), model);
    model.locale = {
        "en": {
            "serviceTitle": "Other banking services",
            "mobileBanking": "Phone Banking",
            "internetBanking": "Internet Banking",
            "mobileBankingTerms": " Terms and Conditions",
            "internetBankingTerms": " Terms and Conditions",
            "agree": "I agree to open the Internet Banking",
            "agreeAgain": "I agree to open the Phone Banking",
            "btn": "Continue",
            "ConditionsPdf":"Please read the Terms and Conditions",
            "TakeEbanking":"You can continue to open the E-Banking"
        },
        "zh": {
            "serviceTitle": "其他银行服务",
            "mobileBanking": "电话银行",
            "internetBanking": "网上银行",
            "mobileBankingTerms": "条款和条件",
            "internetBankingTerms": "条款和条件",
            "agree": "我同意打开网上银行",
            "agreeAgain": "我同意打开电话银行",
            "btn": "下一步",
            "ConditionsPdf":"请阅读条款和条件",
            "TakeEbanking":"您可以继续开通电子银行"
        }

    };

    model.monitor = {
        step:'electronBanking',//步骤
        systemType:'VTM',//系统类型
        operations:[
            {
                eventType:'event',
                monitorSource:'phoneBankingPdf',
                action:'click',
                target:'openPhoneBankingPdf',
                description:'Phone Banking Terms and Conditions PDF'
            },
            {
                eventType:'event',
                monitorSource:'internetBankingPdf',
                action:'click',
                target:'openInternetBankingPdf',
                description:'Internet Banking Terms and ConditionsPDF'
            },
            {
                unique:'checkbox',
                eventType:'event',
                monitorSource:'phoneAgree',
                action:'click',
                target:'',
                description:'Click Phone Banking Check Box'
            },
            {
                unique:'checkbox',
                eventType:'event',
                monitorSource:'internetAgree',
                action:'click',
                target:'',
                description:'Click Internet Banking Check Box'
            },
            {
                unique:'eBankingConfirm',
                eventType:'event',
                monitorSource:'ebanking-next',
                action:'click',
                target:'goToOtherService',
                description:'Click electronBanking Continue Button '
            }
        ]
    };

    return model;
});