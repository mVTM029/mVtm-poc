define(function (require) {
    var $ = require('jquery'),
        router = require('app/util/router'),
        model = require('./showIdCard.model'),
        template = require('text!./showIdCard.template.html'),
        controller = require('./showIdCard.controller'),
        kindlyController = require('../kindly/kindly.controller'),
        dialog = require('../dialog/dialog'),
        $$ = require('app/util/util'),
        Terminal = require('app/xfs/ESpaceMediaTerminal');

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

        var E = {
            cancelDialog: function () {
                dialog.layerHide('#spoken-language');
                $('.select-btn input:checked').prop('checked', false);
            }
        };


        $("#showIdCard-next").off().on("click", function () {
            /* poc.start */
            router.gotoView('applyData');
            return false;
            /* poc.end */

            //router.gotoView('takeIdCard');
            if (Terminal.terminalInfo.callStatus !== -1) {
                kindlyController.sendMsgToTellerAsync();
                router.gotoView("triggerWait");
                return;
            }
            dialog.layerShow('#spoken-language');
            $('#select-language-cancel').off("click", E.cancelDialog).on("click", E.cancelDialog);
            $('#select-language-next').attr("form", "applyData-form")
                .addClass('disabled').prop('disabled', true);
        });

        $('.select-box .checkbox').off().on('click', function () {
            model.appModel("showIdCardlanguage", $(this).html());
            $('#select-language-next').removeClass('disabled').prop('disabled', false);
        });

        //发起链接视频
        $("#select-language-next").off().on("click", function () {
            if ($("#select-language-next").hasClass('disabled')) {
                return;
            }

            if (Terminal.terminalInfo.callStatus === -1) {
                var language = model.appModel("showIdCardlanguage");
                controller.mediaTerminalCall(language);
            } else {
                router.gotoView("triggerWait");
            }
        });

        controller.leavePage(function () {
            dialog.layerHide("#spoken-language")
        })

    }

    function run() {
        //poc  var transactionId = model.appModel('transaction').transactionId;
        //poc  controller.transactionMonitor(model.monitor,transactionId);
        //poc  $('#js-exit').show().removeClass('only-exit');
        var IDCInfo = model.appModel('IDCInfo');
        $('#idCard-face').attr('src', IDCInfo.img1);
        $('#idCard-back').attr('src', IDCInfo.img2);

    }

    return {
        load: load
    }
});
