define(function(require) {
	var $ = require('jquery'),
		router = require('app/util/router'),
		model = require('./rateExperience.model'),
		template = require('text!./rateExperience.template.html'),
		controller = require('./rateExperience.controller');

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
		//对整体流程服务评论
		var arr = ["20", "40", "60", "80", "100"];
		var num1,num2;
		$(".overall-experience li").on('click', function() {
			//var liIndex = $(this).index();
			$(".overall-experience li").removeClass("act");
			$(this).addClass("act");
			$(this).prevAll().addClass('act');
			num2= arr[$(this).index()];
		});
		//对远程toller评分系统
		$(".remote-experience li").on('click', function() {
			//var liIndex = $(this).index();
			$(".remote-experience li").removeClass("act");
			$(this).addClass("act");
			$(this).prevAll().addClass('act');
			num1= arr[$(this).index()];
		});

		$("#rate-confirm").off().on("click", function() {
			//TODO:对打分数据交给后台
			router.gotoView("home") ;
		});
	}

	function run() {
		controller.statusStep(5);
		$('.main-padding').scrollTop(0);
		$('#js-exit').hide();
	}

	return {
		load: load
	};
});