define(function (require) {
	var $ = require('jquery'),
		model = require('./takeToken.model'),
		template = require('text!./takeToken.template.html'),
		router = require('app/util/router'),
		xfsUtil = require('app/xfs/xfsUtil'),
		$$ = require('app/util/util'),
		controller = require('./takeToken.controller');

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
		$('#takeToken-next').on('click',function(){
			var eBanckingBranch = model.appModel('eBanckingBranch');
			if(eBanckingBranch.length>0){
				router.gotoView(eBanckingBranch[0]);
				eBanckingBranch.splice(0,1);
				model.appModel('eBanckingBranch',eBanckingBranch);
			}else{
				router.gotoView("mobileBanking")
			}
		})
	}


	function run() {
		controller.resetTakeToken(model);
		controller.statusStep(5);
		$("#js-exit").hide();
		controller.processVideo();
		controller.token();
		var transactionId = model.appModel('transaction').transactionId;//必须在触发硬件后调用
		controller.transactionMonitor(model.monitor,transactionId);
	}

	return {
		load: load
	};
});
