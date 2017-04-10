define(['../baseController'], function (Base) {
	var controller = new Base('dialog controller');
	controller.dialogTimer = {
		dialogTimer0: 0,
		dialogTimer25:25,//forceConnectingTeller 25s timeout
		dialogTimer30: 30,
		dialogTimer20: 20,
		dialogTimer70: 70,
		dialogTimer1000: 1000
	};
	return controller;
});
