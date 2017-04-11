define([ 'app/views/baseModel' ], function(Base) {
    var model = new Base('fingerprintCollection model');
    model.locale = {
        'en' : {
            'Confirm' : 'Confirm',
            'please' : 'Please put your fingerprint scanner',
            'exit' : 'Exit',
            'preparation' : 'Fingerprint collection',
            'enter' : 'sweep your fingerprint'
        },
        'zh' : {
            'Confirm' : '确认',
            'please' : '请把你的指纹放到扫描仪',
            'exit' : '退出',
            'preparation' : '指纹采集',
            'enter' : '扫描您的指纹'
        }
    };

    return model;
});

