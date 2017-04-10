define(['jquery', '../baseController', './scanId.model', 'app/xfs/IDCardReader', 'app/util/router','../dialog/dialog'], function ($, Base, model, idcr, router, dialog) {
    var controller = new Base('scanId controller');

    controller.scan = function () {
        idcr.resetIdCardCallBack();
        idcr.AsyncReadRawData({
            success: function (IDCInfo) {//目前硬件只支持身份证类型
                model.IDCInfo = IDCInfo;
                //TODO:拓展其他类型
                IDCInfo.CardType = "身份证";
                model.appModel('IDCInfo', IDCInfo);
                router.gotoView('takeIdCard');
            },
            insert: function () {
                router.gotoView('waiting');
            },
            remove: function () {
                if(model.appModel('IDCInfo')){
                    router.gotoView('showIdCard');
                }
            },
            invalid: function () {
                $('#noidentify-idcard-backhome').off("click", E.backhome).on("click", E.backhome);
                $('#noidentify-idcard-retry').off("click", E.retryScanId).on("click", E.retryScanId);
                dialog.layerShow('#noidentify-idcard-dialog');
            },
            timeout: function () {
            }
        });

    };
    var E={
        backhome:function () {
            dialog.layerHide('#noidentify-idcard-dialog');
            router.gotoView('home');
        },
        retryScanId:function(){
            dialog.layerHide('#noidentify-idcard-dialog');
            router.gotoView('scanId');
        }
    };
    return controller;
});
