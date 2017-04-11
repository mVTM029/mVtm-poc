define(function (require) {
	var $ = require('jquery'),
		router = require('app/util/router'),
		model = require('./scanId.model'),
		template = require('text!./scanId.template.html'),
		controller = require('./scanId.controller');

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
		controller.render($("#view-part-container")[0]);
	}

	/**
	 * 事件绑定
	 */
	function bind() {
		$('#scanId-next').click(function(){
			router.gotoView('showIdCard');
		});
	}

	/**
	 *视图初始化操作
	 */
	function run() {
		//poc  $('#scanId-next').hide();
		//poc  $('#js-exit').addClass('only-exit');
		controller.processVideo();
		controller.statusStep(1, 3);
	}

	return {
		load: load
	};
});
