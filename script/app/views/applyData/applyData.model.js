define(['../baseModel'], function (Base) {
    var model = new Base('applyData');

    model.locale = {
			'en': {
				'contact': 'Your contact details',
				'number': 'Mobile number',
				'Email':'Email',
				'personal': 'Your personal details',
				'Resident': 'Resident address',
				'want':'Do you want to specify another address for correspondence?',
				'Yes': 'Yes',
				'No': 'No',
				'Correspondence':'Correspondence address line 1',
				'details': 'Address (Please detail to your apartment number)',
				'employment': 'Your employment details',
				'situation':'Employment status',
				'full': 'Employed full time',
				'part': 'Employed part time',
				'Not':'Not in employment',
				'selfEmployed': 'Self-employed',
				'Student': 'Student',
				'Retired':'Retired',
				'Employer': 'Employer name',
				'financial': 'Your financial details',
				'What':'What is your monthly income?',
				'gross':'What is your monthly income from other sources?',
				'ZERO': 'ZERO INCOME',
				'selectPlaceholder': 'Please select',
				'inputPlaceholder':"Please enter",
				'requiredField':'The field is required',
				'exit':'Exit',
				'continue':'Confirm',
				'PostalCode2':'Postal Code',
				'PostalCode':'Postal Code',
				'City':'City:'
			},
			'zh': {
				'contact': '联系信息',
				'number': '手机号码',
				'Email':'电子邮箱',
				'personal': '个人信息',
				'Resident': '居住地址',
				'want':'您是否希望指定另外一个地址为通讯地址?',
				'Yes': '是',
				'No': '否',
				'Correspondence':'通讯地址',
				'details': '通讯地址明细',
				'employment': '工作信息',
				'situation':'职业状况',
				'full': '全职',
				'part': '兼职',
				'Not':'没有工作',
				'selfEmployed': '自营',
				'Student': '学生',
				'Retired':'退休',
				'Employer': '公司名称',
				'financial': '财务状况',
				'What':'您的月收入',
				'gross':'您的其他月收入',
				'ZERO': '0',
				'selectPlaceholder': '请选择',
				'inputPlaceholder':"请填写",
				'requiredField':'此信息不能为空',
				'exit':'退出',
				'continue':'确定',
				'PostalCode2':'邮政编码',
				'PostalCode':'邮政编码',
				'City':'城市'
			}
	};
    
    model.inComeMapping = {
			'en' : {
					'00': '0',
					'10': '> = 200,000',
					'01': '< 3,000',
					'02': '3,000 - < 5,000',
					'03': '5,000 - < 8,000',
					'04': '8,000 - < 10,000',
					'05': '10,000 - < 20,000',
					'06': '20,000 - < 30,000',
					'07': '30,000 - < 50,000',
					'08': '50,000 - < 100,000',
					'09': '100,000 - < 200,000'
			},
			'zh' : {
					'00': 'ZERO INCOME',
					'10': '> = 200,000',
					'01': '< 3,000',
					'02': '3,000 - < 5,000',
					'03': '5,000 - < 8,000',
					'04': '8,000 - < 10,000',
					'05': '10,000 - < 20,000',
					'06': '20,000 - < 30,000',
					'07': '30,000 - < 50,000',
					'08': '50,000 - < 100,000',
					'09': '100,000 - < 200,000'
			}
	};
    
	model.situationMapping = {
			'en' : {
				'fullTime': 'Employed full time',
				'partTime': 'Employed part time',
				'notTime':'Not in employment',
				'selfTime': 'Self-employed',
				'studentTime': 'Student',
				'retriedTime':'Retired'
			},
			'zh' : {
				'fullTime': '全职',
				'partTime': '兼职',
				'notTime': '没有工作',
				'selfTime': '自营',
				'studentTime': '学生',
				'retriedTime':'退休'
			}
	};



    return model;
});