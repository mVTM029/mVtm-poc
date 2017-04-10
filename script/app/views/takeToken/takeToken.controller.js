define(['../baseController', 'app/util/util','app/util/router','app/xfs/UKeyDispenser','app/xfs/xfsUtil'], function (Base, $$,router,ukd,xfsUtil) {
    var controller = new Base('takeToken controller');

    controller.token=function(){
        ukd.DispenseUKeyToExitAsync(1);//dummy 1
        // router.gotoView("mobileBanking");


    };

    controller.resetTakeToken = function(model){
        xfsUtil.addOrUpdateEXTWindow('DispenseUKeyToExitAsyncCallBack',function(msg){
            var dataObj = JSON.parse(msg);
            if (dataObj.hResult === 'WFS_SUCCESS'){
                if (dataObj.Code === 'WFS_CMD_CRD_DISPENSE_CARD') {
                    var eBanckingBranch = model.appModel('eBanckingBranch');
                    if($$.isArray(eBanckingBranch)&&eBanckingBranch.length>0){
                        router.gotoView(eBanckingBranch[0]);
                        eBanckingBranch.splice(0,1);
                        model.appModel('eBanckingBranch',eBanckingBranch);
                    }else{
                        router.gotoView("mobileBanking")
                    }
                }
            }
        });
    }

    return controller;
});
