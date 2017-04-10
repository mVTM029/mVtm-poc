define(['../baseController', 'app/util'], function (Base, $$) {
	var controller = new Base('documentsAgain controller');

	/**
	 * 机具硬件模块相关
	 */
	controller.xfsInit = function (options) {
		try {
			$$.debug("准备调用wosa接口");
			controller.wosa.getImagePaperScannerAsync('WFS_SCANNING_PICTURE', options.front, options.back, $$.wosaTimerOneHour);
//			controller.wosa.recoverPaperControlAsync('WFS_PTR_CTRLRETRACT', 30000);
		} catch (e) {
			$$.debug(e);
		}
	};
	return controller;
});
