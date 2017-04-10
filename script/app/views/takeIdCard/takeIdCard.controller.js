define(['../baseController'], function (Base) {
	var controller = new Base('takeIdCard controller');

	/**
	 * 呼叫vta(视频&&音频)
	 * @param language
	 */
	controller.mediaTerminalCall = function (language) { //发起视频请求（含音频）
		//showIdCardService.getCallNO(language);//请求后台后呼叫开始
	};

	return controller;
});
