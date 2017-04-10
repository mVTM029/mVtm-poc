define(function (require) {
	var $ = require('jquery'),
		$$ = require('app/util/util'),
		model = require('./login.model'),
		template = require('text!./login.template.html'),
		controller = require('./login.controller');


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
		controller.render($$.getViewContainer());
	}
	/**
	 * 事件绑定
	 */
	function bind() {

		$('#js-login').on('click',function(){
			$$.gotoPage('home');
		})

	}


	/**
	 * 除事件绑定
	 */

	function run() {
		$($$.getViewContainer()).removeClass("main-bg");
		// 启动输入法
		//inputOCX.Open();
	}

	return {
		load: load
	};
});
