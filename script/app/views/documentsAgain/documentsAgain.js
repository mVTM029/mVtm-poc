define(function(require) {
	var $ = require('jquery'),
		$$ = require('app/util'),
		router = require('app/util/router'),
		model = require('./documentsAgain.model'),
		template = require('text!./documentsAgain.template.html'),
		controller = require('./documentsAgain.controller');

	/**
	 * 对外暴露函数，用于视图加载
	 */
	var load = function() {
		$$.actionLog("Enter documentsAgain page");
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
		$("#documentsAgain-next").off().on("click", function() {
			router.gotoView('');
		});
	}
	function run() {
		$("#js-exit").hide();
		/* poc.start */

		return false;
		/* poc.end */
		controller.xfsInit({
			front: 'c://doc/' + controller.model.customer.IDCardNo + '_doc_front_origin_' + $$.getCurrTimeStamp() + '.jpg',
			back: 'c://doc/' + controller.model.customer.IDCardNo + '_doc_back_origin_' + $$.getCurrTimeStamp() + '.jpg'
		});
	}
	return {
		load: load
	};
});