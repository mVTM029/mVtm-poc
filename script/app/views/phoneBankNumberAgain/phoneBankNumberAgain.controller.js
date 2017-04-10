define(['../baseController','app/util/util','app/xfs/PinPad','jquery','app/views/dialog/dialog','app/util/router'], function (Base, $$,PinPad,$,dialog,router) {
	var controller = new Base('phoneBankNumberAgain controller');
	/**
	 * 向数据库发送设置信息
	 * @constructor
	 */
	controller.setPassword = function(model) {
		var inputPassword= model.appModel('ansiNewPinBlockPhone'),//第一次输入的密码
			newPassword= model.ansiNewPinBlock;//第二次输入的密码
		if (location.hash.indexOf('#phoneBankNumberAgain') > -1) {
			if (inputPassword != newPassword) {
				$$.debug('Passwords do not match');
				//model.appModel("enterPassword").ansiNewPinBlock=null;
				//model.ansiNewPinBlock=null;
				dialog.layerShow("#setpin-dialog");
			}else{
				//inputPassword 保留
				window.external.PinPad.AsyncCancel();//取消
				router.gotoView('mobileBanking');
			}
		}
	};

	/**
	 *事件函数
	 */
	controller.backSet = function(){
		dialog.layerHide("#setpin-dialog");
		router.gotoView("phoneBankNumber");
	};

	return controller;
});
