define(function (require) {
	var $ = require('jquery'),
		router = require('app/util/router'),
		dialog = require('../dialog/dialog'),
		model = require('./takeIdCard.model'),
		template = require('text!./takeIdCard.template.html'),
		controller = require('./takeIdCard.controller'),
		$$ = require('app/util/util');

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

		var E = {
			cancelDialog: function () {
				dialog.layerHide('#spoken-language');
				$('.select-btn input:checked').prop('checked', false);
			}
		};

		$("#takeIdCard-next").off().on("click", function () {

			dialog.layerShow('#spoken-language');

			$('#select-language-cancel').off("click", E.cancelDialog).on("click", E.cancelDialog);
			$('#select-language-next').attr("form", "applyData-form")
				.addClass('disabled').prop('disabled', true);
		});


		$('.select-box .checkbox').off().on('click', function () {
			model.appModel("showIdCardlanguage", $(this).html());
			$('#select-language-next').removeClass('disabled').prop('disabled', false);
		});

		//发起链接视频
		$("#select-language-next").off().on("click", function () {
			if ($(this).hasClass('disabled')) {
				return;
			}
			router.gotoView("forceConnectingTeller");
		});

		controller.leavePage(function () {
			dialog.layerHide("#spoken-language");
		});
	}

	function run() {
		//poc  $("#js-exit").hide();
		//poc  $("#takeIdCard-next").hide();
		$('#js-remote').show();
		controller.processVideo();
	}

	return {
		load: load
	};
});
