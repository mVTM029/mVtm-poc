define(['../baseController'], function (Base) {
	var controller = new Base('takeIdCard controller');

	/**
	 * ����vta(��Ƶ&&��Ƶ)
	 * @param language
	 */
	controller.mediaTerminalCall = function (language) { //������Ƶ���󣨺���Ƶ��
		//showIdCardService.getCallNO(language);//�����̨����п�ʼ
	};

	return controller;
});
