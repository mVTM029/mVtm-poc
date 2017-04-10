define(function (require) {
	var $ = require('jquery'),
		$$ = require('app/util/util'),
		model = require('./selectCardType.model'),
		controller = require('./selectCardType.controller'),
		template = require('text!./selectCardType.template.html');

	/**
	 * 对外暴露函数，用于视图加载
	 */
	var load = function () {
		$$.actionLog("Enter selectCardType page");
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
		$('.card-type div').each(function(){
			$(this).on('click',function(){
				$(this).css('boxShadow','0 0 10px 0 #fff').siblings().css('boxShadow','none');
				$(this).addClass("CardTypeChoiced").siblings().removeClass("CardTypeChoiced");
				$('#selectCardType-next').removeClass('disabled');
			});
		}) 
		
		$('#selectCardType-next').click(function(){
			if($(".CardTypeChoiced").length>0){
				$$.gotoPage('scanId');
			}
		})

	}

	function run() {
		$$.statusStep(1, 3);
		$("#js-exit").show();
		$(".next").show();
		$('#js-remote').show();
		$('#selectCardType-next').addClass('disabled');
	}

	return {
		load: load
	};
});