define(function (require) {
	var $ = require('jquery'),
		router = require('app/util/router'),//poc
		model = require('./scanId.model'),
		template = require('text!./scanId.template.html'),
		controller = require('./scanId.controller');

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
		/**
		 * dummy
		 */
		// setTimeout(function(){
		// 	window.IDCardReaderAsyncReadRawDataCallBack(JSON.stringify({"Buffer":"nullptr","Code":"WFS_EXEE_IDC_MEDIAINSERTED","Name":"NEWID81","hResult":"WFS_SUCCESS"}))
		// },2000);
        //
		// setTimeout(function(){
		// 	window.IDCardReaderAsyncReadRawDataCallBack('{"Buffer":{"track1":"Name=张三|Sex=男|Nation=汉|Born=19900101|Address=西安市雁塔区天谷八路中软国际|IDCardNo=123456789009876512|GrantDept=雁塔区公安局|UserLifeBegin=20110328|UserLifeEnd=20210328|PhotoFileName=C:\\\\idcard_data\\\\P-123456789009876512.jpg","track1status":"ok","track2":"C:\\\\idcard_data\\\\123456789009876512-0.jpg","track2status":"ok","track3":"C:\\\\idcard_data\\\\123456789009876512-1.jpg","track3status":"ok"},"Code":"WFS_CMD_IDC_READ_RAW_DATA","Name":"","hResult":"WFS_SUCCESS"}')
		// },4000);
        //
		// setTimeout(function(){
		// 	window.IDCardReaderAsyncReadRawDataCallBack('{"Buffer":"nullptr","Code":"WFS_SRVE_IDC_MEDIAREMOVED","Name":"NEWID81","hResult":"WFS_SUCCESS"}')
		// },6000);

		/*  */
		$('#scanId-next').click(function(){
			router.gotoView('takeIdCard');
		});
	}

	/**
	 *视图初始化操作
	 */
	function run() {
		//poc  $('#scanId-next').hide();
		//poc  $('#js-exit').addClass('only-exit');
		controller.processVideo();
		controller.statusStep(1, 3);
		controller.scan();
		var transactionId = model.appModel('transaction').transactionId;
		controller.transactionMonitor(model.monitor,transactionId);
	}

	return {
		load: load
	};
});
