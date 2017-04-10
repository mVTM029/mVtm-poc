define(['../baseController',"../applyData/applyData.model",'app/util/router', 'app/util/util', 'app/service/baseService', 'app/xfs/IDCCardReader'], function (Base,applyDataModel, router,$$, baseService, iDCCardReader) {
	var controller = new Base('takeCard controller');

	controller.AsyncEjectCard=function(){
		iDCCardReader.resetIDCCardReader();
		iDCCardReader.AsyncEjectCard({
			takeCard:function(){
				router.gotoView("electronBanking");
			},
			exitCard:function(){

			}
		});
	};


	return controller;
});
