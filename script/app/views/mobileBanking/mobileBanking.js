define(function(require) {
	var $ = require('jquery'),
		router = require('app/util/router'),
		model = require('./mobileBanking.model'),
		template = require('text!./mobileBanking.template.html'),
		controller = require('./mobileBanking.controller');

	/**
	 * 对外暴露函数，用于视图加载
	 */
	var load = function() {
		//$$.actionLog("Enter displayQR page");
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
		$("#mobileBanking-next").off().on("click", function() {

			router.gotoView("rateExperience");
		});
	}

	function run() {
		$("#js-exit").hide();
		$(".main-padding").scrollTop(0);
	}

	return {
		load: load
	};
});
