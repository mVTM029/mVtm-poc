define(function(require) {
	var $ = require('jquery'),
		$$ = require('../../util/util'),
		model = require('./accountType.model'),
		template = require('text!./accountType.template.html'),
		controller = require('./accountType.controller'),
		router = require('app/util/router'),
		ESpaceMediaTerminal = require('app/xfs/ESpaceMediaTerminal'),
		applyDataModel = require("../applyData/applyData.model");

	/**
	 * 对外暴露函数，用于视图加载
	 */
	var load = function() {
		//$$.actionLog("Enter accountType page");
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

		var h = $('.account-type.formData-inner')[0].scrollHeight;
		$('#showPdf-agree').css('minHeight',h+1);
		var readPdf = {
			goldNext:false,
			diamondNext:false
		};
		var E = {
			openPdf:function(){
				var language = controller.getLocale();
				controller.showPdfImage($(this).attr('data-read', 'true').data('pdf'),language);
				if($(this).attr('data-pdf') == "diamond"){
					$('#diamondSpan').hide();
					readPdf.diamondNext = true
				}else{
					$('#goldSpan').hide();
					readPdf.goldNext = true;
				}
				$('.account-type.formData-inner').css("height","100%");
			}
		};

		$(".agree-term").on("click",function(){
			var self = $(this).find('.no-check');
			var anotherCardId = '',
				anotherCardParent = '';
			if(self.prop("id") == "goldCard"){
				if(!readPdf.goldNext){
					$('#goldSpan').show();
					return;
				}
				anotherCardId = 'diamondCard';
				anotherCardParent = 'fr';
				if(self.hasClass("checked")){
					$(".fl").css("border","");
				}else{
					$(".fl").css("border","1px solid #bc923f");
				}
			}

			if(self.prop("id") == "diamondCard"){
				anotherCardId = 'goldCard';
				anotherCardParent = 'fl';
				if(!readPdf.diamondNext){
					$('#diamondSpan').show();
					return;
				}
				if(self.hasClass("checked")){
					$(".fr").css("border","");
				}else{
					$(".fr").css("border","1px solid #bc923f");
				}
			}

			self.toggleClass("checked");
			$('#'+anotherCardId).removeClass('checked');
			$('.'+anotherCardParent).css("border","");
			if($(".checked").length == 1){
				$('#accountType-next').prop('disabled','');
				$('#accountType-next').removeClass('disabled');
			}else{
				$('#accountType-next').addClass('disabled');
				$('#accountType-next').prop('disabled','disabled');
			}
		});




		//点击每个pdf文件展示图片
		$('.terms-advance div').off(E.openPdf).on('click',E.openPdf.bind($('.terms-advance')));
		$('.terms-premier div').off(E.openPdf).on('click',E.openPdf.bind($('.terms-premier')));

		$("#closePdf").on('click', function () {
			$(this).hide().parent().hide();
			$('.account-type.formData-inner').css("height","100%");
		});



		$(".select-cards").off().on("click", function(event) {
			event.preventDefault();
			// 保存信息
			$('.select-cards').find('input').removeProp('checked');
			$(this).find('input').prop('checked', true);

		});

		$("#accountType-next").off().on("click", function() {
			if ($("#diamondCard").hasClass("checked") == true || $("#goldCard").hasClass("checked") == true) {

				var accountType;
				// 保存卡信息
				var selectCardArr = $(".agree-term").find('button');
				for(var i = 0; i < selectCardArr.length; i++){
					if(true == $(selectCardArr[i]).hasClass("checked")){
						accountType=$(selectCardArr[i]).attr("data-type");
						model.appModel('accountType',accountType);
						break;
						//alert(model.accountType);
					}
				}


				if(applyDataModel.customer && applyDataModel.customer.customerSession){

					$$.debug("准备发送HFE数据."+applyDataModel.customer.customerSession.residentAddress);
					$$.debug(controller.getActionMessage("HFE", {customerSession: applyDataModel.customer.customerSession, accountType: accountType}));

					//向VTA发送数据
					ESpaceMediaTerminal.mediaTerminalSendMsg("HFE", {customerSession: applyDataModel.customer.customerSession, accountType: accountType}).then(function(){

					},function(error){
						throw new Error(error);
					});
				}else{
					$$.debug("未获取到HFE数据，请检查Customer session code.");
				}

				router.gotoView("triggerWait");
			}
		});
	}

	function run() {
		$(".formData").empty();
		controller.statusStep(4,1);
		$('#js-exit').hide();
		model.appModel('accountType','');
		var transactionId = model.appModel('transaction').transactionId;
		controller.transactionMonitor(model.monitor,transactionId);

	}

	return {
		load: load
	};
});
