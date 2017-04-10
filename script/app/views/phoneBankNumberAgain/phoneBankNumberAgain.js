define(function(require) {
	var $ = require('jquery'),
		model = require('./phoneBankNumberAgain.model'),
		$$ = require('app/util/util'),
		template = require('text!./phoneBankNumberAgain.template.html'),
		controller = require('./phoneBankNumberAgain.controller');
	/**
	 * 对外暴露函数，用于视图加载
	 */
	var load = function() {
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
		$("#back-setpin").off("click", controller.backSet).on("click",controller.backSet );
	}

	function completePinInputOut() {
		var data = this.data;
		$$.debug("进入completePinInput");
		model.ansiNewPinBlock = data.Buffer.PinKeys;
		controller.setPassword(model);
	}

	function run() {
		controller.statusStep(5);
		$("#js-exit").hide();
		$('.main-padding').scrollTop(0);
		var PPInit = model.appModel("PPInit");
		PPInit(completePinInputOut);
		var transactionId = model.appModel('transaction').transactionId;
		controller.transactionMonitor(model.monitor,transactionId);
	}

	return {
		load: load
	};
});