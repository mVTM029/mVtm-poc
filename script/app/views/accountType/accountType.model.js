define(['../baseModel'], function (Base) {
	var model = new Base('accountType');

	model.locale = {
		'en': {
			'Select': 'Select account type',
			'Please': 'Please select your preferred account type',
			'Premier':'Diamond Card',
			'Terms': 'Terms and Conditions',
			'Eligibility': 'Eligibility',
			'Minimum': 'Minimum Total Relationship Balance CNY 100,000',
			'Benefits':'Benefits',
			'Dedicated': 'Dedicated relationship manager',
			'Anytime': 'Anytime worldwide privileged service',
			'Enjoy':'Enjoy exclusive banking products and rewards',
			'SelectPremier': 'Select Diamond',
			'Advance': 'Gold Card',
			'Total':'Minimum Total Relationship Balance CNY 50,000',
			'Convenient': 'Convenient and secured digital platform',
			'Tailored':'Tailored financial expertise and support',
			'preferential': 'Enjoy preferential offers and ',
			'rewards':'rewards',
			'SelectAdvance': 'Select Gold',
			'continue':'Continue',
			'Take':'You can continue to open Account Card',
			"ConditionsPdf":"Please read the Terms and Conditions",
			"agree" : "I agree to the Personal Account General  Terms and Conditions that apply to the account type that I choose."

		},
		'zh': {
			'Select': '选择账户类型',
			'Please': '请选择账户类型',
			'Premier':'钻石卡',
			'Terms': '服务与条款',
			'Eligibility': '申请资格',
			'Minimum': '存款10万人民币或以上',
			'Benefits':'特点',
			'Dedicated': '您专属的客户经理',
			'Anytime': '全天候无疆界的优先服务',
			'Enjoy':' 尊享钻石卡金融产品和奖励',
			'SelectPremier': '选择钻石卡',
			'Advance': '金卡',
			'Total':'存款5万人民币或以上',
			'Convenient': '安全便捷的数字化平台',
			'Tailored':'量身定制的金融服务和支持',
			'preferential': '享受金卡产品和优惠',
			'rewards':'奖励',
			'SelectAdvance': '选择金卡',
			'continue':'下一步',
			'Take':'您可以继续开通卡片',
			"ConditionsPdf":"请阅读条款和条件",
			"agree" : "本人同意本人所选择的个人帐户的帐户类型的一般条款及条件。"

		}
	};


	return model;
});