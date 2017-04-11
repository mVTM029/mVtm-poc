define(function (require) {
	var $ = require('jquery'),
		router = require('app/util/router'),
		model = require('./accountAgreement.model'),
		template = require('text!./accountAgreement.template.html'),
		controller = require('./accountAgreement.controller');

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
		$(".agree-term").off("click", handles.agree).on("click", handles.agree);

		$("#accountAgreement-next").off("click", handles.nextStep).on("click", handles.nextStep);
	}

	/**
	 * 事件函数
	 */
	var handles = {
		nextStep: function () {
			if ($(".no-check").hasClass("checked")) {
				router.gotoView('faceToface');
			}
		},
		agree: function () {
			var checkbox = $(this).find('.no-check');

			checkbox.toggleClass("checked");
			$('#accountAgreement-next').toggleClass('disabled');
			$('#agreeSpan').hide();
		}
	}

	/**
	 * 视图初始化操作
	 */
	function run() {
		controller.statusStep(1, 2);
		$(".formData").empty();
		$('#js-exit').show();
		$('#js-exit').removeClass('only-exit');
		$(".formData,.slimScrollDiv").hide();
		$("#top-select-language").hide();
		$("#agree-terms").removeClass("active");

	}

	return {
		load: load
	};
});