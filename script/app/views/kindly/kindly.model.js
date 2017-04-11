define(['../baseModel'], function (Base) {
    var model = new Base('kindly');
    model.locale = {
        'en': {
            'logo': 'logo',
            'span': 'span',
            'account': 'Account Opening',
            'remote': 'Remote Assistance',
            'preparation': 'Preparation',
            'information': 'Important information',
            'agreement': 'Account agreement',
            'scan': 'Identity Verification',
            'connect': 'Remote assistance',
            'connecting':'Connect',
            'application': 'Fill application data',
            'collect':'Collect  documents',
            'issuing': 'Issue card',
            'Accounttype':'Account type',
            'siganture':'Siganture',
            'setpin':'Set PIN',
            'takecard':'Take card',
            'services': 'Other services',
            'produce': 'Documents you need to present',
            'idcard':'ID card',
            'idintco':'Resident card only',
            'idintco1':'If you hold multiple nationalities, please speak to our branch staff',
            'address':'Proof of Address',
            'addresso':'Your resident card registered with a valid residential address having the apartment number stated',
            'addresst':'Or any originalelectricity, water, gas bill or bank statement that is dated within the last 3 month',
            'addressth':'Or valid HR letter if you are an internal staff',
            'addressf':'If you have questions for Proof of Address, please consult our branch staff',
            'moreinfo':'Click the image to see more details',
            'cards':'This machine supports following type of cards',
            'goldcard':'Gold Card',
            'diamondcard':'Diamond Card',
            'overview': 'Process overview',
            'eligibility':'Eligibility',
            'elityone':'Minimun Total Relationship Balance',
            'elitytwo':'CNY 50,000',
            'elitydiam':'CNY 100,000',
            'benefits':'Benefits',
            'benefitone':'Convenient digital platform',
            'benefittwo':'Tailored financial expertise and support',
            'benefithress':'Enjoy preferential offers and rewards',
            'benefitdo':'Dedicated relationship manager',
            'benefitdt':'Anytime wouldwide privileged service',
            'benefitdth':'Enjoy exclusive banking products and rewards',
            'connectRemote': 'Connect Customer Service Officer',
            /*'information':'Fill application data',*/
            'banking': 'Other services',
            'confirm': 'Continue',
            'exit': 'Exit',
            'connectTime': 'Please contact our Customer Service Officer for assistance',
            'connectNow': 'Connect now',
            'speakingLanguage': 'Speaking Language',
            'cantonese': 'Cantonese',
            'Chinese':'Chinese',
            'mandarin': 'Mandarin',
            'english': 'English',
            'connectingRemote': 'Connecting customer service officer',
            'hello': 'Hello,glad to meet you',
            'expire': 'Expire in 30 sec'
        },
        'zh': {
            'logo': 'logo logo-zh',
            'span': 'span span-zh',
            'account': '开通新账户',
            'remote': '远程帮助',
            'preparation': '开卡预准备',
            'information': '溫馨提示',
            'agreement': '阅读开户协议',
            'scan': '身份验证',
            'connect': '连接客户服务主任',
            'application': '填写开卡信息',
            'issuing': '完成取卡',
            'collect':'收集文件',
            'Accounttype':'账户类型',
            'siganture':'签名',
            'setpin':'设置密码',
            'services': '开通其他服务',
            'produce': '你需要提交的文件',
            'overview': '开户流程简介',
            'cards':'本机支持下列类型的卡',
            'idcard':'身份证',
            'idintco':'仅支持居民身份证',
            'idintco1':'如果您持有多国籍，请与我们的分公司职员通话',
            'address':'地址证明',
            'addresso':'您的身份证登记的，具有公寓号的有效住宅地址',
            'addresst':'过去三个月，任何水、电、煤气账单，或者银行声明',
            'addressth':'如果你是内部人员，请提供证明信',
            'addressf':'如果您的地址证明有问题，请咨询我们的分行工作人员',
            'moreinfo':'点击图片查看更多细节',
            'goldcard':'金卡',
            'diamondcard':'钻石卡',
            'eligibility':'资格',
            'elityone':'总关联额度',
            'elitytwo':'50,000人民币',
            'elitydiam':'100,000人民币',
            'benefits':'福利',
            'benefitone':'便捷的数字平台',
            'benefittwo':'专业的理财知识帮助',
            'benefithress':'享受优惠待遇和奖励',
            'benefitdo':'专有客户经理',
            'benefitdt':'随时随地享受特权服务',
            'benefitdth':'享受银行独家产品和奖励',
            'connectRemote': '连接客户服务主任',
            /*'information':'填写开卡信息',*/
            'takecard': '完成取卡',
            'banking': '开通其他服务',
            'confirm': '下一步',
            'exit': '退出',
            'connectTime': '如需协助，请连接我们的客户服务主任',
            'connectNow': '立即连接',
            'speakingLanguage': '语音语种',
            'cantonese': '粤语',
            'Chinese':'中文',
            'mandarin': '普通话 ',
            'english': '英语 ',
            'connecting':'连接视频',
            'connectingRemote': '连接客户服务主任',
            'hello': '你好，很高兴见到你',
            'expire': '30s倒计时'
        }
    };

    model.monitor = {
        step:'kindly',//步骤
        systemType:'VTM',//系统类型
        operations:[
            {
                eventType:'window',//如果eventType是window，和华为有关系或硬件
                unique:'espace',//则unique必有值，espace(华为)或xfs(硬件)回调
                monitorSource:'TerminalTalkingEvent',//window上绑定的回调事件名称
                action:'connected',//操作
                target:null,//目标为null是为了给后台放值
                description:'connected',//描述
                judgeEvent:'TerminalTalkingEvent'//espace(华为情况下判断条件特殊处理)
            },
            {
                eventType:'event',
                monitorSource:'kindly-next',
                action:'click',
                target:'goToAccountAgreement',
                description:'go to Account Agreement'
            },
            {//绑定一次全局通用
                unique:'exit',
                eventType:'event',
                monitorSource:'backhome-confirm',
                action:'click',
                target:'exit',
                description:'Click Exit Button'
            }
        ]
    };

    model.terminalInfo = {};
    model.remotelanguage = "";
    model.appModel(model.getTitle(), model);
    return model;
});
