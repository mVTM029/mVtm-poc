define(['../baseController','app/util/util','app/xfs/ESpaceMediaTerminal','jquery','app/util/router','app/views/dialog/dialog','./kindly.model','app/xfs/Common'], function (Base,$$,Terminal,$,router,dialog,model,Common) {
	var controller = new Base('kindly controller');


	/**
	 * vta挂断方法
	 */
	/*var _callRelease = function(){
		Terminal.closeRemoteVideo();
		if( ($("#js-remote-calling"))&&($("#js-remote")) ){
			$("#js-remote-calling").addClass("hide");
			$("#js-remote").removeClass("hide");
		}
		Terminal.terminalInfo.callStatus = -1;
		$$.debug('kindlyController 挂断方法');
		router.gotoView('transactionCancel');
	};

	var _dialogResolve = function(){
		var time = 0;
		var endTime = 32000;//32秒弹框
		var forceTime = setInterval(function () {
			time += 1000;
			if (time == endTime) {
				$('#connecting-dialog').show();
				$("#home-maskLayer").show();
				clearInterval(forceTime);
			}
		}, 1000);
		return forceTime;
	};


	controller.updateTransactionCall = function(id, callEndTime){
		return  $$.sendTranstionMessage("service/proxy/vtcService/transactionCall/update", JSON.stringify({
			"id": id,
			"callEndTime": callEndTime
		}));
	};

	controller.mediaTerminalCall = function(language){
		return Terminal.mediaTerminalCallAsync(_callRelease,_dialogResolve,language)
	};

	controller.mediaTerminalCallBack = function(language){
		controller.mediaTerminalCall(language)
			.then(function (p) {
				$$.debug("响铃事件开启");
				//p[0]为promise对象data非promise对象
				return p[0];
			}, function (msg) {
				$$.debug('openCameraFail:' + msg);
				$("#js-remote-calling").addClass("hide");
				$("#js-remote").removeClass("hide");
			})
			.then(function (forceTime) {
				clearInterval(forceTime);
				$("#top-remote-wait").hide();
				$("#js-remote").addClass("hide");
				$("#js-remote-calling").removeClass("hide");
				$("#top-remote-defaule").hide();
				$('#connecting-dialog').hide();
				$("#home-maskLayer").hide();
				var customerData = model.appModel("IDCInfo");
				Terminal.mediaTerminalSendMsg("customerInfo", customerData);//视频链接成功后再发送一次成品customerData
			});
		$("#top-select-language").hide();
		$("#top-remote-wait").show();
	};

	controller.sendMsgToTellerAsync = function () {
		var customerData = model.appModel('IDCInfo');
		var transaction = model.appModel('transaction');
		var transactionId = transaction.transactionId;
		$$.debug('准备发消息啦:'+customerData);
		if (customerData) {
			Common.FileUpload(transactionId,customerData.img1).then(function(img1){
				$$.debug("上传img1成功");
				img1 = JSON.parse(img1);
				customerData.img1 = img1;
				return Common.FileUpload(transactionId,customerData.img2);
			}).then(function(img2){
				$$.debug("上传img2成功");
				img2 = JSON.parse(img2);
				customerData.img2 = img2;
				return Promise.resolve('图片转换完毕');
			}).then(function(){
				customerData.bizType = model.appModel("bizType");//
				customerData.transactionId = transactionId;//
				customerData.language = model.appModel("showIdCardlanguage");//连接视频的语言
				$$.debug(JSON.stringify('customerData'));
				model.appModel("IDCInfo",customerData);
				Terminal.mediaTerminalSendMsg("customerInfo", customerData);
			});
			return Promise.resolve();

		}
	};*/

	return controller;
});
