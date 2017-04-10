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
		//点击每个pdf文件展示图片
		$('.tnc-content').on('click', function () {
			controller.showPdfImage($(this).attr('data-read', 'true').data('pdf'),controller.getLocale());
		});
		$("#closePdf").on('click', function () {
			$(this).hide().parent().hide();
			if ($('.tnc-content').length === $('.tnc-content[data-read=true]').length) {
				$('#agreeSpan').hide();
			}
		});
		$("#accountAgreement-next").off("click", handles.nextStep).on("click", handles.nextStep);
	}

	/**
	 * 事件函数
	 */
	var handles = {
		nextStep: function () {
			if ($(".no-check").hasClass("checked")) {
				router.gotoView('scanId');
			}
		},
		agree: function () {
			var checkbox = $(this).find('.no-check');
			/* poc.start */
			checkbox.toggleClass("checked");
			$('#accountAgreement-next').toggleClass('disabled');
			$('#agreeSpan').hide();
			return false;
			/* poc.end */

			//pdf全部点击之后才可以更改复选框
			if ($('.tnc-content').length === $('.tnc-content[data-read=true]').length) {
				checkbox.toggleClass("checked");
				$('#accountAgreement-next').toggleClass('disabled');
				$('#agreeSpan').hide();
			}else{
				$('#agreeSpan').show();
			}
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

		//poc  var transactionId = model.appModel('transaction').transactionId;
		//poc  controller.transactionMonitor(model.monitor,transactionId);
	}

	return {
		load: load
	};
});