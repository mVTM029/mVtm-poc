define(['../baseController', 'app/util/util', './documents.model'], function (Base, $$, model) {
	var controller = new Base('documents controller');

	/**
	 * 机具硬件模块相关
	 */
	controller.xfsInit = function () {
		
//		window.PaperScannerExecuteCompleteEvent = window.PaperScannerExecuteCompleteEvent || function (event) {
//			$$.debug('PaperScannerExecuteCompleteEvent: ' + event);
//			var event = JSON.parse(event),
//				code = event.Code,
//				buffer = event.Buffer,
//				result = event.hResult;
//
//			if (result === 'WFS_ERR_TIMEOUT') {
//				
//			}
//		};
		window.FDHighCameraExecuteCompleteEvent = function (e) {
			$$.debug('FDHighCameraExecuteCompleteEvent: ' + e);
			var event = JSON.parse(e),
				code = event.Code,
				//buffer = event.Buffer,
				result = event.hResult;

			if('WFS_SUCCESS' == result && "WFS_CMD_CAM_TAKE_PICTURE" == code){
				$$.debug('调用C#上传接口, file name:' + model.getFileName());
				window.external.CallFDHighCameraImage(model.getFileName());
			}else if (result === 'WFS_ERR_TIMEOUT') {
				$$.debug('高拍仪指令超时');
			}else{
				$$.debug('其他状态：' + e);
			}
		};

		
		try {
			controller.wosa.getFDHighCameraDisplayAsync($$.wosaTimerOneHour);
		} catch (e) {
			$$.debug(e);
		}
	};
	return controller;
});
