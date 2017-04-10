define(function (require) {
	var $ = require('jquery'),
		router = require('app/util/router'),
		model = require('./takeIdCard.model'),
		template = require('text!./takeIdCard.template.html'),
		xfsUtil = require('app/xfs/xfsUtil'),
		$$ = require('app/util/util'),
		IDCardReader = require('app/xfs/IDCardReader'),
		controller = require('./takeIdCard.controller');

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
		$("#takeIdCard-next").off().on("click", function () {
			router.gotoView('showIdCard');
		});
	}

	/**
	 * 10s未发现有取卡动作后自动跳转页面
	 */
	function autoTakeIdCard(){
		var IDCInfo = model.appModel("IDCInfo");
		var time = setTimeout(function(){
			if(IDCInfo){
				router.gotoView('showIdCard');
			}
		},10000);

		controller.leavePage(function(){
			clearTimeout(time);
			IDCardReader.AsyncReset('noaction');
			$$.debug(IDCardReader.AsyncReset);
		});
	}

	function run() {
		//poc autoTakeIdCard();
		//poc  $("#js-exit").hide();
		//poc  $("#takeIdCard-next").hide();
		$('#js-remote').show();
		controller.processVideo();
		//poc  var transactionId = model.appModel('transaction').transactionId;
		//poc  controller.transactionMonitor(model.monitor,transactionId);
	}

	return {
		load: load
	};
});
