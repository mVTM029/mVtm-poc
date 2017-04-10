define(function (require) {
	var $ = require('jquery'),
		router = require('app/util/router'),
		dialog = require('../dialog/dialog'),
		model = require('./takeIdCard.model'),
		template = require('text!./takeIdCard.template.html'),
		controller = require('./takeIdCard.controller'),
		xfsUtil = require('app/xfs/xfsUtil'),
		$$ = require('app/util/util'),
		IDCardReader = require('app/xfs/IDCardReader');

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
			//router.gotoView('showIdCard');
			/*if (Terminal.terminalInfo.callStatus !== -1) {
				kindlyController.sendMsgToTellerAsync();
				router.gotoView("triggerWait");
				return;
			}*/

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
			/* poc */
			router.gotoView("forceConnectingTeller");
			/* poc */

			if ($("#select-language-next").hasClass('disabled')) {
				return;
			}

			if (Terminal.terminalInfo.callStatus === -1) {
				var language = model.appModel("showIdCardlanguage");
				controller.mediaTerminalCall(language);
			} else {
				router.gotoView("triggerWait");
			}
		});

		controller.leavePage(function () {
			dialog.layerHide("#spoken-language")
		})
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
