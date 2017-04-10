define(function (require) {
	var $ = require('jquery'),
		model = require('./phoneBankNumber.model'),
		template = require('text!./phoneBankNumber.template.html'),
		dialog = require('../dialog/dialog'),
		$$ = require('app/util/util'),
		router = require('app/util/router'),
		xfsUtil = require('app/xfs/xfsUtil'),
		controller = require('./phoneBankNumber.controller');

	/**
	 * 对外暴露函数，用于视图加载
	 */
	var load = function () {
		render();
		bind();
		run();
	};

	/**
	 * 视图渲染
	 */
	function render() {
		controller.setModel(model);
		controller.setTemplate(template);
		controller.render($('#view-part-container')[0]);
	}

	/**
	 * 事件绑定
	 */
	function bind() {

	}

	//判断密码长度
	function completePinInput(){
		var data = this.data,
			PinSize = this.PinSize;
		model.appModel('ansiNewPinBlockPhone',data.Buffer.PinKeys);
		model.ansiNewPinBlock = data.Buffer.PinKeys;
		if(!$('.box .text:last').hasClass('point')){
			$('.text').removeClass("point");
			$$.debug('密码长度不够6位重新输入！ ');
			model.ansiNewPinBlock = null;
			window.external.PinPad.GetDataAsync(PinSize,0,'number|clear|enter','enter',xfsUtil.xfsInfo.timeout);
			dialog.layerShow("#passwordNum-dialog");
		}else{
			router.gotoView('phoneBankNumberAgain');
		}
	}

	function run() {
		$("#js-exit").hide();
		controller.statusStep(5);
		var PPInit = model.appModel("PPInit");
		PPInit(completePinInput);
		var transactionId = model.appModel('transaction').transactionId;
		controller.transactionMonitor(model.monitor,transactionId);
	}

	return {
		load: load
	};
});
