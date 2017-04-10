define(['../baseController', 'app/service/pdf', 'jquery','app/xfs/ESpaceMediaTerminal'], function (Base, pdf, $,Terminal) {
	var controller = new Base('accountAgreement controller');

	controller.showPdfImage = function (fileName, language) {
		var imgContainer = $('#showPdf-agree');
		imgContainer
			.show().addClass("layer")
			.find('.loading').show()
			.end().find('.showImg').empty();
		pdf.pdfToImage(fileName, language) //调用pdf的方法
			.done(function (data) { //成功后的回调函数
				var imageHtml = "";
				var initPath = "/group-vtc-vtm-gateway-web/service/proxy/vtcService/";
				for (var i in data.images) {
					imageHtml += '<img src="' + initPath + data.images[i] + '?VTM-TOKEN-KEY='+Terminal.getToken()+'" />';
				}
				imgContainer.find('.showImg').append(imageHtml).scrollTop(0)
					.end().find('.loading').hide()
					.end().find("#closePdf").show();
			})
			.fail(function () {
				imgContainer.hide()
					.find('#closePdf').hide();
			});
	};

	return controller;
});