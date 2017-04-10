define(function (require) {
	var $ = require('jquery'),
		router = require('app/util/router'),
		model = require('./takeCard.model'),
		template = require('text!./takeCard.template.html'),
		controller = require('./takeCard.controller');

	/**
	 * 对外暴露函数，用于视图加载
	 */
	var load = function () {
		// $$.actionLog("Enter takeCard page");
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
		controller.render($("#view-part-container")[0]);
	}

	/**
	 * 事件绑定
	 */
	function bind() {
		$("#takeCard-next").on("click",function(){
			router.gotoView("electronBanking");
		});
	}

	function run() {
		$("#js-exit").hide();
		controller.AsyncEjectCard();
		$('.main-padding').scrollTop(0);
		controller.processVideo();
		var transactionId = model.appModel('transaction').transactionId;
		controller.transactionMonitor(model.monitor,transactionId);
	}

	return {
		load: load
	};
});
