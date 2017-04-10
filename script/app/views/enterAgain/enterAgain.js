define(['jquery', './enterAgain.model', '../dialog/dialog', 'app/util/util', 'app/util/router', 'text!./enterAgain.template.html', './enterAgain.controller','app/service/enterPasswordService'], function ($, model, dialog, $$, router, template, controller,enterPasswordService) {
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
        /*两次密码输出不一致  关闭弹出层跳转回第一次输出密码第位置*/
        $("#back-setpin").off("click", E.backSet).on("click",E.backSet );
        /*网络原因设置密码失败  关闭弹出层跳转回第一次输出密码第位置*/
        $("#failed-back-setpin").off("click", E.failBack).on("click", E.failBack);
    }

    /**
     *事件函数
     */
    var E ={
        backSet : function(){
            dialog.layerHide("#setpin-dialog");
            router.gotoView("enterPassword");
        },
        failBack :function(){
            dialog.layerHide("#setpin-failed-dialog");
            router.gotoView("enterPassword");
        }
    };

    /**
     * 向数据库发送设置信息
     * @constructor
     */
    function setPassword() {
        $$.debug(JSON.stringify(model.appModel("accountType")));
       var transaction = model.appModel('transaction');
       var inputPassword= model.appModel("ansiNewPinBlock"),//第一次输入的密码
             newPassword= model.ansiNewPinBlock,//第二次输入的密码
             cardnumber=model.appModel('IdcCardNumber'),//卡号
             transactionId= transaction.transactionId,//交易编号
             accountType= model.appModel("accountType");//卡类型
            if (location.hash.indexOf('#enterAgain') > -1) {
                if (inputPassword !== newPassword) {
                    $$.debug('Passwords do not match');
                    model.appModel('ansiNewPinBlock',null);
                    model.ansiNewPinBlock=null;
                    dialog.layerShow("#setpin-dialog");
                } else {
                    $$.debug('Invoke Java interface，set password，cardnumber： ' + cardnumber + "  |||||||| accountType: " + accountType + " |||||||| newPassword: " + newPassword+" |||||||| transactionId:"+transactionId);
                    enterPasswordService.setCardPassword(accountType, cardnumber, transactionId, newPassword)
                        .then(function (res) {
                            $$.debug('set password， res：' + JSON.stringify(res));
                            if (000 == (res.status) && (res.data) && (res.data.length > 0)) {
                                if (0000 == res.data[0].acceptOrRejectCode) {
                                    $$.debug('Set password success');
                                    window.external.PinPad.AsyncCancel();//取消
                                    router.gotoView("takeCardBefore");
                                } else {
                                    dialog.layerShow("#setpin-dialog");
                                    $$.debug('Set password failed');
                                }
                            }
                        }).then(function(event, xhr){
                            if(xhr.StatusCode == 500){
                                $$.debug('Service exception setting password failed');
                                dialog.layerShow("#outofservice");
                                //TODO:设置密码失败业务流程需要讨论,超时处理
                            }

                        })
                    }
                }
            }

    function completePinInputOut() {
        var data = this.data;
        model.ansiNewPinBlock = data.Buffer.PinKeys;
        setPassword();
    }

    function run() {
        $('#js-exit').hide();
        var PPInit = model.appModel("PPInit");
        PPInit(completePinInputOut);
        var transactionId = model.appModel('transaction').transactionId;
        controller.transactionMonitor(model.monitor,transactionId);
    }

    return {
        load: load
    };
});
