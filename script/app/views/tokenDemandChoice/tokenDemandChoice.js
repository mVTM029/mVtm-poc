define(function(require) {
	var $ = require('jquery'),
		router = require('app/util/router'),
		model = require('./tokenDemandChoice.model'),
		template = require('text!./tokenDemandChoice.template.html'),
		controller = require('./tokenDemandChoice.controller');
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
		controller.render($("#view-part-container")[0]);
	}

	/**
	 * 事件绑定
	 */
	function bind() {
		$("#tokenDemandChoice-no").off().on('click',function(){
            var array = model.appModel('eBanckingBranch');
            if(typeof array == 'object' && array.length>0){
				var cacheView = array[0];
                array.splice(0,1);//删除已跳转模块
				router.gotoView(cacheView);
			}else{
                router.gotoView("mobileBanking");
			}
		});
		$("#tokenDemandChoice-yes").off().on('click',function(){
			//go to take token
			router.gotoView("takeToken");
		});
		$('#js-exit').hide();
	}

	function run() {
		controller.statusStep(5);
		var transactionId = model.appModel('transaction').transactionId;
		controller.transactionMonitor(model.monitor,transactionId);
	}

	return {
		load: load
	};
});
