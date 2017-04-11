define(function (require) {
	var $ = require('jquery'),
		$$ = require('app/util/util'),
		model = require('./enterPasswordSuccess.model'),
		template = require('text!./enterPasswordSuccess.template.html'),
		controller = require('./enterPasswordSuccess.controller');

	/**
	 * 对外暴露函数，用于视图加载
	 */
	var load = function () {
		//$$.actionLog("Enter enterPasswordSuccess page");
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

	function run() {
		$('#js-exit').hide();
		$("#enterPasswordSuccess-next").removeClass("disabled").hide();
		$('.form-condition').removeClass('animation-bgc');
		setTimeout(function(){
			location.hash = 'enterAgain';
		}, 2000);

		
		$('.main-padding').scrollTop(0);
	}

	return {
		load: load
	};
});