define(['../baseModel'], function (Base) {
    var model = new Base('dialog model');
    model.locale = {
        'en': {
            'workout-header': 'Sorry, we are currently closed',
            'workout-container-1': '',
            'workout-container-2': 'Please come back during our service hours: 9:00am to 5:00pm ',
            'workout-footer-btn': 'Back to Home',

            'timeout-header': 'Operation Timeout',
            'timeout-container-1': 'Session timeout in ',
            'timeout-container-1-1': ' minutes',
            'timeout-container-2': 'If you fail to make response, the service you require will be cancelled.',
            'timeout-footer-btn-backHome-1': 'Exit',
            'timeout-footer-btn-backHome-2': 's',
            'timeout-footer-btn-continue': 'Continue',

            'outofserviceTitle': 'Service unavailable',
            'outofservice': 'Please visit our branch counter for any assistance',

            'backHome-header': 'Back to Home',
            'backHome-container': 'Are you sure you want to return to the home page?',
            'backHome-footer-confirm-btn': 'Confirm',
            'backHome-footer-cancel-btn': 'Cancel',

            'connecting-header':'Attention',
            'connecting-container':'Sorry, our lines are all busy. Would you continue to wait?',
            'backHome-footer-exit-btn':'Exit',
            'backHome-footer-continue-btn':'Continue',

            'pre-filling-header': 'Pre filled information',
            'pre-filling-container': 'Do you use the pre filled information to help you fill in?',
            'pre-filling-noUse-btn': 'No Use',
            'pre-filling-use-btn': 'Use',

            'askQuestions-header': 'We are sorry',
            'askQuestions-container-1': 'Please go to a branch counter for your request.',
            'askQuestions-container-2': 'You must be a Chinese resident who owns a 2<sup>nd</sup> generation ID card to open an account on this machine.',
            'askQuestions-footer-backHome-btn': 'Back to Home',
            'askQuestions--footer-cancel-btn': 'Cancel',

            'askQuestions2-header': 'We are sorry',
            'askQuestions2-container': 'Please go to a branch counter for your request',
            'askQuestions2-footer-backHome-btn': 'Back to Home',
            'askQuestions2--footer-cancel-btn': 'Cancel',

            'askQuestions3-header': 'We are sorry',
            'askQuestions3-container': 'Please go to a branch counter for your request',
            'askQuestions3-footer-backHome-btn': 'Back to Home',
            'askQuestions3--footer-cancel-btn': 'Cancel',

            'askQuestions4-header': 'We are sorry',
            'askQuestions4-container-1': 'Please go to a branch counter for your request.',
            'askQuestions4-container-2': 'You must be a Chinese resident who owns a 2<sup>nd</sup> generation ID card to open an account on this machine',
            'askQuestions4-footer-backHome-btn': 'Back to Home',
            'askQuestions4--footer-cancel-btn': 'Cancel',

            'askQuestions5-header': 'We are sorry',
            'askQuestions5-container-1': 'Please go to a branch counter for your request.',
            'askQuestions5-container-2': 'If you will have more than CNY 6,200,000 with HSBC, please consult our branch staff for details.',
            'askQuestions5-footer-backHome-btn': 'Back to Home',
            'askQuestions5--footer-cancel-btn': 'Cancel',

            'language-header': 'Connect customer service officer',
            'language-container': 'We will now connect you to our customer service officer, please indicate your preferred language:',
            'language-Mandarin': 'Mandarin',
            'language-Cantonese': 'Chinese',
            'language-English': 'English',
            'language-footer-continue-btn': 'Continue',
            'language-footer-cancel-btn': 'Cancel',

            'language2-header': 'Connect Customer Service Officer',
            'language2-container': 'We will now connect you to our Customer Service Officer, please indicate your preferred language:',
            'language2-Mandarin': 'Mandarin',
            'language2-Cantonese': 'Cantonese',
            'language2-English': 'English',
            'language2-footer-continue-btn': 'Continue',

            'language3-header': 'Connect our Customer Service Officer',
            'language3-container': 'We will now connect you to our Customer Service Officer, please indicate your preferred language:',
            'language3-Mandarin': 'Mandarin',
            'language3-Cantonese': 'Cantonese',
            'language3-English': 'English',
            'language3-footer-continue-btn': 'Continue',

            'blacklist-header': 'We are sorry',
            'blacklist-container': 'Thank you for your interest in HSBC. We are unable to proceed with your account opening request. <br/>Please visit our branch counter for more details. ',
            'blacklist-footer-backHome-btn': 'Back to Home',

            'development-header': 'We are sorry',
            'development-container': 'A system crash, please return to the home page.',
            'development-footer-backHome-btn': 'Back to Home',

            'noId-header': 'We are sorry',
            'noId-container': 'No insert of ID card,timed out',
            'noId-footer-backHome-btn': 'Back to Home',
            'noId-footer-retry-btn': 'Retry',

            'scannFaile-header': 'Unable to scan ID card',
            'scannFaile-container-1': '',
            'scannFaile-container-2': 'Please retry',
            'scannFaile-footer-backHome-btn': 'Back to Home',
            'scannFaile-footer-retry-btn': 'Retry',

            'scannFaile2-header': 'We are sorry',
            'scannFaile2-container': 'Thank you for your interest in HSBC. We are unable to proceed with your account opening request. <br/>Please visit our branch counter for more details. ',
            'scannFaile2-footer-backHome-btn': 'Back to Home',

            'rate-header': 'Thank you for rating!',
            'rate-container': 'Would you please put forward valuable opinion!Thanks again.',
            'rate-footer-cancel-btn': 'Cancel',
            'rate-footer-confirm-btn': 'Confirm',

            'rate2-header': 'Thanks you',
            'rate2-container': 'Score success. Thanks for using HSBC VTM',
            'rate2-footer-cancel-btn': 'Cancel',
            'rate2-footer-backHome-btn': 'Back to Home',

            'setpin-header': 'PIN numbers do not match',
            'setpin-container': 'Please ensure you enter your PIN correctly',
            'setpin-footer-back-btn': 'Retry',

            'password-header': 'We are sorry',
            'password-container': 'Two input passwords are not consistent',
            'password-footer-back-btn': 'Back',

            'noteller-header': 'Lines are busy',
            'noteller-container': 'All Customer Service Officers are currently unavailable. Do you wish to stay on the line?',
            'noteller-backHome-btn': 'Back to Home',
            'noteller-retry-btn': 'Retry',

            'passwordNum-header': 'We are sorry',
            'passwordNum-container': 'The password is incorrect.',
            'passwordNum-footer-back-btn': 'Retry',
            "customerWaiting":"Customer service Officer is in operation,please wait..."

        },
        'zh': {
            'workout-header': '服务时间已过',
            'workout-container-1': '',
            'workout-container-2': '请于早上9:00至下午5:00使用这项服务 ',
            'workout-footer-btn': '返回',

            'outofserviceTitle': '服务暂停 ',
            'outofservice': '本机服务暂停，如有任何查询，请前往分行与我们的银行职员联络',

            'timeout-header': '操作超时 ',
            'timeout-container-1': '系统超时',
            'timeout-container-1-1': '分钟',
            'timeout-container-2': '如果在限定时间内未进行任何操作，你所需要的服务将被取消',
            'timeout-footer-btn-backHome-1': '返回首页',
            'timeout-footer-btn-backHome-2': '秒',
            'timeout-footer-btn-continue': '继续',

            'backHome-header': '返回首页',
            'backHome-container': '您确定要返回首页吗？',
            'backHome-footer-confirm-btn': '确认',
            'backHome-footer-cancel-btn': '取消',

            'connecting-header':'注意',
            'connecting-container':'对不起，我们的线路都很忙。 你会继续等待吗？',
            'backHome-footer-exit-btn':'退出',
            'backHome-footer-continue-btn':'继续',

            'pre-filling-header': '预填信息',
            'pre-filling-container': '您是否要使用预填信息帮助您填写？',
            'pre-filling-noUse-btn': '不使用',
            'pre-filling-use-btn': '使用',

            'askQuestions-header': '抱歉',
            'askQuestions-container-1': '请前往柜台办理你所需的业务',
            'askQuestions-container-2': '您必须是持有二代居民身份证的中国公民才可以在该机具上办理开户业务',
            'askQuestions-footer-backHome-btn': '返回首页',
            'askQuestions--footer-cancel-btn': '取消',

            'askQuestions2-header': '抱歉',
            'askQuestions2-container': '请前往柜台办理您所需的业务',
            'askQuestions2-footer-backHome-btn': '返回首页',
            'askQuestions2--footer-cancel-btn': '取消',

            'askQuestions3-header': '抱歉',
            'askQuestions3-container': '我们无法帮助您办理开户业务，请前往柜台办理您所需的业务',
            'askQuestions3-footer-backHome-btn': '我返回首页',
            'askQuestions3--footer-cancel-btn': '取消',

            'askQuestions4-header': '抱歉',
            'askQuestions4-container-1': '请前往柜台办理您所需的业务',
            'askQuestions4-container-2': '您必须是持有二代居民身份证的中国公民才可以在该机具上办理开户业务',
            'askQuestions4-footer-backHome-btn': '返回首页',
            'askQuestions4--footer-cancel-btn': '取消',

            'askQuestions5-header': '抱歉',
            'askQuestions5-container-1': '请前往柜台办理您所需的业务',
            'askQuestions5-container-2': '如果您在汇丰银行有超过6200000人民币的存款，请前往柜台咨询详情',
            'askQuestions5-footer-backHome-btn': '返回首页',
            'askQuestions5--footer-cancel-btn': '取消',

            'language-header': '连接客户服务主任',
            'language-container': '我们将为您连接客户服务主任，请标注您优先选择的交流语言',
            'language-Mandarin': '普通话',
            'language-Cantonese': '中文',
            'language-English': '英语',
            'language-footer-continue-btn': '继续',
            'language-footer-cancel-btn': '取消',

            'language2-header': '连接客户服务主任',
            'language2-container': '我们将为您连接客户服务主任，请标注您优先选择的交流语言',
            'language2-Mandarin': '普通话',
            'language2-Cantonese': '粤语',
            'language2-English': '英语',
            'language2-footer-continue-btn': '继续',

            'language3-header': '连接客户服务主任',
            'language3-container': '现在为您连接客户服务主任, 请选择通话语言：',
            'language3-Mandarin': '普通话',
            'language3-Cantonese': '粵语',
            'language3-English': '英语',
            'language3-footer-continue-btn': '继续',

            'blacklist-header': '抱歉',
            'blacklist-container': '感谢选择汇丰银行，我们未能为您继续远程开户。如有任何查询，请前往分行与我们的银行职员联络',
            'blacklist-footer-backHome-btn': '返回首页',

            'development-header': '抱歉',
            'development-container': '系统崩溃，请返回首页',
            'development-footer-backHome-btn': '返回首页',
            'noId-header': '抱歉',
            'noId-container': '未插入身份证，操作超时',
            'noId-footer-backHome-btn': '返回首页',
            'noId-footer-retry-btn': '重试',

            'scannFaile-header': '无法识别 ',
            'scannFaile-container-1': '',
            'scannFaile-container-2': '身份证读取不成功，请重新插入您的身份证',
            'scannFaile-footer-backHome-btn': '返回首页',
            'scannFaile-footer-retry-btn': '重试',

            'scannFaile2-header': '抱歉',
            'scannFaile2-container': '感谢选择汇丰银行，我们未能为您继续远程开户。如有任何查询，请前往分行与我们的银行职员联络',
            'scannFaile2-footer-backHome-btn': '返回首页',

            'rate-header': '感谢您的评分',
            'rate-container': '请您提出宝贵的意见！再次感谢',
            'rate-footer-cancel-btn': '取消',
            'rate-footer-confirm-btn': '确认',

            'rate2-header': '谢谢',
            'rate2-container': '评分成功,感谢您使用汇丰银行的远程柜员机',
            'rate2-footer-cancel-btn': '取消',
            'rate2-footer-backHome-btn': '返回首页',

            'setpin-header': '密码不一致',
            'setpin-container': '两次的密码不一致，请重新输入 ',
            'setpin-footer-back-btn': '重试',

            'password-header': '抱歉',
            'password-container': '两次输入的密码不一致',
            'password-footer-back-btn': '返回',

            'noteller-header': '线路繁忙',
            'noteller-container': '所有客户服务主任繁忙，是否继续等待？',
            'noteller-backHome-btn': '返回首页',
            'noteller-retry-btn': '重试',

            'passwordNum-header': '抱歉',
            'passwordNum-container': '您输入的密码有误',
            'passwordNum-footer-back-btn': '请重新输入',
            "customerWaiting":"客服正在操作，请稍后..."

        }
    };
    return model;
});
