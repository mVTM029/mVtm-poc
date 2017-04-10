define(function (require) {
	var $ = require('jquery'),
		router = require('app/util/router'),
		model = require('./waiting.model'),
		template = require('text!./waiting.template.html'),
		controller = require('./waiting.controller');

	/**
	 * 对外暴露函数，用于视图加载
	 */
	var load = function () {
		render();
		bind();
		run();
	}

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
		$("#waiting-next").off().on("click", function () {
			router.gotoView('takeIdCard');
		});
	}

	function run() {
		$("#js-exit").hide();
		$("#waiting-next").hide();
		controller.processVideo();
	}

	return {
		load: load
	};
})
