define(function(require) {
	var $ = require('jquery'),
		router = require('app/util/router'),
		model = require('./faceToface.model'),
		template = require('text!./faceToface.template.html'),
		dialog = require('../dialog/dialog'),
		controller = require('./faceToface.controller');

	/**
	 * 对外暴露函数，用于视图加载
	 */
	var load = function() {
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
		$("#faceToface-next").off('click', E.Next).on('click',E.Next);
		$("#js-exit").off('click', E.Exit).on('click', E.Exit);
	}
	/**
	 * 事件函数
	 */
	var E ={
		Next:function(){
			router.gotoView('enterPassword');
		},
		Exit:function(){
			dialog.layerShow("#backhome-dialog");
		}
	};
	function run() {
		$('#js-exit').hide();
		$(".formData").empty();
		$(".formData,.slimScrollDiv").hide();
	}

	return {
		load: load
	};
});
