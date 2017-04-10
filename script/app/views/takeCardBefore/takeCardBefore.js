define(function (require) {
	var $ = require('jquery'),
		//$$ = require('app/util/util'),
		model = require('./takeCardBefore.model'),
		template = require('text!./takeCardBefore.template.html'),
		router = require('app/util/router'),
		controller = require('./takeCardBefore.controller');

	/**
	 * 对外暴露函数，用于视图加载
	 */
	var load = function () {
		// $$.actionLog("Enter takeCardBefore page");
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
		$("#takeCardBefore-next").off().on("click", function () {
			router.gotoView("takeCard");
		});
	}

	function run() {
		$("#js-exit").show().removeClass('only-exit');
		controller.statusStep(4,4);
		var transactionId = model.appModel('transaction').transactionId;
		controller.transactionMonitor(model.monitor,transactionId);
	}

	return {
		load: load
	};
});
