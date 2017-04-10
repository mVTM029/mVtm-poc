define(['../baseController'], function (Base) {
	var controller = new Base('rateExperience controller');
	/**
	 *用户办完卡删除数据库预填数据
	 */
	//controller.deleteCustomerSessionById = function(customerIdCard){
	//	return $$.sendTranstionMessage("service/proxy/vtcService/customerSession/deleteByCustomerIdCard",
	//		JSON.stringify({"customerIdCard":customerIdCard})
	//	);
	//}
	

	return controller;
});
