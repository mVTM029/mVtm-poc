define(function (require) {
	var $ = require('jquery'),
		$$ = require('app/util/util'),
		router = require('app/util/router'),
		model = require('./documents.model'),
		template = require('text!./documents.template.html'),
		controller = require('./documents.controller');

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
		//poc
		$("#documents-next").off().on("click", function () {
			router.gotoView('documentsAgain');
		});
	}

	function run() {
		controller.statusStep(3, 2);
		$("#js-exit").hide();
		/* poc.start */

		return false;
		/* poc.end */
		controller.xfsInit({
			documentName: 'c://doc/' + controller.model.customer.IDCardNo + '_doc_hight_shot.jpg'
		});
	}

	return {
		load: load
	};
});
