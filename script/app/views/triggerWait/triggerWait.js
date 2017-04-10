define(function (require) {
    var $ = require('jquery'),
        model = require('./triggerWait.model'),
        template = require('text!./triggerWait.template.html'),
        Common = require('app/xfs/Common'),
        idcCard = require('app/xfs/IDCCardReader'),
        idcCardDispenser = require('app/xfs/IDCCardDispenser'),
        Terminal = require('app/xfs/ESpaceMediaTerminal'),
        xfsUtil = require('app/xfs/xfsUtil'),
        message = require('app/util/message'),
        PDF = require('app/xfs/PDF'),
        router = require('app/util/router'),
        $$ = require('app/util/util'),
        controller = require('./triggerWait.controller'),
        filePath = '';
        var transaction = model.appModel('transaction');
        var transactionId = transaction.transactionId;

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

        message.on("changeAccountType", function (vtaMsg) {
            //TODO:修改type类型
            // var accountType = msg;
            idcCardDispenser.DispenseCardToTransportAsync(2).then(function () {//目前只能传2
                $$.debug('发卡到通道成功，异步读取信息');
                idcCard.AsyncReadRawData('track2');
            });
        });
        
        /**
         * msg:fileName
         */
        message.on("openPdf", function (msg) {
            controller.statusStep(4,2);
            $$.debug("触发openPdf事件:"+msg+",语言:"+controller.getLocale());
            filePath = PDF.PDFSignature(msg, controller.getLocale(),'handsign');//手动签名
            _resetPDFCallBack();
        });

        message.on("closePdf", function () {
            $$.debug("准备调用closePdf");
            PDF.ClosePDFViewer();
            $$.debug("调用成功");
        });

        message.on("signOver", function () {
            router.gotoView("enterPassword");
        });

        message.on("otherServicesOver", function (array) {
            if(array.length<1){
                $$.debug("otherServicesOver msg 为空","yellow");
                return;
            }
            var cacheView = array[0];
            array.splice(0,1);//删除已跳转模块
            model.appModel('eBanckingBranch',array);
            router.gotoView(cacheView);
        });

        message.on("idCheckPassed", function () {
            router.gotoView("applyData");
        });

    }

    var _resetPDFCallBack = function(){
        xfsUtil.addOrUpdateEXTWindow("callBackPDFControlType",function(type,fileName){
            if(type == 'SignComplete'){
                Common.FileUpload(transactionId, filePath).then(function (data) {
                    $$.debug("pdf上传成功");
                    data = JSON.parse(data);
                    Terminal.mediaTerminalSendMsg("file", data);
                },function(){
                    $$.debug('pdf上传失败');
                });
            }
        });
    };

    function run() {
        _resetPDFCallBack();
        xfsUtil.addOrUpdateEXTWindow('IDCCardReaderAsyncReadRawDataCallBack', function (msg) {
            $$.debug('进入异步信息回调成功:'+msg);
            msg = JSON.parse(msg);
            if (msg.hResult == "WFS_SUCCESS") {
                model.appModel('IdcCardNumber',msg.Buffer.track2);
                Terminal.mediaTerminalSendMsg("cardNumber", msg.Buffer.track2);
            }
        });

        $('#js-exit').hide();
        $(".formData").hide();
        $(".formData").empty();
        controller.transactionMonitor(model.monitor,transactionId);
    }

    return {
        load: load
    };
});
